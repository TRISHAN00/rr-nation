import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { sendOtp } from "@/services/otp.service";
import { Button } from "../ui/button";

export default function SendOTPForm({loading, setLoading, setRegisterData, setRegisterStep}) {
  /* ---------------- SEND OTP ---------------- */
  async function handleSendOtp(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      otpType: "REGISTRATION",
      type: "EMAIL",
    };

    try {
      await sendOtp(payload);
      setRegisterData(payload);
      setRegisterStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSendOtp}>
      <div className="flex flex-col gap-1.5">
        <Label>First Name</Label>
        <Input name="firstName" placeholder="Full name" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Last Name</Label>
        <Input name="lastName" placeholder="Last name" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Email</Label>
        <Input name="email" type="email" placeholder="Email address" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Phone</Label>
        <Input name="phone" placeholder="Phone number" />
      </div>

      <Button
        className="w-full"
        disabled={loading}
        style={{ backgroundColor: "var(--color-brand)" }}
      >
        {loading ? "Sending OTP..." : "Submit"}
      </Button>
    </form>
  );
}
