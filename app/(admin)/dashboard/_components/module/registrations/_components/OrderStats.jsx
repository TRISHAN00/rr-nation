import { CreditCard, UserCheck, Users } from "lucide-react";
import { StatCard } from "../../../StatCard";

export default function OrderStats({ stats }) {

  // 1. Core Metrics
  const registrations = stats?.totalRegistrations ?? 0;
  
  // 2. Revenue Formatting & Safe Math rounding
  const rawRevenue = stats?.totalRevenue ?? 0;
  // Rounds decimal values down to a clean whole integer for professional presentation
  const revenue = Math.round(rawRevenue);

  // 3. Dynamic Fallbacks for metrics missing in this specific payload
  // Derive active package groups driving operations dynamically from the array length
  const activePackagesCount = stats?.packageRevenue?.length ?? 0;
  
  // Fallback placeholder values since the API payload leaves these out
  const orders = stats?.totalOrders ?? 0;
  const activeUsers = stats?.totalActiveUsers ?? 0;

  return (
    <div className="space-y-6">
      {/* Upper Grid: Top-level Dynamic Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Participants Card */}
        <StatCard
          icon={<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          label="Total Participants"
          value={registrations.toLocaleString()}
          title="Registered Runners"
          color="bg-blue-500/10"
        />
        
        {/* Active Categories Card - Dynamically generated from array */}
        <StatCard
          icon={<UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          label="Active Packages"
          value={activePackagesCount}
          title="Live Race Categories"
          color="bg-emerald-500/10"
        />

        {/* Dynamic Total Revenue Card */}
        <StatCard
          icon={<CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          label="Total Revenue"
          value={`৳${revenue.toLocaleString()}`}
          title="Gross Earnings"
          color="bg-amber-500/10"
        />
      </div>

      {/* Lower Breakout Grid: Dynamic Category Earnings generated safely from packageRevenue array */}
      {stats?.packageRevenue && stats.packageRevenue.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Revenue Breakout by Category
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.packageRevenue.map((pkg) => (
              <div 
                key={pkg.packageId} 
                className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md"
              >
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 truncate mb-1">
                  {pkg.packageName.trim()}
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  ৳{Math.round(pkg.revenue).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}