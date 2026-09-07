"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { getDivisions, toggleDivision, deleteDivision } from "@/services/admin/admin.checkout-location.service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CreateDivisionModal from "./CreateDivisionModal";
import EditDivisionModal from "./EditDivisionModal";

export default function DivisionTab() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toggling, setToggling] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getDivisions();
      setDivisions(res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggle = async (item) => {
    try {
      setToggling(item.id);
      await toggleDivision(item.id);
      toast.success(`Division ${item.isActive ? "deactivated" : "activated"}`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete division "${item.name}"?`)) return;
    try {
      await deleteDivision(item.id);
      toast.success("Division deleted");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Division
        </Button>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="text-[11px] uppercase font-bold">
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}><div className="h-4 bg-muted/50 rounded animate-pulse" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : divisions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No divisions found</TableCell>
                </TableRow>
              ) : (
                divisions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className="font-mono text-sm">{item.code}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.isActive ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggle(item)}
                      >
                        {toggling === item.id ? "..." : item.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => { setSelected(item); setEditOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateDivisionModal open={createOpen} setOpen={setCreateOpen} onRefresh={fetchData} />
      <EditDivisionModal open={editOpen} setOpen={setEditOpen} division={selected} onRefresh={fetchData} />
    </div>
  );
}
