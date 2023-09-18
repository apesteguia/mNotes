import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "mNotes",
  description: "Notes and todos editor and creator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
