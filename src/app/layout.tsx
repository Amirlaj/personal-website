import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amir Lajevardi — Computer Science Student & Developer",
  description:
    "Portfolio of Amir Lajevardi, a Computer Science student at City St George’s, University of London, building backend systems, compilers and iOS apps.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Amir Lajevardi — Computer Science Student & Developer",
    description:
      "Backend systems, compilers and iOS apps by a Computer Science student based in London.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "Amir Lajevardi — Computer Science Student & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir Lajevardi — Computer Science Student & Developer",
    description:
      "Backend systems, compilers and iOS apps by a Computer Science student based in London.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
