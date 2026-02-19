import EventDetail from "@/app/components/pages/events/EventDetail";

export const metadata = {
  title: "RunRise Nation Noboborsho Run 1433",
  description: `Celebrate the spirit of Pohela Boishakh with energy, unity, and resilience at{" "} RunRise Nation Noboborsho Run 1433 . This special New Year run is more than a race—it’s a celebration of culture, health, and community. Whether you’re a seasoned runner or just beginning your fitness journey, everyone is welcome to start the Bengali year with strength and positivity.`,
  keywords: [
    "1.33 KM Boishakhi Fun Run 1133 BDT",
    "7.33 KM Boishakhi Challenge 1433 BDT",
    "14.33 KM Noboborsho Endurance Run 1533 BDT",
  ],
  openGraph: {
    title: "RunRise Nation Noboborsho Run 1433",
    description: "RunRise Nation Noboborsho Run 1433",
    type: "article", // Or 'website'
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg",
        width: 1200,
        height: 630,
        alt: "RunRise Nation Noboborsho Run 1433",
      },
    ],
  },
};

export default function EventDetailPage() {
  return (
    <>
      <EventDetail />
    </>
  );
}
