"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import {
  Table
} from "@/app/components/ui/table";
import TableBodyPart from "./TableBodyPart";
import TableHeaderPart from "./TableHeaderPart";

export default function OrgList({ data = [], loading, onAction }) {
  return (
    <Card className="border-border bg-card shadow-sm overflow-x-auto custom-scrollbar">
      <CardContent className="p-0">
        <Table className="min-w-[1500px]">
          <TableHeaderPart />
          <TableBodyPart loading={loading} data={data} />
        </Table>
      </CardContent>
    </Card>
  );
}