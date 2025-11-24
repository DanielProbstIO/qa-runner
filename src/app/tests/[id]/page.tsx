import { notFound } from "next/navigation";
import TestRunner from "./test-runner";
import { loadVaultTestcases, type VaultTestCase } from "@/lib/vault-testcases";

// Next.js 16: params ist ein Promise
export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const upperId = id.toUpperCase();

  // Testfälle direkt aus dem Vault laden (Server-Seite)
  const testcases: VaultTestCase[] = loadVaultTestcases();

  // testCaseId aus dem Frontmatter (z.B. ATC017, ATC026)
  const test = testcases.find((t) => t.id.toUpperCase() === upperId);

  if (!test) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 space-y-4">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-black">
            Test {test!.id}: {test!.title}
          </h1>
          <p className="text-sm text-slate-800 mt-2">
            <span className="font-medium">Komponente:</span> {test!.component} •{" "}
            <span className="font-medium">View:</span> {test!.view}
          </p>
          {test!.precondition && (
            <p className="text-sm text-slate-800 mt-1">
              <span className="font-medium">Vorbedingung:</span>{" "}
              {test!.precondition}
            </p>
          )}
        </header>

        <TestRunner test={test!} />
      </div>
    </div>
  );
}