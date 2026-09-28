import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

import cardBack from "./images/card_back.png";
import card from "./images/card.png";
import search1 from "./images/search1.png";
import search2 from "./images/search2.png";
import spotify from "./images/spotify.png";
import json from "./images/json.png";

const technologies = ["Flask", "Python", "Spotify Web API / spotipy", "OAuth2"];

export default function SpotifyPage() {
  return (
    <section className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Zurück zur Startseite
      </Link>

      <header className={styles.hero}>
        <h1>Webapp &ndash; Spotify Musikquiz</h1>
        <p>
          Eine browserbasierte Webanwendung für das Musikratespiel Hitster.
          Die App digitalisiert das physische Kartenspiel und integriert
          Spotify für nahtlose Musikwiedergabe: Spieler ordnen Songs
          chronologisch in ihre persönliche Zeitlinie ein, während die App die
          passenden Songs automatisch über die Spotify Web API abspielt.
        </p>
      </header>

      <ul className={styles.chips}>
        {technologies.map((tech) => (
          <li key={tech} className={styles.chip}>
            {tech}
          </li>
        ))}
      </ul>

      <div className={styles.section}>
        <h2>Digitale Karte im Browser</h2>
        <p>
          Jede Karte wird als interaktive Webansicht dargestellt. Die
          digitale Version zeigt alle wichtigen Informationen übersichtlich
          an: Interpret/Band, Erscheinungsjahr und Songtitel.
        </p>
        <p>
          Sobald eine neue Karte erscheint, wird automatisch der
          entsprechende Song auf dem verbundenen Spotify-Account abgespielt.
          So können Spieler den Song hören, bevor sie ihre Schätzung abgeben.
        </p>
        <p>
          Mit einem Klick auf die Kartenrückseite werden die Informationen
          aufgedeckt. Ein weiterer Klick auf die aufgedeckte Karte lädt
          automatisch den nächsten Song.
        </p>
        <div className={styles.gallery}>
          <figure className={styles.figure}>
            <Image
              src={cardBack}
              alt="Rückseite der digitalen Hitster-Karte"
            />
            <figcaption>Kartenrückseite (verdeckt)</figcaption>
          </figure>
          <figure className={styles.figure}>
            <Image
              src={card}
              alt="Vorderseite der digitalen Hitster-Karte mit Songinfos"
            />
            <figcaption>Aufgedeckte Karte</figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Playlist-Auswahl über Spotify</h2>
        <p>
          Über die Suchleiste können Spieler gezielt nach Spotify-Playlists
          suchen. Die App greift dabei auf die gesamte Spotify-Bibliothek zu
          und zeigt passende Ergebnisse in Echtzeit an.
        </p>
        <p>
          Sobald eine Playlist ausgewählt ist, werden daraus zufällig Songs
          für das Spiel gezogen. So lassen sich thematische Runden erstellen,
          zum Beispiel nur 80er-Jahre-Hits, Songs einer bestimmten Band oder
          gemischte Jahrzehnte-Playlists.
        </p>
        <div className={styles.gallery}>
          <figure className={styles.figure}>
            <Image
              src={search1}
              alt="Spotify-Suche nach 80er-Jahre Playlists"
            />
            <figcaption>Suche: 80er-Jahre</figcaption>
          </figure>
          <figure className={styles.figure}>
            <Image
              src={search2}
              alt="Spotify-Suche nach Beatles Playlists"
            />
            <figcaption>Suche: Beatles</figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Spotify-Integration über OAuth und API</h2>
        <p>
          Die App nutzt OAuth für die sichere Authentifizierung mit Spotify.
          Nutzer melden sich einmalig mit ihrem Spotify-Account an und
          erteilen der App die notwendigen Berechtigungen für
          Playlist-Zugriff und Musikwiedergabe.
        </p>
        <p>
          Nach erfolgreicher Authentifizierung kommuniziert die App über die
          offizielle Spotify Web API mit dem Dienst.
        </p>
        <p>
          Die empfangenen JSON-Daten werden gefiltert und strukturiert, sodass
          nur spielrelevante Informationen wie Songtitel, Interpret und
          Erscheinungsjahr angezeigt werden.
        </p>
        <div className={styles.gallery}>
          <figure className={styles.figure}>
            <Image src={spotify} alt="Spotify OAuth Login-Bildschirm" />
            <figcaption>Spotify-Authentifizierung</figcaption>
          </figure>
          <figure className={styles.figure}>
            <Image
              src={json}
              alt="Aufbereitete JSON-Daten von Spotify API"
            />
            <figcaption>Verarbeitete API-Daten einer Playlist</figcaption>
          </figure>
        </div>
      </div>

      <p className={styles.note}>
        Der Quellcode und die App sind aus urheberrechtlichen Gründen nicht
        öffentlich verfügbar. Das Projekt dient ausschließlich dem privaten
        Gebrauch und der Portfolio-Präsentation. Die Rechte an „Hitster"
        liegen bei Jumbo Spiele.
      </p>
    </section>
  );
}
