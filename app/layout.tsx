import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "Blog Site",
  description: "Linux and programming blog site.",
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
