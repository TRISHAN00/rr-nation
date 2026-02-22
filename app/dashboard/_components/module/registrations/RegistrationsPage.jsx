"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getAllOrders } from "@/services/admin/admin.event.service";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  Eye,
  Hash,
  HeartPulse,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  Shirt,
  Ticket,
  Users,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const paymentStatusConfig = {
  completed: {
    label: "Paid",
    icon: CheckCircle,
    className:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/15 text-destructive border-destructive/20",
  },
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [selectedReg, setSelectedReg] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [globalStats, setGlobalStats] = useState({
    totalRevenue: 0,
    paidCount: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllOrders(currentPage, 10);
      const items = res?.data?.items || [];

      setTotalPages(res?.data?.totalPages || 1);
      setTotalCount(res?.data?.count || 0);

      setGlobalStats({
        totalRevenue: res?.data?.totalRevenue || 0,
        paidCount: res?.data?.paidCount || 0,
      });

      const mappedData = items.map((item) => {
        // We take the first item for the high-level table view
        const firstTicket = item.order?.items?.[0];
        const participant = firstTicket?.participant;

        return {
          id: item.id,
          transactionId: item.transactionId,
          name:
            participant?.name ||
            `${item.user?.firstName} ${item.user?.lastName}`,
          email: participant?.email || item.user?.email,
          phone: participant?.contactNumber || "N/A",
          event: firstTicket?.eventTicket?.event?.name || "N/A",
          package: firstTicket?.eventTicket?.name || "Ticket",
          amount: parseFloat(
            item.afterDiscountAmount || item.orginalAmount || 0,
          ),
          status: item.status,
          method: item.paymentGateway,
          date: item.paymentDate || item.createdAt,
          image: item.user?.image,
          initials: (item.user?.firstName?.[0] || "U").toUpperCase(),
          bloodGroup: participant?.bloodGroup || "N/A",
          tshirtSize: participant?.tshirtSize || "N/A",
          gender: participant?.gender || "N/A",
          ageCategory: participant?.ageCategory || "N/A",
          distance: participant?.distanceCategory || "N/A",
          emergencyContact: participant?.emergencyContactName || "N/A",
          emergencyPhone: participant?.emergencyContactNumber || "N/A",
          address: item.user?.address || "N/A",
          community: participant?.communityName || "None",
          // Adding the full order object and items for detailed view
          orderId: item.order?.id,
          orderStatus: item.order?.status,
          orderItems: item.order?.items || [],
        };
      });

      setRegistrations(mappedData);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.phone.includes(searchQuery);
      const matchesEvent = filterEvent === "all" || reg.event === filterEvent;
      return matchesSearch && matchesEvent;
    });
  }, [registrations, searchQuery, filterEvent]);

  const uniqueEvents = [...new Set(registrations.map((r) => r.event))];

  const handleViewDetails = (reg) => {
    setSelectedReg(reg);
    setIsSheetOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Event",
      "Package",
      "Status",
      "Amount",
      "Transaction ID",
      "T-Shirt",
      "Blood Group",
    ];
    const csvData = filteredData.map((reg) => [
      `"${reg.name}"`,
      reg.email,
      reg.phone,
      `"${reg.event}"`,
      reg.package,
      reg.status,
      reg.amount,
      reg.transactionId,
      reg.tshirtSize,
      reg.bloodGroup,
    ]);

    const csvContent = [headers, ...csvData].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Registrations_Page_${currentPage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 bg-background text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground text-sm">
            Real-time aggregate totals across all pages.
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="w-fit gap-2 border-primary/20 hover:bg-primary/5"
        >
          <Download className="h-4 w-4" /> Export Current View
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          label="Total Registrations"
          value={totalCount}
          subText="All pages combined"
          color="bg-blue-500/10"
        />
        <StatCard
          icon={
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          }
          label="Paid Orders"
          value={globalStats.paidCount || "-"}
          subText="System wide"
          color="bg-emerald-500/10"
        />
        <StatCard
          icon={
            <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          }
          label="Total Revenue"
          value={`৳${globalStats.totalRevenue.toLocaleString()}`}
          subText="System wide"
          color="bg-amber-500/10"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search current page..."
            className="pl-10 border-border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterEvent} onValueChange={setFilterEvent}>
          <SelectTrigger className="w-[200px] border-border bg-background">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter current page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {uniqueEvents.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-foreground">
                  Participant
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Event Info
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((reg) => {
                  const status =
                    paymentStatusConfig[reg.status] ||
                    paymentStatusConfig.pending;
                  return (
                    <TableRow
                      key={reg.id}
                      className="hover:bg-muted/30 border-border"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={reg.image} />
                            <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                              {reg.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{reg.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {reg.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase tracking-tight line-clamp-1">
                            {reg.event}
                          </p>
                          <div className="flex gap-1 flex-wrap">
                            <Badge
                              variant="secondary"
                              className="text-[10px] font-medium bg-muted text-muted-foreground border-none"
                            >
                              {reg.package}
                            </Badge>
                            {reg.orderItems.length > 1 && (
                              <Badge className="text-[10px] bg-blue-500/10 text-blue-600 border-none">
                                +{reg.orderItems.length - 1} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`${status.className} border font-medium`}
                        >
                          <status.icon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(reg)}
                          className="h-8 border-border hover:bg-muted"
                        >
                          <Eye className="h-3.5 w-3.5 mr-2" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          {!loading && filteredData.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No registrations found on this page.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <p className="text-sm text-muted-foreground">
          Showing page{" "}
          <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span> (
          {totalCount} total records)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <div className="flex items-center px-4 text-sm font-medium">
            {currentPage}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* DETAILED INFORMATION SHEET */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full bg-card border-l border-border overflow-y-auto">
          <SheetHeader className="border-b border-border pb-4 mb-6">
            <SheetTitle className="text-xl font-bold">
              Registration Data
            </SheetTitle>
          </SheetHeader>

          {selectedReg && (
            <div className="space-y-6 mx-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
                <Avatar className="h-14 w-14 border border-border shadow-sm">
                  <AvatarImage src={selectedReg.image} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {selectedReg.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-bold leading-none text-foreground">
                    {selectedReg.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase tracking-wider bg-background"
                  >
                    {selectedReg.community}
                  </Badge>
                </div>
              </div>

              {/* Order Items Section - Added Feature */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">
                    Purchased Items ({selectedReg.orderItems.length})
                  </h4>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {selectedReg.orderItems.map((item, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`item-${idx}`} 
                      className="border border-border rounded-lg bg-muted/10 px-4 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex flex-col items-start text-left">
                          <span className="text-sm font-bold text-foreground">{item.eventTicket?.name}</span>
                          <span className="text-xs text-muted-foreground font-medium">Participant: {item.participant?.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-4 pt-4 border-t border-border/50">
                          <div className="col-span-2 flex justify-between items-center bg-background p-2 rounded-md border border-border/50">
                             <span className="text-xs font-bold uppercase text-muted-foreground">Ticket Price</span>
                             <span className="font-bold text-primary">৳{item.totalPrice}</span>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">Email</p>
                            <p className="text-xs break-all">{item.participant?.email || "N/A"}</p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">Phone</p>
                            <p className="text-xs">{item.participant?.contactNumber || "N/A"}</p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">Distance</p>
                            <p className="text-xs">{item.participant?.distanceCategory || "N/A"}</p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">T-Shirt Size</p>
                            <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-background border-primary/30 text-primary">
                              {item.participant?.tshirtSize || "N/A"}
                            </Badge>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">Blood Group</p>
                            <p className="text-xs font-bold text-destructive">{item.participant?.bloodGroup || "N/A"}</p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase text-muted-foreground font-black mb-1">Category</p>
                            <p className="text-xs">{item.participant?.ageCategory || "N/A"}</p>
                          </div>
                        </div>

                        {/* Emergency Info for this specific participant */}
                        {item.participant?.emergencyContactName && (
                          <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                            <p className="text-[9px] uppercase text-amber-600 font-bold mb-1 tracking-tighter">Emergency Contact</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold">{item.participant.emergencyContactName}</span>
                                <span className="text-xs font-medium text-muted-foreground">{item.participant.emergencyContactNumber}</span>
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">
                    Contact Information
                  </h4>
                </div>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />{" "}
                    {selectedReg.email}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />{" "}
                    {selectedReg.phone}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />{" "}
                    {selectedReg.address}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-border rounded-xl bg-background shadow-sm">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <HeartPulse className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">
                      Blood Group
                    </span>
                  </div>
                  <p className="font-bold text-foreground">
                    {selectedReg.bloodGroup}
                  </p>
                </div>
                <div className="p-3 border border-border rounded-xl bg-background shadow-sm">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <Shirt className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">
                      T-Shirt Size
                    </span>
                  </div>
                  <p className="font-bold text-foreground">
                    {selectedReg.tshirtSize}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-border border-y border-border py-2">
                {[
                  { label: "Category", val: selectedReg.ageCategory },
                  { label: "Distance", val: selectedReg.distance },
                  { label: "Gender", val: selectedReg.gender },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between py-2.5 text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                <h4 className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-500 mb-2 tracking-widest">
                  Emergency Contact
                </h4>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">
                    {selectedReg.emergencyContact}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedReg.emergencyPhone}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Hash className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase">
                    Transaction ID
                  </span>
                </div>
                <code className="block p-3 bg-muted rounded-lg text-[11px] break-all font-mono text-foreground/70">
                  {selectedReg.transactionId}
                </code>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Order Amount
                  </span>
                  <span className="text-xl font-black text-foreground">
                    ৳{selectedReg.amount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatCard({ icon, label, value, subText, color }) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                {subText}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
