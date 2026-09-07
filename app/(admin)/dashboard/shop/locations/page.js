"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import DivisionTab from "./_components/DivisionTab";
import DistrictTab from "./_components/DistrictTab";
import CityTab from "./_components/CityTab";

export default function ShopLocationsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Checkout Locations</h1>
        <p className="text-sm text-muted-foreground">Manage divisions, districts and cities for checkout</p>
      </div>

      <Tabs defaultValue="divisions">
        <TabsList>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
          <TabsTrigger value="districts">Districts</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
        </TabsList>

        <TabsContent value="divisions">
          <DivisionTab />
        </TabsContent>
        <TabsContent value="districts">
          <DistrictTab />
        </TabsContent>
        <TabsContent value="cities">
          <CityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
