import { siteConfig } from "@/lib/site-config";
import { minorProjects } from "@/lib/minor-projects";
import MinorProjectCard from "@/components/MinorProjectCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <h1>{siteConfig.name}</h1>
      <p className={styles.title}>
        {siteConfig.title} &middot; {siteConfig.affiliation}
      </p>
      <p className={styles.bio}>{siteConfig.bio}</p>
      <ul className={styles.links}>
        <li>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={siteConfig.links.xing}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xing
          </a>
        </li>
        <li>
          <a href={`mailto:${siteConfig.links.email}`}>E-Mail</a>
        </li>
      </ul>

      <section className={styles.otherProjects}>
        <h2 className={styles.otherProjectsHeading}>Weitere Projekte</h2>
        <div className={styles.otherProjectsGrid}>
          {minorProjects.map((project) => (
            <MinorProjectCard key={project.name} {...project} />
          ))}
        </div>
      </section>
    </section>
  );
}
