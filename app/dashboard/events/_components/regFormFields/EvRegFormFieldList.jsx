"use client";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { getRegistrationFormFields } from "@/services/admin/admin.regFormField.service";
import { useEffect, useState } from "react";
import EvRegFormFieldTableBody from "./EvRegFormFieldTableBody";
import EvRegFormFieldTableHeader from "./EvRegFormFieldTableHeader";
import EvRegPageHeader from "./EvRegPageHeader";

export default function EvRegFormFieldList({ eventId }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const res = await getRegistrationFormFields(eventId);
      setFields(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <>
      <EvRegPageHeader eventId={eventId} onRefresh={fetchFields} />

      <Card className={`border-border bg-card shadow-sm overflow-hidden`} >
        <CardContent className="p-0">
          <Table>

            {/* HEADER */}
            <EvRegFormFieldTableHeader />

            {/* BODY */}
            <EvRegFormFieldTableBody
              loading={loading}
              fields={fields}
              onRefresh={fetchFields}
            />

            {/* EMPTY STATE - FIXED NESTING */}
            {!loading && fields.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={100} className="py-12 text-center text-muted-foreground">
                    No fields found.
                  </td>
                </tr>
              </tbody>
            )}

          </Table>
        </CardContent>
      </Card>
    </>
  )
}
