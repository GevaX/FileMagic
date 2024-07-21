import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/navbar";
import { FaGithub } from 'react-icons/fa';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FileMagic",
  description: "A free unlimited multimedia file convertor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      {children}
      </body>
    </html>
  );
}
