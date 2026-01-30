export const metadata = {
  title: "My Profile | RunRise Nation",
  description: "Manage your RunRise Nation membership, track your race history, and update your runner profile.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10 px-7.5">
      <h1 className="text-2xl font-bold mb-4">My Runner Profile</h1>
      <p>Welcome back to the pack! Here you can manage your event registrations and stats.</p>
      {/* Add your Profile components here */}
    </div>
  );
}