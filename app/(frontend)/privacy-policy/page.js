"use client";

import FAQ from "@/app/components/policies/FAQ";
import PrivacyPolicy from "@/app/components/policies/PrivacyPolicy";
import RefundPolicy from "@/app/components/policies/RefundPolicy";
import TermsConditions from "@/app/components/policies/TermsConditions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-40 max-w-5xl mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Policies & Information
      </h1>

      <Tabs defaultValue="privacy">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-brand text-light">
          <TabsTrigger
            className={" text-white cursor-pointer hover:text-white"}
            value="privacy"
          >
            Privacy Policy
          </TabsTrigger>
          <TabsTrigger
            className={" text-white cursor-pointer hover:text-white"}
            value="refund"
          >
            Return & Refund
          </TabsTrigger>
          <TabsTrigger
            className={" text-white cursor-pointer hover:text-white"}
            value="terms"
          >
            Terms
          </TabsTrigger>
          <TabsTrigger
            className={" text-white cursor-pointer hover:text-white"}
            value="faq"
          >
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <PrivacyPolicy />
        </TabsContent>

        <TabsContent value="refund">
          <RefundPolicy />
        </TabsContent>

        <TabsContent value="terms">
          <TermsConditions />
        </TabsContent>

        <TabsContent value="faq">
          <FAQ />
        </TabsContent>
      </Tabs>
    </div>
  );
}
