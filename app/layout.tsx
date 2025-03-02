import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "วัดระดับน้ำตาล",
};

type LayoutProps = {children?:ReactNode}

export default function RootLayout({children}:LayoutProps ) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar />
        <div className="flex-grow "style={{ 
                backgroundImage: "url('https://i.pinimg.com/736x/ab/52/03/ab5203ae7914f0798884bdfcf3b97b05.jpg')", 
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