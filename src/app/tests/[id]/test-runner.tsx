"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VaultTestCase } from "@/lib/vault-testcases";

type StepStatus = "pending" | "ok" | "nok";

type StepResult = {
  status: StepStatus;
  comment: string;
  screenshotUrl: string;
};

type TestRunnerProps = {
  test: VaultTestCase;
};

export default function TestRunner({ test }: TestRunnerProps) {
  const router = useRouter();

  // Ergebnisse pro Step, Key z.B. "ATC026.1"
  const [stepResults, setStepResults] = useState<Record<string, StepResult>>(
    () => {
      // Optional: später könnten hier vorhandene Session-Daten vorbefüllt werden
      return {};
    }
  );

  /**
   * Normalisiert Referenzstrings aus dem Markdown (z.B. **`= this.testCaseId`**.1)
   * zu einer stabilen Referenz wie "ATC017.1".
   */
  const normalizeReference = (raw: string | undefined, index: number): string => {
    if (!raw) {
      return `${test.id}.${index + 1}`;
    }

    // Dataview-Form wie: **`= this.testCaseId`**.1
    // Wir extrahieren die Endziffer und bauen "ATC017.1" daraus.
    const match = raw.match(/this\.testCaseId.*?\.([0-9]+)/);
    if (match) {
      return `${test.id}.${match[1]}`;
    }

    return raw;
  };

  function makeStepKey(step: any, index: number): string {
    const raw =
      step.reference ||
      step.ref ||
      step.id;

    if (typeof raw === "string") {
      return normalizeReference(raw, index);
    }

    // Fallback: reine Positions-basierte ID
    return `${test.id}.${index + 1}`;
  }

  function getStepResult(key: string): StepResult {
    return (
      stepResults[key] || {
        status: "pending",
        comment: "",
        screenshotUrl: "",
      }
    );
  }

  function updateStepResult(key: string, partial: Partial<StepResult>) {
    setStepResults((prev) => {
      const current = prev[key] || {
        status: "pending",
        comment: "",
        screenshotUrl: "",
      };
      return {
        ...prev,
        [key]: { ...current, ...partial },
      };
    });
  }

  function handleFinish() {
    if (typeof window === "undefined") return;

    const sessionId = window.localStorage.getItem("activeSessionId");
    if (!sessionId) {
      alert("Keine aktive Session gefunden.");
      return;
    }

    const raw = window.localStorage.getItem(sessionId);
    if (!raw) {
      alert("Session-Daten nicht gefunden.");
      return;
    }

    let session: any;
    try {
      session = JSON.parse(raw);
    } catch (e) {
      console.error("Session-Daten konnten nicht geparst werden:", e);
      alert("Session-Daten sind fehlerhaft.");
      return;
    }

    // results-Struktur sicherstellen
    session.results = session.results || {};
    session.results[test.id] = stepResults;

    // Liste der Tests in dieser Session
    const testIds: string[] = session.testIds ?? [];

    // currentIndex bestimmen; falls nicht gesetzt, 0
    let currentIndex: number =
      typeof session.currentIndex === "number" ? session.currentIndex : 0;

    // Falls wir anhand der ID einen genaueren Index finden, den nehmen
    const idIndex = testIds.indexOf(test.id);
    if (idIndex >= 0) {
      currentIndex = idIndex;
    }

    const nextIndex = currentIndex + 1;
    session.currentIndex = nextIndex;

    window.localStorage.setItem(sessionId, JSON.stringify(session));

    if (nextIndex < testIds.length) {
      const nextId = testIds[nextIndex];
      router.push(`/tests/${nextId}`);
    } else {
      router.push(`/results/${sessionId}`);
    }
  }

  return (
    <section className="space-y-4">
      {/* Tabelle der Steps */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase text-slate-700">
            <tr>
              <th className="px-3 py-2 w-20">Status</th>
              <th className="px-3 py-2">Referenz</th>
              <th className="px-3 py-2">Ausgangspunkt</th>
              <th className="px-3 py-2">Vorgang</th>
              <th className="px-3 py-2">Erwartetes Verhalten / Kommentar / Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {test.steps?.map((step: any, index: number) => {
              const key = makeStepKey(step, index);
              const result = getStepResult(key);

              return (
                <tr
                  key={key}
                  className="border-t border-slate-100 align-top"
                >
                  {/* Status */}
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateStepResult(key, { status: "ok" })
                        }
                        className={
                          "px-2 py-1 text-xs rounded-md border " +
                          (result.status === "ok"
                            ? "bg-green-600 text-white border-green-700"
                            : "bg-white text-green-700 border-green-300")
                        }
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateStepResult(key, { status: "nok" })
                        }
                        className={
                          "px-2 py-1 text-xs rounded-md border " +
                          (result.status === "nok"
                            ? "bg-red-600 text-white border-red-700"
                            : "bg-white text-red-700 border-red-300")
                        }
                      >
                        NOK
                      </button>
                    </div>
                  </td>

                  {/* Referenz */}
                  <td className="px-3 py-2 text-xs font-mono text-slate-900">
                    {normalizeReference(
                      (step.reference as string | undefined) ||
                        (step.ref as string | undefined) ||
                        `${test.id}.${index + 1}`,
                      index
                    )}
                  </td>

                  {/* Ausgangspunkt */}
                  <td className="px-3 py-2 text-xs text-slate-900">
                    {step.startingPoint ||
                      step.ausgangspunkt ||
                      step.from ||
                      step.start ||
                      ""}
                  </td>

                  {/* Vorgang */}
                  <td className="px-3 py-2 text-xs text-slate-900">
                    {step.action || step.vorgang || ""}
                  </td>

                  {/* Erwartetes Verhalten + Kommentar + Screenshot */}
                  <td className="px-3 py-2 text-xs text-slate-900 space-y-2">
                    <p>{step.expected || step.erwartet || ""}</p>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold text-slate-700">
                        Kommentar
                      </label>
                      <textarea
                        className="w-full border border-slate-300 rounded-md p-1 text-xs text-black placeholder-slate-500"
                        rows={2}
                        value={result.comment}
                        onChange={(e) =>
                          updateStepResult(key, {
                            comment: e.target.value,
                          })
                        }
                        placeholder="z.B. Verhalten leicht verzögert, Hinweistext war unklar …"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold text-slate-700">
                        Screenshot / Referenz
                      </label>
                      <input
                        className="w-full border border-slate-300 rounded-md p-1 text-xs text-black placeholder-slate-500"
                        value={result.screenshotUrl}
                        onChange={(e) =>
                          updateStepResult(key, {
                            screenshotUrl: e.target.value,
                          })
                        }
                        placeholder="Pfad, Dateiname oder Link zum Screenshot"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Aktionen unten */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleFinish}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium"
        >
          Test abschließen &amp; weiter
        </button>
      </div>
    </section>
  );
}