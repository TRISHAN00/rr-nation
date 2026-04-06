import RegisterPage from "./_components/RegistrationPage";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const redirectTo = params?.redirectTo || "/";
  
  return <RegisterPage redirectTo={redirectTo} />;
}