import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Light, Regular, Medium, Semibold
});

export const metadata: Metadata = {
  title: "Task Board App",
  description: "Organized day is a happy day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}
