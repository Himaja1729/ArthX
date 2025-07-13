import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Inter} from "next/font/google";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"; 
const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "अर्थ-X",
  description: "Financial Empowerment App",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

   
    <html lang="en">
      <body
        className={`${inter.className}`}>
          {/*header*/}
          <Header/>
        <main className="min-h-screen">{children}</main>
        <Toaster richColors/>
        {/*footer*/}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>
            ArthX - Empowering Human, One Financial Step at a Time.</p>
            <p>Created with ❤️ by KrishnaPriya & Himaja.</p>
            
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
