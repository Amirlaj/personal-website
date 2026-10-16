import Image from "next/image";
import Link from "next/link";
import { profile } from "../content/portfolio";

export default function Home() {
  return (
    <main className="home-page">
      <div className="introduction">
        <div className="portrait-column">
          {profile.portrait ? (
            <div className="portrait-frame">
              <Image className="portrait" src={profile.portrait} alt={profile.name} width={320} height={420} unoptimized priority />
            </div>
          ) : (
            <div className="portrait-placeholder" role="img" aria-label="AL — Amir Lajevardi's initials, a placeholder for his portrait">
              <span className="portrait-initials" aria-hidden="true">AL</span>
              <span className="portrait-caption" aria-hidden="true">Amir Lajevardi<br /><span>London, UK</span></span>
            </div>
          )}
        </div>

        <div className="introduction-copy">
          <nav className="personal-links" aria-label="Contact and résumé">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            <a href={`mailto:${profile.email}`}>Email</a>
            <Link href="/interactive">old website</Link>
          </nav>
          <h1>My name is Amir.</h1>
          <p><span aria-hidden="true">🎓</span>{" "}I’m studying Computer Science at {profile.university}.</p>
          <p><span aria-hidden="true">💻</span>{" "}I build backend systems and iOS apps. My recent projects include a compiler, a pharmacy ordering system and a cryptocurrency tracker.</p>
          <p><span aria-hidden="true">📍</span>{" "}I’m based in London, and open to internships and collaborative projects.</p>
        </div>
      </div>
    </main>
  );
}
