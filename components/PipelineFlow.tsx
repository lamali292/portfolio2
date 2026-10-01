import { pipelineSteps } from "@/lib/pipeline";
import styles from "./PipelineFlow.module.css";

/**
 * The data pipeline as a numbered sequence of steps joined by a line. The
 * steps really are a sequence (data flows from one to the next).
 */
export default function PipelineFlow() {
  return (
    <ol className={styles.flow}>
      {pipelineSteps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.marker} aria-hidden="true">
            {i + 1}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.tech}>{step.tech}</p>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
