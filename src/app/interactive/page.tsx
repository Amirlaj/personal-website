import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive résumé — Amir Lajevardi",
};

export default function InteractiveResume() {
  return (
    <main className="interactive-page">
      <iframe className="original-portfolio" src="/original-portfolio/index.html" title="Amir Lajevardi — interactive résumé" />
      <Link className="back-home" href="/">← Back to home</Link>
    </main>
  );
}
