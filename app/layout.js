import Footer from "@/components/common/footer/Footer.";
import Header from "@/components/common/header/Header";
import clsx from "clsx";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "RR Nation",
  description: "RR Nation Web Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(`${albertSans.variable} antialiased`)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
