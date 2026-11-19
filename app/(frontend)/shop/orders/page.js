"use client";

import InnerBanner from "@/app/components/common/InnerBanner";
import ShopOrders from "@/app/(frontend)/shop/_components/ShopOrders";

export default function ShopOrdersPage() {
  return (
    <>
      <InnerBanner
        title="My Orders"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "My Orders" }]}
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <ShopOrders />
        </div>
      </div>
    </>
  );
}
