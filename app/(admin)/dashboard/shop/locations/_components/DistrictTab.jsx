"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { getDivisions, getDistrictsByDivision, toggleDistrict, deleteDistrict } from "@/services/admin/admin.checkout-location.service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CreateDistrictModal from "./CreateDistrictModal";
import EditDistrictModal from "./EditDistrictModal";

export default function DistrictTab() {
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toggling, setToggling] = useState(null);

  const fetchDivisions = useCallback(async () => {
    try {
      const res = await getDivisions();
      setDivisions(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchDistricts = useCallback(async () => {
    if (!selectedDivision) { setDistricts([]); return; }
    try {
      setLoading(true);
      const res = await getDistrictsByDivision(selectedDivision);
      setDistricts(res?.data?.districts || res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedDivision]);

  useEffect(() => { fetchDivisions(); }, [fetchDivisions]);
  useEffect(() => { fetchDistricts(); }, [fetchDistricts]);

  const handleToggle = async (item) => {
    try {
      setToggling(item.id);
      await toggleDistrict(item.id);
      toast.success(`District ${item.isActive ? "deactivated" : "activated"}`);
      fetchDistricts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete district "${item.name}"?`)) return;
    try {
      await deleteDistrict(item.id);
      toast.success("District deleted");
      fetchDistricts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <Select value={selectedDivision} onValueChange={setSelectedDivision}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => setCreateOpen(true)} disabled={!selectedDivision}>
          <Plus className="h-4 w-4 mr-2" /> Add District
        </Button>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="text-[11px] uppercase font-bold">
                <TableHead>Name</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedDivision ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Select a division first</TableCell>
                </TableRow>
              ) : loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}><div className="h-4 bg-muted/50 rounded animate-pulse" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : districts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No districts found</TableCell>
                </TableRow>
              ) : (
                districts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{divisions.find(d => d.id === item.division?.id)?.name || "—"}</TableCell>
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

      <CreateDistrictModal
        open={createOpen}
        setOpen={setCreateOpen}
        divisionId={selectedDivision}
        divisions={divisions}
        onRefresh={fetchDistricts}
      />
      <EditDistrictModal
        open={editOpen}
        setOpen={setEditOpen}
        district={selected}
        divisions={divisions}
        onRefresh={fetchDistricts}
      />
    </div>
  );
}
