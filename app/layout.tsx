// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'
import './globals.css'
import Navbar from './components/Navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body className='' style={{ 
                backgroundImage: "url('https://i.pinimg.com/originals/0e/0d/72/0e0d72395ecbc6682ea8e7276bc6fe06.gif')", 
                backgroundSize: 'contain',  // Ensures the image fits without distortion
                backgroundPosition: 'center', 
                backgroundAttachment: 'fixed',  // Keeps the image fixed when scrolling
                width: '100vw', 
                height: '100vh', 
                margin: '0', 
                overflow: 'hidden' 
              }}>
          <Navbar/>
          <div>
          {children}
          </div>
        </body>
      </html>
    // </ClerkProvider>
  )
}