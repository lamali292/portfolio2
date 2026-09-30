import { siteConfig } from "@/lib/site-config";
import { minorProjects } from "@/lib/minor-projects";
import { projects } from "@/lib/projects";
import MinorProjectCard from "@/components/MinorProjectCard";
import ProjectCard, { type CardSize } from "@/components/ProjectCard";
import EducationStrip from "@/components/EducationStrip";
import ImpactStory from "@/components/ImpactStory";
import CvSection from "@/components/CvSection";
import SkillsStrip from "@/components/SkillsStrip";
import { GithubIcon, LinkedinIcon, MailIcon, XingIcon } from "@/components/Icons";
import styles from "./page.module.css";

const contactLinks = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Xing", href: siteConfig.links.xing, Icon: XingIcon, external: true },
  { label: "E-Mail", href: `mailto:${siteConfig.links.email}`, Icon: MailIcon, external: false },
];

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
          {contactLinks.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                className={styles.link}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon className={styles.linkIcon} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <EducationStrip />

      <SkillsStrip />

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
