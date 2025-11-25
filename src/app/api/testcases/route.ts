import { NextResponse } from "next/server";
import { loadVaultTestcases } from "@/lib/vault-testcases";

// Important: Next.js 16 app router API routes must only export named HTTP methods like GET/POST,
// there must be NO default export in this file.

export async function GET() {
  try {
    const testcases = loadVaultTestcases();
    return NextResponse.json(testcases);
  } catch (e: unknown) {
    console.error("Fehler beim Laden der Testcases:", e);

    const message =
      e instanceof Error ? e.message : typeof e === "string" ? e : "Unbekannter Fehler";

    return NextResponse.json(
      {
        error: "Testcases konnten nicht geladen werden.",
        details: message,
      },
      { status: 500 }
    );
  }
}