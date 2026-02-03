"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import FillButton from "../common/FillButton";

export default function AuthModal() {
  return (
    <Dialog  >
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

          {/* LOGIN */}
          <TabsContent value="login">
            <form className="space-y-4">
              <div className=" flex flex-col gap-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              <div className=" flex flex-col gap-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Enter password" />
              </div>

              <Button
                className="w-full"
                style={{ backgroundColor: "var(--color-brand)" }}
              >
                Login
              </Button>
            </form>
          </TabsContent>

          {/* REGISTER */}
          <TabsContent value="register">
            <form className="space-y-4">
              <div className=" flex flex-col gap-1.5">
                <Label>Name</Label>
                <Input type="text" placeholder="Full name" />
              </div>

              <div className=" flex flex-col gap-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="Email address" />
              </div>

              <div className=" flex flex-col gap-1.5">
                <Label>Phone</Label>
                <Input type="tel" placeholder="Phone number" />
              </div>

              <div className=" flex flex-col gap-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Create password" />
              </div>

              <div className=" flex flex-col gap-1.5">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="Confirm password" />
              </div>

              <Button
                className="w-full"
                style={{ backgroundColor: "var(--color-brand)" }}
              >
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
