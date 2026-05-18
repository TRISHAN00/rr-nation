import { CreditCard, ShoppingBag, UserCheck, Users } from "lucide-react";
import { StatCard } from "../../../StatCard";

export default function OrderStats({ stats }) {
  console.log("Stats Data:", stats);

  // 1. Safe extraction fallbacks to support both global objects or nested event-specific datasets
  const registrations = stats?.totalRegistrations ?? stats?.registrationsCount ?? stats?.count ?? 0;
  const orders = stats?.totalOrders ?? stats?.ordersCount ?? 0;
  
  // Active users metric might not be returned on an individual event context; fallback to dynamic calculation if needed
  const activeUsers = stats?.totalActiveUsers ?? stats?.uniqueParticipantsCount ?? "N/A";
  
  const revenue = stats?.totalRevenue ?? stats?.revenue ?? 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* 1. Total Participants Card */}
      <StatCard
        icon={<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        label="Total Participants"
        value={typeof registrations === "number" ? registrations.toLocaleString() : registrations}
        title="Registered Runners"
        color="bg-blue-500/10"
      />

      {/* 2. Total Orders Card */}
      <StatCard
        icon={<ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        label="Total Orders"
        value={typeof orders === "number" ? orders.toLocaleString() : orders}
        title="Successful Transactions"
        color="bg-purple-500/10"
      />

      {/* 3. Active Users Card */}
      <StatCard
        icon={<UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
        label="Active Users"
        value={typeof activeUsers === "number" ? activeUsers.toLocaleString() : activeUsers}
        title="System Accounts"
        color="bg-emerald-500/10"
      />

      {/* 4. Revenue Card */}
      <StatCard
        icon={<CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
        label="Total Revenue"
        value={typeof revenue === "number" ? `৳${revenue.toLocaleString()}` : revenue}
        title="Gross Earnings"
        color="bg-amber-500/10"
      />
    </div>
  );
}