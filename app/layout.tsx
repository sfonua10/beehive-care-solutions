import type { Metadata } from "next";
import { Outfit, DM_Sans } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
});

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: "BeeHive Care",
  description: "BeeHive Care is a platform for managing care for the disabled.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-outfit bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
