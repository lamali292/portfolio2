// Runs before paint (rendered directly in <head>) so the stored theme
// choice applies immediately, avoiding a flash of the wrong theme. Kept
// tiny and dependency-free on purpose.
const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
