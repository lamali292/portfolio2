import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";
import "@fontsource/young-serif/latin-400.css";
import "@fontsource-variable/schibsted-grotesk/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laurin Maurice Liebhart",
  description:
    "Portfolio von Laurin Maurice Liebhart, M.Sc. Mathematik - Schwerpunkt ML & Numerik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <ThemeScript />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
