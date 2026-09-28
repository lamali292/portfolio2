import { renderMath } from "@/lib/math";

interface MathProps {
  tex: string;
  display?: boolean;
}

/**
 * Renders LaTeX as visual math via KaTeX (server-rendered at build time).
 * Use `display` for a centered block equation, omit it for inline math.
 */
export default function Math({ tex, display = false }: MathProps) {
  const html = renderMath(tex, display);
  const Tag = display ? "div" : "span";
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}
