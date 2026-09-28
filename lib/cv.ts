export interface EducationEntry {
  degree: string;
  grade: string;
  institution: string;
  period: string;
  detail: string;
}

export interface ExperienceEntry {
  role: string;
  institution: string;
  period: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/**
 * Structured CV content folded into the homepage bio (issue #10), sourced
 * from `docs/content/facts.md`. Home address and phone number are
 * intentionally excluded per the owner's request and must never be added
 * here.
 */
export const education: EducationEntry[] = [
  {
    degree: "M.Sc. Mathematik",
    grade: "Note 1,7",
    institution: "TU Braunschweig",
    period: "Okt 2022 – Mai 2025",
    detail:
      'Schwerpunkt: Numerik, Analysis und Data Science. Masterarbeit (Note 1,0): "Untersuchungen zu Port-Hamiltonian Neural Networks."',
  },
  {
    degree: "B.Sc. Mathematik",
    grade: "Note 1,6",
    institution: "TU Braunschweig",
    period: "Okt 2019 – Okt 2022",
    detail:
      'Bachelorarbeit (Note 1,1): "Einführung in Deep Learning."',
  },
  {
    degree: "Abitur",
    grade: "Note 1,9",
    institution: "Phoenix Gymnasium Wolfsburg-Vorsfelde",
    period: "Aug 2011 – Aug 2019",
    detail: "Leistungskurse: Mathematik, Physik, Chemie.",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Studentische Hilfskraft / Tutor",
    institution: "TU Braunschweig",
    period: "Okt 2021 – Mär 2025",
    detail:
      "Eigenverantwortliche Betreuung von Übungsgruppen (5–30 Personen) in Lineare Algebra, Analysis & Numerik. Konzeption und Durchführung praxisnaher Programmierkurse in MATLAB und C.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "ML & Data Science",
    items: [
      "Python (JAX, PyTorch, TensorFlow, pandas, NumPy, matplotlib)",
      "SQL",
      "Data Analytics",
      "Pipeline-Entwicklung",
    ],
  },
  {
    category: "Software Engineering",
    items: [
      "C#",
      "Java",
      "Kotlin",
      "C",
      "MATLAB",
      "REST-APIs",
      "Git/GitHub",
      "CI/CD (GitHub Actions)",
      "Gradle",
      "Rust",
    ],
  },
  {
    category: "Sprachen",
    items: ["Deutsch (Muttersprache)", "Englisch (C1 – Fließend in Wort & Schrift, akademische Nutzung)"],
  },
  {
    category: "Sonstiges",
    items: ["Top 0,5% weltweit bei Project Euler (Algorithmische Mathematik)"],
  },
];
