import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/navbar";
import { Providers } from "@/src/utils/theme-provider";
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FileMagic",
  description: "A free unlimited multimedia file convertor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
          <Navbar />
          {children}
          <ToastContainer />
      </Providers>
      </body>
    </html>
  );
}
