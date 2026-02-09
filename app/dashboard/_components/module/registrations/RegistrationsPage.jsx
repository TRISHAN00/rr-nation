"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const initialRegistrations = [
  {
    id: 1,
    name: "Afrin Jahan",
    email: "afrin@example.com",
    phone: "+880 1712 345678",
    event: "Accounting Day Run 2025",
    package: "10km",
    amount: 800,
    paymentStatus: "paid",
    paymentMethod: "bKash",
    registeredAt: "2025-01-15T10:30:00",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    email: "rafiq@example.com",
    phone: "+880 1812 456789",
    event: "Accounting Day Run 2025",
    package: "21km",
    amount: 1200,
    paymentStatus: "paid",
    paymentMethod: "SSLCommerz",
    registeredAt: "2025-01-14T14:20:00",
    initials: "RA",
  },
  {
    id: 3,
    name: "Sadia Khan",
    email: "sadia@example.com",
    phone: "+880 1912 567890",
    event: "5K Fun Run",
    package: "5km",
    amount: 500,
    paymentStatus: "pending",
    paymentMethod: "Nagad",
    registeredAt: "2025-01-13T09:15:00",
    initials: "SK",
  },
  {
    id: 4,
    name: "Mohammad Hasan",
    email: "hasan@example.com",
    phone: "+880 1612 678901",
    event: "Accounting Day Run 2025",
    package: "5km",
    amount: 500,
    paymentStatus: "paid",
    paymentMethod: "bKash",
    registeredAt: "2025-01-12T16:45:00",
    initials: "MH",
  },
  {
    id: 5,
    name: "Nusrat Faria",
    email: "nusrat@example.com",
    phone: "+880 1512 789012",
    event: "5K Fun Run",
    package: "3km",
    amount: 300,
    paymentStatus: "failed",
    paymentMethod: "bKash",
    registeredAt: "2025-01-11T11:30:00",
    initials: "NF",
  },
  {
    id: 6,
    name: "Kamal Uddin",
    email: "kamal@example.com",
    phone: "+880 1412 890123",
    event: "Accounting Day Run 2025",
    package: "10km",
    amount: 800,
    paymentStatus: "paid",
    paymentMethod: "SSLCommerz",
    registeredAt: "2025-01-10T08:00:00",
    initials: "KU",
  },
];

const paymentStatusConfig = {
  paid: { label: "Paid", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  failed: { label: "Failed", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function RegistrationsPage() {
  const [registrations] = useState(initialRegistrations);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const events = [...new Set(registrations.map((r) => r.event))];

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.phone.includes(searchQuery);
    const matchesEvent = filterEvent === "all" || reg.event === filterEvent;
    const matchesStatus = filterStatus === "all" || reg.paymentStatus === filterStatus;
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    paid: registrations.filter((r) => r.paymentStatus === "paid").length,
    pending: registrations.filter((r) => r.paymentStatus === "pending").length,
    totalRevenue: registrations
      .filter((r) => r.paymentStatus === "paid")
      .reduce((sum, r) => sum + r.amount, 0),
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Event", "Package", "Amount", "Status", "Payment Method", "Date"],
      ...filteredRegistrations.map((r) => [
        r.name,
        r.email,
        r.phone,
        r.event,
        r.package,
        r.amount,
        r.paymentStatus,
        r.paymentMethod,
        new Date(r.registeredAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Registrations</h1>
          <p className="text-muted-foreground">View and manage event registrations</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold">{stats.paid}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">৳{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterEvent} onValueChange={setFilterEvent}>
          <SelectTrigger className="w-[200px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {events.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((reg) => {
                const statusConfig = paymentStatusConfig[reg.paymentStatus];
                const StatusIcon = statusConfig.icon;
                return (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {reg.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{reg.name}</p>
                          <p className="text-xs text-muted-foreground">{reg.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{reg.event}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{reg.package}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">৳{reg.amount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{reg.paymentMethod}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Update Payment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredRegistrations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-lg font-medium">No registrations found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
