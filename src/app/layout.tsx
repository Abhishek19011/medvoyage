import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedVoyage — Your Personalised Medical Tourism Assessment",
  description:
    "Get a professional, data-driven assessment of your medical tourism options. Compare costs, timelines, and top-rated facilities abroad — all in one personalised PDF report for just £39.",
  keywords: [
    "medical tourism",
    "surgery abroad",
    "healthcare cost comparison",
    "knee replacement abroad",
    "dental tourism",
    "IVF abroad",
    "bariatric surgery abroad",
  ],
  openGraph: {
    title: "MedVoyage — Your Personalised Medical Tourism Assessment",
    description:
      "Compare costs, timelines, and top-rated international facilities. Receive a personalised PDF report within hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
