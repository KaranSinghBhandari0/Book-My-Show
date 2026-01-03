import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/utils/ScrollToTop";

export const metadata = {
  title: "Book My Show",
  description: "Book Tickets Online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body cz-shortcut-listen="true">
        <Navbar />
        {children}
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  );
}
