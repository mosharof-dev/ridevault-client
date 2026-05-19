import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBer from "@/components/shared/NavBer";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RideVault",
  description: "A platform for sharing and discovering car routes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBer />
        {/* container mx-auto px-4 sm:px-6 lg:px-8 */}
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#1e293b", // slate-800
              fontWeight: "600",
              fontSize: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              boxShadow:
                "0 10px 25px -5px rgba(67, 56, 202, 0.15), 0 8px 10px -6px rgba(67, 56, 202, 0.1)",
              border: "1px solid #f8fafc",
              fontFamily: "inherit",
            },
            success: {
              iconTheme: {
                primary: "#14B8A6",
                secondary: "#ffffff",
              },
              style: {
                borderLeft: "4px solid #14B8A6",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#ffffff",
              },
              style: {
                borderLeft: "4px solid #EF4444",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
