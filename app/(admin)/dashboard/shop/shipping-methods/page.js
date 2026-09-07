"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table } from "@/app/components/ui/table";
import { getShippingMethods } from "@/services/admin/admin.shipping-method.service";
import { Plus } from "lucide-react";
import ShippingMethodTableHeader from "./_components/ShippingMethodTableHeader";
import ShippingMethodTableBody from "./_components/ShippingMethodTableBody";
import CreateShippingMethodModal from "./_components/CreateShippingMethodModal";
import EditShippingMethodModal from "./_components/EditShippingMethodModal";
import DeleteShippingMethodDialog from "./_components/DeleteShippingMethodDialog";

export default function ShippingMethodsPage() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getShippingMethods();
      setMethods(res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleEdit = (item) => { setSelected(item); setEditOpen(true); };
  const handleDelete = (item) => { setSelected(item); setDeleteOpen(true); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shipping Methods</h1>
          <p className="text-sm text-muted-foreground">Manage checkout shipping methods</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Method
        </Button>
      </div>

      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <ShippingMethodTableHeader />
            <ShippingMethodTableBody
              loading={loading}
              methods={methods}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchData}
            />
          </Table>
          {!loading && methods.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No shipping methods found.</div>
          )}
        </CardContent>
      </Card>

      <CreateShippingMethodModal open={createOpen} setOpen={setCreateOpen} onRefresh={fetchData} />
      <EditShippingMethodModal open={editOpen} setOpen={setEditOpen} method={selected} onRefresh={fetchData} />
      <DeleteShippingMethodDialog open={deleteOpen} setOpen={setDeleteOpen} method={selected} onRefresh={fetchData} />
    </div>
  );
}
