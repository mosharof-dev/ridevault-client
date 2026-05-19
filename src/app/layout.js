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
        <main>
          {children}
        </main>
        <Footer />
         <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
            },
            
            success: {
              duration: 2000,
              iconTheme: {
                primary: '#4ade80', 
                secondary: '#fff',
              },
            },
            
            error: {
              duration: 3000,
              iconTheme: {
                primary: '#ef4444', 
                secondary: '#fff',
              },
            },
          }}
        />
        </body>
    </html>
  );
}
