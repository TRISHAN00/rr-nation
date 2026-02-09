"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { registerUser } from "@/services/auth.service";
import { verifyOtp } from "@/services/otp.service";
import FillButton from "../common/FillButton";
import SendOTPForm from "../form/SendOTPForm";
import UserLoginForm from "../form/UserLoginForm";

export default function AuthModal() {
  const [open, setOpen] = useState(false);            // ✅ modal control
  const [tab, setTab] = useState("login");            // ✅ tab control
  const [registerStep, setRegisterStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VERIFY OTP ---------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    const otp = e.target.otp.value.trim();

    try {
      await verifyOtp({
        email: registerData.email,
        otp,
        otpType: "REGISTRATION",
        type: "EMAIL",
      });

      setRegisterData((prev) => ({ ...prev, otp }));
      setRegisterStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- REGISTER ---------------- */
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: e.target.password.value,
        roleId: 1,
        otp: registerData.otp,
      });

      alert("Registration successful");

      // ✅ Reset + switch to login tab
      setRegisterData({});
      setRegisterStep(1);
      setTab("login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FillButton>Login</FillButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-105 bg-light">
        <DialogHeader>
          <DialogTitle className="text-center text-dark">
            Welcome Back
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* ================= LOGIN ================= */}
          <TabsContent value="login">
            <UserLoginForm
              onSuccess={() => setOpen(false)}   // ✅ close modal after login
            />
          </TabsContent>

          {/* ================= REGISTER ================= */}
          <TabsContent value="register">
            {registerStep === 1 && (
              <SendOTPForm
                loading={loading}
                setLoading={setLoading}
                setRegisterData={setRegisterData}
                setRegisterStep={setRegisterStep}
              />
            )}

            {registerStep === 2 && (
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <div className="flex flex-col gap-1.5">
                  <Label>OTP</Label>
                  <Input name="otp" placeholder="Enter OTP" required />
                </div>

                <Button className="w-full" disabled={loading}>
                  Verify OTP
                </Button>
              </form>
            )}

            {registerStep === 3 && (
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="flex flex-col gap-1.5">
                  <Label>Password</Label>
                  <Input name="password" type="password" required />
                </div>

                <Button className="w-full" disabled={loading}>
                  Register
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
