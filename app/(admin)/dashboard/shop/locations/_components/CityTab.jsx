"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { getDivisions, getDistrictsByDivision, getCitiesByDistrict, toggleCity, deleteCity } from "@/services/admin/admin.checkout-location.service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CreateCityModal from "./CreateCityModal";
import EditCityModal from "./EditCityModal";

export default function CityTab() {
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cities, setCities] = useState([]);
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
      const res = await getDistrictsByDivision(selectedDivision);
      setDistricts(res?.data?.districts || res?.data || []);
    } catch (error) {
      console.error(error);
    }
  }, [selectedDivision]);

  const fetchCities = useCallback(async () => {
    if (!selectedDistrict) { setCities([]); return; }
    try {
      setLoading(true);
      const res = await getCitiesByDistrict(selectedDistrict);
      setCities(res?.data?.cities || res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedDistrict]);

  useEffect(() => { fetchDivisions(); }, [fetchDivisions]);
  useEffect(() => { fetchDistricts(); }, [fetchDistricts]);
  useEffect(() => { fetchCities(); }, [fetchCities]);

  const handleToggle = async (item) => {
    try {
      setToggling(item.id);
      await toggleCity(item.id);
      toast.success(`City ${item.isActive ? "deactivated" : "activated"}`);
      fetchCities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete city "${item.name}"?`)) return;
    try {
      await deleteCity(item.id);
      toast.success("City deleted");
      fetchCities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-3">
        <Select value={selectedDivision} onValueChange={(v) => { setSelectedDivision(v); setSelectedDistrict(""); }}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDistrict} onValueChange={(v) => { setSelectedDistrict(v); setCities([]); }} disabled={!selectedDivision}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setCreateOpen(true)} disabled={!selectedDistrict}>
          <Plus className="h-4 w-4 mr-2" /> Add City
        </Button>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="text-[11px] uppercase font-bold">
                <TableHead>Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedDistrict ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Select a district first</TableCell>
                </TableRow>
              ) : loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}><div className="h-4 bg-muted/50 rounded animate-pulse" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : cities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No cities found</TableCell>
                </TableRow>
              ) : (
                cities.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{districts.find(d => d.id === item.district?.id)?.name || "—"}</TableCell>
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

      <CreateCityModal
        open={createOpen}
        setOpen={setCreateOpen}
        districtId={selectedDistrict}
        onRefresh={fetchCities}
      />
      <EditCityModal
        open={editOpen}
        setOpen={setEditOpen}
        city={selected}
        onRefresh={fetchCities}
      />
    </div>
  );
}
