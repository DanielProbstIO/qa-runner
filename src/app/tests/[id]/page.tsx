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
        <div className="border rounded-xl bg-slate-50 px-4 py-3">
          <h1 className="text-xl font-semibold text-black mb-1">
            {test!.id} — {test!.title}
          </h1>
          <p className="text-sm text-slate-700 flex flex-wrap items-center gap-2">
            <span className="font-medium">Komponente:</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">{test!.component}</span>
            <span>•</span>
            <span className="font-medium">View:</span>
            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">{test!.view}</span>
          </p>
          {test!.precondition && (
            <p className="text-sm text-slate-700 mt-1 flex flex-wrap items-center gap-2">
              <span className="font-medium">Vorbedingung:</span>
              <span className="px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-800">{test!.precondition}</span>
            </p>
          )}
        </div>

        <TestRunner test={test!} />
      </div>
    </div>
  );
}