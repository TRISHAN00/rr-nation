import Footer from "@/app/components/common/footer/Footer.";
import Header from "@/app/components/common/header/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Albert_Sans, Anta } from "next/font/google";
import "../globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const anta = Anta({
  subsets: ["latin"],
  variable: "--font-anta",
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | RunRise Nation",
    default: "RunRise Nation | Bangladesh's Premier Running Community",
  },
  description:
    "RunRise Nation (RRN) is an AIMS-associate running community in Bangladesh dedicated to fitness, endurance, and the spirit of 'Running and Rising Together'. Join our marathons and events.",
  metadataBase: new URL("https://runrisenation.com"), // Replace with your production URL
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  // This ensures the site looks good when shared
  openGraph: {
    title: "RunRise Nation",
    description:
      "Run and Rise Together with Bangladesh's most active fitness community.",
    url: "https://runrisenation.com",
    siteName: "RunRise Nation",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${anta.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
