import { AuthProvider } from "@/context/AuthContext";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${anta.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
