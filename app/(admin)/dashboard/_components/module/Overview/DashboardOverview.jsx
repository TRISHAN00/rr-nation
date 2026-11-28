"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  ArrowUpRight,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  Loader2,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { getDashboardOverview } from "@/services/admin/admin.overview.service";
import { StatCard } from "../../StatCard";

const formatCurrency = (value) => `৳${Math.round(Number(value || 0)).toLocaleString()}`;

export default function DashboardOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getDashboardOverview();
        if (!active) return;
        setOverview(res?.data || null);
      } catch (error) {
        if (!active) return;
        console.error("Failed to load dashboard overview", error);
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Failed to load dashboard overview",
        );
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    {
      title: "Total Active Users",
      value: Number(overview?.totalActiveUsers || 0).toLocaleString(),
      change: "Currently active platform users",
      icon: <Users />,
    },
    {
      title: "Total Active Events",
      value: Number(overview?.totalActiveEvents || 0).toLocaleString(),
      change: "Events currently active",
      icon: <Calendar />,
    },
    {
      title: "Total Orders",
      value: Number(overview?.totalOrders || 0).toLocaleString(),
      change: "All shop orders",
      icon: <ShoppingBag />,
    },
    {
      title: "Total Registrations",
      value: Number(overview?.totalRegistrations || 0).toLocaleString(),
      change: "All event registrations",
      icon: <ClipboardList />,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(overview?.totalRevenue),
      change: "Gross platform revenue",
      icon: <CreditCard />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with Run Rise Nation.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                change={item.change}
                changeType="neutral"
                icon={item.icon}
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-display text-lg">Overview Summary</CardTitle>
                  <CardDescription>Live metrics from admin dashboard overview API</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> Live
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <span className="text-sm text-muted-foreground">{item.title}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
                <CardDescription>Common admin tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="gap-2">
                    <Link href="/dashboard/events/create">
                      <Calendar className="h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/dashboard/blogs/create">
                      <FileText className="h-4 w-4" />
                      Write Blog Post
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/dashboard/shop/orders">
                      <ShoppingBag className="h-4 w-4" />
                      View Orders
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/dashboard/registrations">
                      <ArrowUpRight className="h-4 w-4" />
                      Registrations
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
