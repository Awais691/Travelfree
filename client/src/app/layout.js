import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Travelfree",
  description: "Travel community platform",
};
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
         <Toaster position="top-right" />
      </body>
    </html>
  );
}
