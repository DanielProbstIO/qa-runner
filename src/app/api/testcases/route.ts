import { NextResponse } from "next/server";
import { loadVaultTestcases } from "@/lib/vault-testcases";

// Important: Next.js 16 app router API routes must only export named HTTP methods like GET/POST,
// there must be NO default export in this file.

export async function GET() {
  try {
    const testcases = loadVaultTestcases();
    return NextResponse.json(testcases);
  } catch (e) {
    console.error("Fehler beim Laden der Vault-Testcases:", e);
    return NextResponse.json(
      { error: "Testcases konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}