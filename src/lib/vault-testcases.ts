import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type VaultTestStep = {
  id: string;        // z.B. "ATC017.1"
  reference: string; // Tabellen-Spalte "Referenz"
  from: string;      // "Ausgangspunkt"
  action: string;    // "Vorgang"
  expected: string;  // "Erwartetes Verhalten"
};

export type VaultTestCase = {
  id: string;           // z.B. "ATC017"
  title: string;        // z.B. "Umgebungslicht messen"
  component: string;    // z.B. "RcPro" oder "Lichtsensor"
  view: string;
  precondition: string;
  steps: VaultTestStep[];
};

// Wurzel deines Vaults: qa-runner/vault/BegaSmartTests
const TESTS_DIR = path.join(process.cwd(), "vault", "BegaSmartTests");

// Alle .md-Dateien rekursiv finden
function findMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return findMarkdownFiles(full);
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      return [full];
    }
    return [];
  });
}

// Tabelle aus dem Markdown-Body parsen
function parseStepsFromMarkdown(body: string, testCaseId: string): VaultTestStep[] {
  const lines = body.split("\n");

  // Zeile mit Header "Referenz" finden
  const headerIndex = lines.findIndex((line) =>
    line.includes("|") && line.toLowerCase().includes("referenz")
  );
  if (headerIndex === -1) return [];

  // Nächste Zeile ist die Trenner-Zeile (--- | --- | ...)
  const dataLines = lines
    .slice(headerIndex + 2)
    .filter((line) => line.includes("|") && line.trim().length > 0);

  return dataLines
    .map((line, idx) => {
      // "| col1 | col2 | ..." -> ["", "col1", "col2", ...]
      const cols = line.split("|").map((c) => c.trim());
      // wir erwarten min. 5 Spalten: "", Referenz, Ausgangspunkt, Vorgang, Erwartetes Verhalten, ""
      if (cols.length < 5) return null;

      const reference = cols[1] ?? "";
      const from = cols[2] ?? "";
      const action = cols[3] ?? "";
      const expected = cols[4] ?? "";

      const stepId = `${testCaseId}.${idx + 1}`;

      return {
        id: stepId,
        reference,
        from,
        action,
        expected,
      } as VaultTestStep;
    })
    .filter((s): s is VaultTestStep => s !== null);
}

export function loadVaultTestcases(): VaultTestCase[] {
  const files = findMarkdownFiles(TESTS_DIR);

  return files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      const id = (data.testCaseId || data.id || "").toString().trim();
      if (!id) {
        // Wenn kein testCaseId gesetzt ist, ignorieren wir die Datei
        return null;
      }

      // Dateiname ohne .md als Fallback-Titel
      const fileName = path.basename(filePath, path.extname(filePath));

      // Ordnername als Fallback-Komponente, falls im Frontmatter nichts steht
      const folderName = path.basename(path.dirname(filePath));

      const component =
        (data.component ||
          data.componente || // dein Beispiel
          folderName ||
          ""
        ).toString();

      const view = (data.view || "").toString();
      const precondition = (data.vorbedingung || data.precondition || "").toString();

      const title = (data.title || fileName).toString();

      const steps = parseStepsFromMarkdown(content, id);

      return {
        id,
        title,
        component,
        view,
        precondition,
        steps,
      } as VaultTestCase;
    })
    .filter((tc): tc is VaultTestCase => tc !== null);
}