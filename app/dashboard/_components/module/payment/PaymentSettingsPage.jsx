"use client"
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle2, CreditCard, ExternalLink, Save, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const paymentGateways = [
  {
    id: "sslcommerz",
    name: "SSLCommerz",
    description: "Bangladesh's largest payment gateway with support for cards, mobile banking, and internet banking.",
    logo: "🔐",
    color: "bg-blue-500",
    fields: [
      { key: "store_id", label: "Store ID", placeholder: "Your SSLCommerz Store ID" },
      { key: "store_password", label: "Store Password", placeholder: "Your SSLCommerz Store Password", type: "password" },
    ],
    docsUrl: "https://developer.sslcommerz.com/",
  },
  {
    id: "bkash",
    name: "bKash",
    description: "The leading mobile financial service in Bangladesh for instant payments.",
    logo: "📱",
    color: "bg-pink-500",
    fields: [
      { key: "app_key", label: "App Key", placeholder: "Your bKash App Key" },
      { key: "app_secret", label: "App Secret", placeholder: "Your bKash App Secret", type: "password" },
      { key: "username", label: "Username", placeholder: "Your bKash Username" },
      { key: "password", label: "Password", placeholder: "Your bKash Password", type: "password" },
    ],
    docsUrl: "https://developer.bka.sh/",
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Digital Financial Service by Bangladesh Post Office for secure mobile payments.",
    logo: "💳",
    color: "bg-orange-500",
    fields: [
      { key: "merchant_id", label: "Merchant ID", placeholder: "Your Nagad Merchant ID" },
      { key: "public_key", label: "Public Key", placeholder: "Your Nagad Public Key", type: "password" },
      { key: "private_key", label: "Private Key", placeholder: "Your Nagad Private Key", type: "password" },
    ],
    docsUrl: "https://nagad.com.bd/merchant/",
  },
];

export default function PaymentSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [enabledGateways, setEnabledGateways] = useState({
    sslcommerz: true,
    bkash: true,
    nagad: false,
  });
  const [testMode, setTestMode] = useState(true);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Payment settings saved successfully!");
    }, 1000);
  };

  const toggleGateway = (id) => {
    setEnabledGateways((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const enabledCount = Object.values(enabledGateways).filter(Boolean).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">Payment Settings</h1>
        <p className="text-muted-foreground">
          Configure payment gateways for event registrations
        </p>
      </div>

      {/* Test Mode Alert */}
      <Alert className={testMode ? "border-warning bg-warning/10" : "border-success bg-success/10"}>
        <AlertCircle className={`h-4 w-4 ${testMode ? "text-warning" : "text-success"}`} />
        <AlertDescription className="flex items-center justify-between">
          <span>
            {testMode
              ? "Test mode is enabled. No real payments will be processed."
              : "Live mode is enabled. Real payments will be processed."}
          </span>
          <div className="flex items-center gap-2">
            <Label htmlFor="test-mode" className="text-sm cursor-pointer">
              {testMode ? "Test Mode" : "Live Mode"}
            </Label>
            <Switch
              id="test-mode"
              checked={!testMode}
              onCheckedChange={() => setTestMode(!testMode)}
            />
          </div>
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Gateways</p>
                <p className="text-2xl font-bold">{enabledCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mode</p>
                <p className="text-2xl font-bold">{testMode ? "Test" : "Live"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Settings className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-2xl font-bold">{enabledCount > 0 ? "Ready" : "Setup"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateways */}
      <Tabs defaultValue="sslcommerz" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {paymentGateways.map((gateway) => (
            <TabsTrigger key={gateway.id} value={gateway.id} className="gap-2">
              <span>{gateway.logo}</span>
              <span className="hidden sm:inline">{gateway.name}</span>
              {enabledGateways[gateway.id] && (
                <Badge variant="outline" className="ml-1 h-5 bg-success/10 text-success border-success/20 text-[10px]">
                  ON
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {paymentGateways.map((gateway) => (
          <TabsContent key={gateway.id} value={gateway.id} className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${gateway.color} text-white text-2xl`}>
                      {gateway.logo}
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg flex items-center gap-2">
                        {gateway.name}
                        {enabledGateways[gateway.id] && (
                          <Badge className="bg-success text-success-foreground">Enabled</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{gateway.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`enable-${gateway.id}`} className="text-sm">
                      {enabledGateways[gateway.id] ? "Enabled" : "Disabled"}
                    </Label>
                    <Switch
                      id={`enable-${gateway.id}`}
                      checked={enabledGateways[gateway.id]}
                      onCheckedChange={() => toggleGateway(gateway.id)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {enabledGateways[gateway.id] && (
                  <>
                    <div className="grid gap-4">
                      {gateway.fields.map((field) => (
                        <div key={field.key} className="grid gap-2">
                          <Label htmlFor={`${gateway.id}-${field.key}`}>{field.label}</Label>
                          <Input
                            id={`${gateway.id}-${field.key}`}
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button variant="outline" size="sm" asChild>
                        <a href={gateway.docsUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Documentation
                        </a>
                      </Button>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  </>
                )}

                {!enabledGateways[gateway.id] && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>Enable this gateway to configure settings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">General Payment Settings</CardTitle>
          <CardDescription>Configure default payment behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="BDT" disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="success-url">Success Redirect URL</Label>
              <Input id="success-url" placeholder="https://yoursite.com/payment-success" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fail-url">Failure Redirect URL</Label>
              <Input id="fail-url" placeholder="https://yoursite.com/payment-failed" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cancel-url">Cancel Redirect URL</Label>
              <Input id="cancel-url" placeholder="https://yoursite.com/payment-cancelled" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
