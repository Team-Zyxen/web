import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadataBase = new URL("https://zyxen.in");

export const metadata: Metadata = {
  title: "ZYXEN",
  description:
    "ZYXEN delivers affordable, elegant and AI-driven software solutions for businesses. We provide modern websites, intelligent automation and custom digital systems designed to help companies grow with smart, efficient technology.",

  keywords: [
    "ZYXEN",
    "software solutions",
    "AI solutions",
    "website development",
    "custom software development",
    "business automation",
    "AI integration services",
    "digital transformation",
    "web application development",
    "intelligent automation",
    "enterprise software",
    "affordable AI services",
  ],

  icons: {
    icon: "/previews/logo.png",
    shortcut: "/previews/logo.png",
    apple: "/previews/logo.png",
  },

  openGraph: {
    title: "ZYXEN",
    description:
      "Affordable, elegant and intelligent AI-powered software solutions for modern businesses.",
    url: "https://zyxen.in",
    siteName: "ZYXEN",
    images: [
      {
        url: "/previews/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ZYXEN",
    description:
      "Affordable and elegant AI-driven software and website solutions for businesses.",
    images: ["/previews/og-image.png"],
  },
};

// Optional: set theme color for viewport (if needed)
// export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "ZYXEN", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
