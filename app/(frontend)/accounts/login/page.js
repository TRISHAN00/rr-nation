import LoginPage from "./_components/LoginPage";

export default function Page({ searchParams }) {
  const redirectTo = searchParams?.redirectTo || "/events/checkout";

  return <LoginPage redirectTo={redirectTo} />;
}