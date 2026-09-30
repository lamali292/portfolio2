import { siteConfig } from "@/lib/site-config";
import { minorProjects } from "@/lib/minor-projects";
import { projects } from "@/lib/projects";
import MinorProjectCard from "@/components/MinorProjectCard";
import ProjectCard, { type CardSize } from "@/components/ProjectCard";
import EducationStrip from "@/components/EducationStrip";
import ImpactStory from "@/components/ImpactStory";
import CvSection from "@/components/CvSection";
import styles from "./page.module.css";

const cardSizes: CardSize[] = [
  "feature",
  "half",
  "half",
  "third",
  "third",
  "third",
  "half",
  "half",
];

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.name}>{siteConfig.name}</h1>
        <p className={styles.title}>
          <span>
            {siteConfig.title}, {siteConfig.affiliation}
          </span>
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
            <a href={`mailto:${siteConfig.links.email}`}>
              {siteConfig.links.email}
            </a>
          </li>
        </ul>
      </section>

      <EducationStrip />

      <ImpactStory />

      <section id="projekte" className={styles.projects}>
        <h2 className={styles.sectionHeading}>Projekte</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              {...project}
              size={cardSizes[i] ?? "third"}
            />
          ))}
        </div>
      </section>

      <section className={styles.otherProjects}>
        <h2 className={styles.sectionHeading}>Weitere Projekte</h2>
        <div className={styles.otherProjectsGrid}>
          {minorProjects.map((project) => (
            <MinorProjectCard key={project.name} {...project} />
          ))}
        </div>
      </section>

      <CvSection />
    </div>
  );
}
