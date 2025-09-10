import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased bg-background font-sans">
        {children}
      </body>
    </html>
  );
}
