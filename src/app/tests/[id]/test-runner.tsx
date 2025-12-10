"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { VaultTestCase } from "@/lib/vault-testcases";
import { saveScreenshot, getScreenshotBlob, type ScreenshotRef } from "@/lib/screenshot-store";

type StepStatus = "pending" | "ok" | "nok" | "NA";

type StepResult = {
  status: StepStatus;
  comment: string;
  screenshots?: ScreenshotRef[];
};

type TestRunnerProps = {
  test: VaultTestCase;
};

type ScreenshotThumbProps = {
  screenshot: ScreenshotRef;
  onClick: () => void;
  onRemove: () => void;
};

function ScreenshotThumb({ screenshot, onClick, onRemove }: ScreenshotThumbProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    (async () => {
      try {
        const blob = await getScreenshotBlob(screenshot.id);
        if (!blob || cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } catch (e) {
        console.error("Thumbnail konnte nicht geladen werden:", e);
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [screenshot.id]);

  return (
    <div className="relative">
      <button
        type="button"
        className="group relative w-20 h-16 border border-slate-300 rounded-md overflow-hidden bg-slate-100 text-[10px] text-slate-700 flex items-center justify-center"
        onClick={onClick}
      >
        {url ? (
          <img
            src={url}
            alt={screenshot.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="px-1 text-center line-clamp-2">
            {screenshot.name}
          </span>
        )}

        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-[1px] opacity-0 group-hover:opacity-100">
          öffnen
        </span>
      </button>

      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] text-white flex items-center justify-center shadow"
        aria-label="Screenshot entfernen"
      >
        ×
      </button>
    </div>
  );
}

export default function TestRunner({ test }: TestRunnerProps) {
  const router = useRouter();

  // Abgeleiteter Titel (fällt auf ID zurück, falls kein Titel gesetzt)
  const displayTitle = (test.title || "").trim() || test.id;
  // ID-Badge nur anzeigen, wenn der Titel die ID nicht bereits enthält
  const showIdBadge =
    typeof test.id === "string" && !displayTitle.startsWith(test.id);

  // Ergebnisse pro Step, Key z.B. "ATC026.1"
  const [stepResults, setStepResults] = useState<Record<string, StepResult>>(
    () => {
      // Optional: später könnten hier vorhandene Session-Daten vorbefüllt werden
      return {};
    }
  );

  /**
   * Ersetzt alle Vorkommen von "**`= this.testCaseId`**" durch die aktuelle Test-ID
   */
  const normalizeReference = (raw: string | undefined): string => {
    if (!raw) {
      return `${test.id}`;
    }

    // Ersetze "**`= this.testCaseId`**" durch die Test-ID
    return raw.replace(/\*\*`= this\.testCaseId`\*\*/g, test.id);
  };

  function makeStepKey(step: any, index: number): string {
    const raw =
      step.reference ||
      step.ref ||
      step.id;

    if (typeof raw === "string") {
      return normalizeReference(raw);
    }

    // Fallback: reine Positions-basierte ID
    return `${test.id}.${index + 1}`;
  }

  function getStepResult(key: string): StepResult {
    return (
      stepResults[key] || {
        status: "pending",
        comment: "",
        screenshots: [],
      }
    );
  }

  function updateStepResult(key: string, partial: Partial<StepResult>) {
    setStepResults((prev) => {
      const current = prev[key] || {
        status: "pending" as StepStatus,
        comment: "",
        screenshots: [],
      };
      return {
        ...prev,
        [key]: { ...current, ...partial },
      };
    });
  }

  function handleRemoveScreenshot(stepKey: string, screenshotId: string) {
    setStepResults((prev) => {
      const current: StepResult =
        prev[stepKey] || {
          status: "pending" as StepStatus,
          comment: "",
          screenshots: [],
        };

      const filtered = (current.screenshots ?? []).filter(
        (sc) => sc.id !== screenshotId
      );

      return {
        ...prev,
        [stepKey]: {
          ...current,
          screenshots: filtered,
        },
      };
    });
  }

  async function handleAddScreenshot(stepKey: string, file: File | null | undefined) {
    if (!file) return;
    if (typeof window === "undefined") return;

    try {
      const ref = await saveScreenshot(file);

      setStepResults((prev) => {
        const current: StepResult =
          prev[stepKey] || {
            status: "pending",
            comment: "",
            screenshots: [],
          };
        const prevScreens = current.screenshots ?? [];

        return {
          ...prev,
          [stepKey]: {
            ...current,
            screenshots: [...prevScreens, ref],
          },
        };
      });
    } catch (e) {
      console.error("Screenshot konnte nicht gespeichert werden:", e);
      alert("Screenshot konnte nicht gespeichert werden.");
    }
  }

  async function handleOpenScreenshot(screenshotId: string) {
    try {
      const blob = await getScreenshotBlob(screenshotId);
      if (!blob) {
        alert("Screenshot konnte nicht gefunden werden.");
        return;
      }

      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      // Optional: URL später wieder freigeben
      // setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e) {
      console.error("Screenshot konnte nicht geladen werden:", e);
      alert("Screenshot konnte nicht geöffnet werden.");
    }
  }

  function handleFinish() {
    // Validierung: alle Schritte müssen mit OK oder NOK bewertet sein
    const missingRatings =
      test.steps?.filter((step: any, index: number) => {
        const key = makeStepKey(step, index);
        const result = stepResults[key];
        return !result || (result.status !== "ok" && result.status !== "nok");
      }) ?? [];

    if (missingRatings.length > 0) {
      alert(
        "Bitte alle Test-Schritte mit OK oder NOK bewerten, bevor du zum nächsten Test weitergehst."
      );
      return;
    }

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
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead className="bg-slate-100 text-left text-xs uppercase text-slate-700">
            <tr>
              <th className="px-3 py-2 w-24 border-b border-slate-200">Status</th>
              <th className="px-3 py-2 border-b border-slate-200">Referenz</th>
              <th className="px-3 py-2 border-b border-slate-200">Ausgangspunkt</th>
              <th className="px-3 py-2 border-b border-slate-200">Vorgang</th>
              <th className="px-3 py-2 border-b border-slate-200 w-1/2">Erwartetes Verhalten / Kommentar / Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {test.steps?.map((step: any, index: number) => {
              const key = makeStepKey(step, index);
              const result = getStepResult(key);

              return (
                <tr
                  key={key}
                  className="align-top even:bg-slate-50 border-t border-slate-100"
                >
                  {/* Status */}
                  <td className="px-3 py-3 align-top">
                    <div className="inline-flex flex-col gap-1 rounded-md bg-slate-50 p-1 border border-slate-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateStepResult(key, { status: "ok" })
                        }
                        className={
                          "px-2 py-1 text-[11px] rounded-md border transition-colors " +
                          (result.status === "ok"
                            ? "bg-green-600 text-white border-green-700"
                            : "bg-white text-green-700 border-green-300 hover:bg-green-50")
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
                          "px-2 py-1 text-[11px] rounded-md border transition-colors " +
                          (result.status === "nok"
                            ? "bg-red-600 text-white border-red-700"
                            : "bg-white text-red-700 border-red-300 hover:bg-red-50")
                        }
                      >
                        NOK
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateStepResult(key, { status: "NA" })
                        }
                        className={
                          "px-2 py-1 text-[11px] rounded-md border transition-colors " +
                          (result.status === "NA"
                            ? "bg-orange-700 text-white border-orange-800"
                            : "bg-white text-orange-700 border-orange-300 hover:bg-orange-50")
                        }
                      >
                        NA
                      </button>
                    </div>
                  </td>

                  {/* Referenz */}
                  <td className="px-3 py-3 text-xs font-mono text-slate-900">
                    {normalizeReference(step.reference || step.ref || "")}
                  </td>

                  {/* Ausgangspunkt */}
                  <td className="px-3 py-3 text-xs text-slate-900">
                    {step.startingPoint ||
                      step.ausgangspunkt ||
                      step.from ||
                      step.start ||
                      ""}
                  </td>

                  {/* Vorgang */}
                  <td className="px-3 py-3 text-xs text-slate-900">
                    {normalizeReference(step.action || step.vorgang || "")}
                  </td>

                  {/* Erwartetes Verhalten + Kommentar + Screenshot */}
                  <td className="px-3 py-3 text-xs text-slate-900">
                    <div className="space-y-3">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
                        <p
                          className="leading-snug"
                          dangerouslySetInnerHTML={{
                            __html: step.expected || step.erwartet || "",
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-slate-700">
                          Kommentar
                        </label>
                        <textarea
                          className="w-full border border-slate-300 rounded-md p-1.5 text-xs text-black placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                        <div className="flex items-center justify-between">
                          <span className="block text-[10px] font-semibold text-slate-700">
                            Screenshots
                          </span>
                          <label className="text-[10px] text-blue-600 cursor-pointer hover:underline">
                            + Screenshot hinzufügen
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleAddScreenshot(key, e.target.files?.[0])
                              }
                            />
                          </label>
                        </div>

                        {result.screenshots && result.screenshots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {result.screenshots.map((sc) => (
                              <ScreenshotThumb
                                key={sc.id}
                                screenshot={sc}
                                onClick={() => handleOpenScreenshot(sc.id)}
                                onRemove={() => handleRemoveScreenshot(key, sc.id)}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-500">
                            Noch keine Screenshots hinzugefügt.
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Aktionen unten */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleFinish}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 active:bg-blue-800"
        >
          Test abschließen &amp; weiter
        </button>
      </div>
    </section>
  );
}