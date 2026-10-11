import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amir Lajevardi — Computer Science Student & Developer",
  description:
    "Portfolio of Amir Lajevardi, a Computer Science student and developer based in London, working across software, iOS and AI.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Amir Lajevardi — Computer Science Student & Developer",
    description:
      "Software, iOS and AI projects by a Computer Science student based in London.",
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
      "Software, iOS and AI projects by a Computer Science student based in London.",
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
