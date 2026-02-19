"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
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
  SheetTitle
} from "@/components/ui/sheet";
import { getAllOrders } from "@/services/admin/admin.event.service";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
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
  Users,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

const paymentStatusConfig = {
  completed: { 
    label: "Paid", 
    icon: CheckCircle, 
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
  },
  pending: { 
    label: "Pending", 
    icon: Clock, 
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20" 
  },
  failed: { 
    label: "Failed", 
    icon: XCircle, 
    className: "bg-destructive/15 text-destructive border-destructive/20" 
  },
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [selectedReg, setSelectedReg] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        const items = res?.data?.items || [];

        const mappedData = items.map((item) => {
          const firstTicket = item.order?.items?.[0];
          const participant = firstTicket?.participant;
          
          return {
            id: item.id,
            transactionId: item.transactionId,
            name: participant?.name || `${item.user?.firstName} ${item.user?.lastName}`,
            email: participant?.email || item.user?.email,
            phone: participant?.contactNumber || "N/A",
            event: firstTicket?.eventTicket?.event?.name || "N/A",
            package: firstTicket?.eventTicket?.name || "Ticket",
            amount: parseFloat(item.afterDiscountAmount || item.orginalAmount || 0),
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
            community: participant?.communityName || "None"
          };
        });

        setRegistrations(mappedData);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  const events = [...new Set(registrations.map((r) => r.event))];
  const filteredData = registrations.filter((reg) => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.phone.includes(searchQuery);
    const matchesEvent = filterEvent === "all" || reg.event === filterEvent;
    return matchesSearch && matchesEvent;
  });

  // Stats Calculations
  const totalRevenue = registrations
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.amount, 0);
  const paidCount = registrations.filter(r => r.status === 'completed').length;

  const handleViewDetails = (reg) => {
    setSelectedReg(reg);
    setIsSheetOpen(true);
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 bg-background text-foreground">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground text-sm">Real-time overview of event registrations.</p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Registered</p>
                <p className="text-2xl font-bold text-foreground">{registrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Orders</p>
                <p className="text-2xl font-bold text-foreground">{paidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">৳{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by name or phone..." 
            className="pl-10 border-border bg-background" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterEvent} onValueChange={setFilterEvent}>
          <SelectTrigger className="w-[200px] border-border bg-background">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {events.map(event => (
              <SelectItem key={event} value={event}>{event}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-foreground">Participant</TableHead>
                <TableHead className="font-semibold text-foreground">Event Info</TableHead>
                <TableHead className="font-semibold text-foreground text-center">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((reg) => {
                const status = paymentStatusConfig[reg.status] || paymentStatusConfig.pending;
                return (
                  <TableRow key={reg.id} className="hover:bg-muted/30 border-border">
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
                          <p className="text-xs text-muted-foreground">{reg.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-tight">{reg.event}</p>
                        <Badge variant="secondary" className="text-[10px] font-medium bg-muted text-muted-foreground border-none">
                          {reg.package}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`${status.className} border font-medium`}>
                        <status.icon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(reg)} className="h-8 border-border hover:bg-muted">
                        <Eye className="h-3.5 w-3.5 mr-2" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No registrations found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* DETAILED INFORMATION SHEET */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full bg-card border-l border-border overflow-y-auto">
          <SheetHeader className="border-b border-border pb-4 mb-6">
            <SheetTitle className="text-xl font-bold">Registration Data</SheetTitle>
          </SheetHeader>
          
          {selectedReg && (
            <div className="space-y-6 mx-4">
              {/* Profile Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
                <Avatar className="h-14 w-14 border border-border shadow-sm">
                  <AvatarImage src={selectedReg.image} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">{selectedReg.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-bold leading-none text-foreground">{selectedReg.name}</h3>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-background">
                    {selectedReg.community}
                  </Badge>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Contact Information</h4>
                </div>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /> {selectedReg.email}</div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /> {selectedReg.phone}</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground" /> {selectedReg.address}</div>
                </div>
              </div>

              {/* Vital Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-border rounded-xl bg-background shadow-sm">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <HeartPulse className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">Blood Group</span>
                  </div>
                  <p className="font-bold text-foreground">{selectedReg.bloodGroup}</p>
                </div>
                <div className="p-3 border border-border rounded-xl bg-background shadow-sm">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <Shirt className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">T-Shirt Size</span>
                  </div>
                  <p className="font-bold text-foreground">{selectedReg.tshirtSize}</p>
                </div>
              </div>

              {/* Event Metadata */}
              <div className="divide-y divide-border border-y border-border py-2">
                {[
                  { label: "Category", val: selectedReg.ageCategory },
                  { label: "Distance", val: selectedReg.distance },
                  { label: "Gender", val: selectedReg.gender }
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                <h4 className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-500 mb-2 tracking-widest">Emergency Contact</h4>
                <div className="flex flex-col">
                   <span className="font-bold text-foreground">{selectedReg.emergencyContact}</span>
                   <span className="text-sm font-medium text-muted-foreground">{selectedReg.emergencyPhone}</span>
                </div>
              </div>

              {/* Transaction Footnote */}
              <div className="pt-4 border-t border-border">
                 <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <Hash className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">Transaction ID</span>
                 </div>
                 <code className="block p-3 bg-muted rounded-lg text-[11px] break-all font-mono text-foreground/70">
                    {selectedReg.transactionId}
                 </code>
                 <div className="flex justify-between items-center mt-6">
                    <span className="text-sm font-medium text-muted-foreground">Amount Paid</span>
                    <span className="text-xl font-black text-foreground">৳{selectedReg.amount}</span>
                 </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}