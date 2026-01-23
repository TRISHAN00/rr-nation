import Footer from "@/components/common/footer/Footer.";
import Header from "@/components/common/header/Header";
import { Albert_Sans, Anta } from "next/font/google";
import "./globals.css";

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
  title: "RR Nation",
  description: "RR Nation Web Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${anta.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
