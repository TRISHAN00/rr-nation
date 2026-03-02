import { CreditCard, ShoppingBag, UserCheck, Users } from "lucide-react";
import { StatCard } from "../../../StatCard";

export default function OrderStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {" "}
      {/* Changed to 4 columns for better layout */}
      <StatCard
        icon={<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        label="Total Participants"
        value={stats?.totalRegistrations?.toLocaleString()}
        subText="Registered Runners"
        color="bg-blue-500/10"
      />
      <StatCard
        icon={
          <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        }
        label="Total Orders"
        value={stats?.totalOrders?.toLocaleString()}
        subText="Successful Transactions"
        color="bg-purple-500/10"
      />
      <StatCard
        icon={
          <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        }
        label="Active Users"
        value={stats?.totalActiveUsers?.toLocaleString()}
        subText="System Accounts"
        color="bg-emerald-500/10"
      />
      <StatCard
        icon={
          <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        }
        label="Total Revenue"
        value={`৳${stats?.totalRevenue?.toLocaleString()}`}
        subText="Gross Earnings"
        color="bg-amber-500/10"
      />
    </div>
  );
}
