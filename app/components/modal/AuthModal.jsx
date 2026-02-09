"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import FillButton from "../common/FillButton";

import { registerUser } from "@/services/auth.service";
import { verifyOtp } from "@/services/otp.service";
import SendOTPForm from "../form/SendOTPForm";
import UserLoginForm from "../form/UserLoginForm";

export default function AuthModal() {
  const [registerStep, setRegisterStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VERIFY OTP ---------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    const otp = e.target.otp.value.trim();

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      setLoading(false);
      return;
    }

    try {
      await verifyOtp({
        email: registerData.email,
        otp,
        otpType: "REGISTRATION",
        type: "EMAIL",
      });

      // ✅ save OTP for final registration
      setRegisterData((prev) => ({
        ...prev,
        otp,
      }));

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
        otp: registerData.otp, // ✅ correct OTP
      });

      alert("Registration successful");

      // optional reset
      setRegisterData({});
      setRegisterStep(1);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FillButton>Login</FillButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-105 bg-light">
        <DialogHeader>
          <DialogTitle className="text-center text-dark">
            Welcome Back
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* ================= LOGIN ================= */}
          <TabsContent value="login">
            <UserLoginForm loading setLoading />
          </TabsContent>

          {/* ================= REGISTER ================= */}
          <TabsContent value="register">
            {/* STEP 1: SEND OTP */}
            {registerStep === 1 && (
              <SendOTPForm
                loading={loading}
                setLoading={setLoading}
                setRegisterData={setRegisterData}
                setRegisterStep={setRegisterStep}
              />
            )}

            {/* STEP 2: VERIFY OTP */}
            {registerStep === 2 && (
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <div className="flex flex-col gap-1.5">
                  <Label>OTP</Label>
                  <Input name="otp" placeholder="Enter OTP" required />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                  style={{ backgroundColor: "var(--color-brand)" }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            )}

            {/* STEP 3: PASSWORD */}
            {registerStep === 3 && (
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="flex flex-col gap-1.5">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create password"
                    required
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                  style={{ backgroundColor: "var(--color-brand)" }}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
