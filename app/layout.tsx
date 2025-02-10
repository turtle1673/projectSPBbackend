// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "วัดระดับน้ำตาล",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar />
        <div className="flex-grow "style={{ 
                backgroundImage: "url('https://i.pinimg.com/originals/0e/0d/72/0e0d72395ecbc6682ea8e7276bc6fe06.gif')", 
                backgroundSize: 'contain',  // Ensures the image fits without distortion
                backgroundPosition: 'center', 
                backgroundAttachment: 'fixed',  // Keeps the image fixed when scrolling
                width: '100vw', 
                height: '100vh', 
                margin: '0', 
                overflow: 'hidden' 
              }}>
        {children}  
        </div>
      </body>
    </html>
  );
}