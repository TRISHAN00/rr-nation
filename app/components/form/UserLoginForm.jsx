import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { loginUser } from "@/services/auth.service";

export default function UserLoginForm({ loading, setLoading }) {
  /* ---------------- LOGIN ---------------- */
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 1,
      });

      alert("Login successful");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="flex flex-col gap-1.5">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          required
        />
      </div>

      <Button
        className="w-full"
        disabled={loading}
        style={{ backgroundColor: "var(--color-brand)" }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
