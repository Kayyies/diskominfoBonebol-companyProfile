import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ThemeSwitcher from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diskominfo Bone Bolango",
  description: "Website Resmi Dinas Kominfo Bone Bolango",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
        <body className={inter.className}>
            <div>
                <Navbar />
                {children}
                <Footer />
            </div>
        </body>
    </html>
  );
}
