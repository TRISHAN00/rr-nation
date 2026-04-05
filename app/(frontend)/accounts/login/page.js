import LoginPage from "./_components/LoginPage";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const redirectTo = params?.redirectTo || "/";
  
  return <LoginPage redirectTo={redirectTo} />;
}