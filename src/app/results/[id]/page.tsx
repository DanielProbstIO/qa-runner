"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type StepResult = {
  status: "pending" | "ok" | "nok";
  comment: string;
  screenshotUrl: string;
};

type SingleRun = {
  testId: string;
  createdAt: string;
  testerName?: string;
  context?: string;
  results: Record<string, StepResult>;
};

type SessionRun = {
  id: string;
  testerName?: string;
  device?: string;
  createdAt?: string;
  testIds?: string[];
  // z.B. { "ATC026": { "ATC026.1": StepResult, ... }, ... }
  results?: Record<string, Record<string, StepResult>>;
  testMeta?: Record<
    string,
    {
      title: string;
      component?: string;
      view?: string;
    }
  >;
};

// --- Testcase & Step Meta aus der API ---
type VaultStepMeta = {
  id: string;
  from?: string;
  action?: string;
  expected?: string;
};

type VaultTestcaseMeta = {
  id: string;
  steps?: VaultStepMeta[];
};

export default function ResultPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [ready, setReady] = useState(false);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [testcases, setTestcases] = useState<VaultTestcaseMeta[] | null>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    async function loadTestcases() {
      try {
        const res = await fetch("/api/testcases");
        if (!res.ok) {
          console.warn(
            "Konnte Testcases für Detailansicht nicht laden:",
            res.status,
            res.statusText
          );
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.testcases)
          ? data.testcases
          : null;
        if (list) {
          setTestcases(
            list.map((t: any) => ({
              id: t.id,
              steps: Array.isArray(t.steps)
                ? t.steps.map((s: any) => ({
                    id: String(s.id),
                    from: s.from,
                    action: s.action,
                    expected: s.expected,
                  }))
                : [],
            }))
          );
        }
      } catch (e) {
        console.error(
          "Fehler beim Laden der Testcases für Detailansicht:",
          e
        );
      }
    }

    loadTestcases();
  }, []);

  function getStepMeta(stepId: string): VaultStepMeta | null {
    if (!testcases || testcases.length === 0) return null;

    const testId = stepId.split(".")[0];
    const tc = testcases.find((t) => t.id === testId);
    if (!tc || !tc.steps || tc.steps.length === 0) return null;

    return tc.steps.find((s) => s.id === stepId) ?? null;
  }

  if (!ready) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-slate-800">Lade Testergebnis …</p>
      </main>
    );
  }

  const isSession = id.startsWith("session_");

  let raw: string | null = null;

  if (isSession) {
    // 1️⃣ Direkt versuchen, mit der ID aus der URL
    raw = window.localStorage.getItem(id);

    // 2️⃣ Fallback: activeSessionId
    if (!raw) {
      const activeId = window.localStorage.getItem("activeSessionId");

      if (activeId) {
        console.log(
          "[results/[id]] Kein Eintrag mit der URL-ID gefunden, versuche activeSessionId:",
          { urlId: id, activeId }
        );
        raw = window.localStorage.getItem(activeId);
      }

      const allKeys = Object.keys(window.localStorage);
      console.log("[results/[id]] Lokale Storage-Keys:", allKeys);
    }
  } else {
    const storageKey = `result_${id}`;
    raw = window.localStorage.getItem(storageKey);
  }

  if (!raw) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-black mb-2">
            Ergebnis nicht gefunden
          </h1>
          <p className="text-base text-slate-800">
            Für diesen Testlauf konnten keine gespeicherten Daten gefunden
            werden.
          </p>
        </div>
      </main>
    );
  }

  let session: SessionRun | null = null;
  let singleRun: SingleRun | null = null;
  let parseError = false;

  try {
    if (isSession) {
      session = JSON.parse(raw) as SessionRun;
    } else {
      singleRun = JSON.parse(raw) as SingleRun;
    }
  } catch (e) {
    console.error("Fehler beim Parsen der gespeicherten Daten:", e);
    parseError = true;
  }

  if (parseError) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-black mb-2">
            Ergebnis fehlerhaft
          </h1>
          <p className="text-base text-slate-800">
            Die gespeicherten Daten konnten nicht gelesen werden.
          </p>
        </div>
      </main>
    );
  }

  function exportJson(filename: string, data: unknown) {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Fehler beim Export:", e);
      alert("Export fehlgeschlagen.");
    }
  }

  function printAsPdf() {
    try {
      if (typeof window !== "undefined") {
        window.print();
      }
    } catch (e) {
      console.error("Fehler beim Drucken/Export als PDF:", e);
      alert("PDF-Export fehlgeschlagen.");
    }
  }

  // 🔹 Session-Ergebnis
  if (isSession && session) {
    const testIds =
      session.testIds && session.testIds.length > 0
        ? session.testIds
        : session.results
        ? Object.keys(session.results)
        : [];

    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <header>
              <h1 className="text-2xl font-semibold text-black">
                Session-Ergebnis
              </h1>
              <p className="text-sm text-slate-800 mt-2">
                Session-ID: <span className="font-mono">{session.id}</span>
              </p>
              {session.createdAt && (
                <p className="text-sm text-slate-800 mt-1">
                  Datum:{" "}
                  {new Date(session.createdAt).toLocaleString("de-DE")}
                </p>
              )}
              {session.testerName && (
                <p className="text-sm text-slate-800 mt-1">
                  Tester:{" "}
                  <span className="font-semibold">{session.testerName}</span>
                </p>
              )}
              {session.device && (
                <p className="text-sm text-slate-800 mt-1">
                  Gerät/Version:{" "}
                  <span className="font-semibold">{session.device}</span>
                </p>
              )}
            </header>

            <div className="mt-1 flex flex-col items-end gap-2 print:hidden">
              <button
                type="button"
                onClick={() =>
                  exportJson(`${session.id ?? "session"}.json`, session)
                }
                className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900"
              >
                JSON exportieren
              </button>
              <button
                type="button"
                onClick={printAsPdf}
                className="px-3 py-1 rounded-md text-xs font-semibold border border-slate-400 text-slate-800 bg-white hover:bg-slate-100"
              >
                Als PDF drucken
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-2 gap-6 text-xs text-slate-700 print:hidden">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300"
                checked={showOnlyErrors}
                onChange={(e) => setShowOnlyErrors(e.target.checked)}
              />
              Nur Fehler (NOK) anzeigen
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300"
                checked={showDetails}
                onChange={(e) => setShowDetails(e.target.checked)}
              />
              Mehr Details zu jedem Schritt anzeigen
            </label>
          </div>

          <section className="space-y-4">
            {testIds.length === 0 && (
              <p className="text-sm text-slate-800">
                Für diese Session wurden keine Testergebnisse gefunden.
              </p>
            )}

            {testIds.map((testId) => {
              const stepMap = session!.results?.[testId] ?? {};
              const allSteps = Object.entries(stepMap);

              const okCount = allSteps.filter(
                ([, s]) => s.status === "ok"
              ).length;
              const nokCount = allSteps.filter(
                ([, s]) => s.status === "nok"
              ).length;

              const steps = showOnlyErrors
                ? allSteps.filter(([, s]) => s.status === "nok")
                : allSteps;

              const meta = session!.testMeta?.[testId];
              const title = meta?.title ?? testId;

              const normalizeReference = (raw: string | undefined): string => {
                if (!raw) {
                  return `${testId}`;
                }

                // Ersetze "**`= this.testCaseId`**" durch die Test-ID
                return raw.replace(/\*\*`= this\.testCaseId`\*\*/g, testId);
              };

              return (
                <div
                  key={testId}
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {title}
                      </h2>
                      {meta && (meta.component || meta.view) && (
                        <p className="text-xs text-slate-700 mt-0.5">
                          {meta.component && (
                            <>
                              <span className="font-semibold">
                                Komponente:
                              </span>{" "}
                              {meta.component}
                            </>
                          )}
                          {meta.view && (
                            <>
                              {meta.component ? " • " : ""}
                              <span className="font-semibold">View:</span>{" "}
                              {meta.view}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-semibold flex gap-4">
                      <span className="text-green-700">OK: {okCount}</span>
                      <span className="text-red-700">NOK: {nokCount}</span>
                    </div>
                  </div>

                  {steps.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {steps.map(([stepId, s]) => {
                        const meta = showDetails ? getStepMeta(stepId) : null;

                        return (
                          <div
                            key={stepId}
                            className={`p-2 rounded border text-sm text-black ${
                              s.status === "ok"
                                ? "bg-green-50 border-green-200"
                                : s.status === "nok"
                                ? "bg-red-50 border-red-200"
                                : "bg-slate-100 border-slate-200"
                            }`}
                          >
                            <p className="font-semibold">
                              {stepId} — {s.status.toUpperCase()}
                            </p>

                            {showDetails && meta && (
                              <div className="mt-1 text-xs text-slate-800 space-y-0.5">
                                {meta.from && (
                                  <p>
                                    <span className="font-semibold">
                                      Ausgangspunkt:
                                    </span>{" "}
                                    {meta.from}
                                  </p>
                                )}
                                {meta.action && (
                                  <p>
                                    <span className="font-semibold">
                                      Vorgang:
                                    </span>{" "}
                                      {normalizeReference(meta.action)}
                                  </p>
                                )}
                                {meta.expected && (
                                  <p>
                                    <span className="font-semibold">
                                      Erwartetes Verhalten:
                                    </span>{" "}
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: meta.expected,
                                      }}
                                    />
                                  </p>
                                )}
                              </div>
                            )}

                            {s.comment && (
                              <p className="mt-1">
                                <span className="font-semibold">
                                  Kommentar:
                                </span>{" "}
                                {s.comment}
                              </p>
                            )}
                            {s.screenshotUrl && (
                              <p className="mt-1">
                                <span className="font-semibold">
                                  Screenshot:
                                </span>{" "}
                                {s.screenshotUrl}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {showOnlyErrors && steps.length === 0 && (
                    <p className="mt-2 text-xs text-slate-600">
                      Keine NOK-Schritte in diesem Test.
                    </p>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </main>
    );
  }

  // 🔹 Einzel-Testlauf (altes Format)
  if (!isSession && singleRun) {
    const allSteps = Object.entries(singleRun.results);
    const steps = showOnlyErrors
      ? allSteps.filter(([, s]) => s.status === "nok")
      : allSteps;

    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <header>
              <h1 className="text-2xl font-semibold text-black">
                Ergebnis: {singleRun.testId}
              </h1>
              <p className="text-sm text-slate-800 mt-2">
                Datum:{" "}
                {singleRun.createdAt
                  ? new Date(singleRun.createdAt).toLocaleString("de-DE")
                  : "nicht verfügbar"}
              </p>
              {singleRun.testerName && (
                <p className="text-sm text-slate-800 mt-1">
                  Tester:{" "}
                  <span className="font-semibold">
                    {singleRun.testerName}
                  </span>
                </p>
              )}
              {singleRun.context && (
                <p className="text-sm text-slate-800 mt-1">
                  Gerät/Version:{" "}
                  <span className="font-semibold">
                    {singleRun.context}
                  </span>
                </p>
              )}
            </header>

            <div className="mt-1 flex flex-col items-end gap-2 print:hidden">
              <button
                type="button"
                onClick={() =>
                  exportJson(`${singleRun.testId ?? "test"}.json`, singleRun)
                }
                className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900"
              >
                JSON exportieren
              </button>
              <button
                type="button"
                onClick={printAsPdf}
                className="px-3 py-1 rounded-md text-xs font-semibold border border-slate-400 text-slate-800 bg-white hover:bg-slate-100"
              >
                Als PDF drucken
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-2 gap-6 text-xs text-slate-700 print:hidden">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300"
                checked={showOnlyErrors}
                onChange={(e) => setShowOnlyErrors(e.target.checked)}
              />
              Nur Fehler (NOK) anzeigen
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300"
                checked={showDetails}
                onChange={(e) => setShowDetails(e.target.checked)}
              />
              Mehr Details zu jedem Schritt anzeigen
            </label>
          </div>

          <section className="space-y-3 mt-4">
            {steps.map(([stepId, info]) => {
              const meta = showDetails ? getStepMeta(stepId) : null;

              return (
                <div
                  key={stepId}
                  className={`p-3 rounded border text-black ${
                    info.status === "ok"
                      ? "bg-green-100 border-green-300"
                      : info.status === "nok"
                      ? "bg-red-100 border-red-300"
                      : "bg-slate-100 border-slate-300"
                  }`}
                >
                  <p className="font-semibold">
                    {stepId} — {info.status.toUpperCase()}
                  </p>

                  {showDetails && meta && (
                    <div className="mt-1 text-xs text-slate-800 space-y-0.5">
                      {meta.from && (
                        <p>
                          <span className="font-semibold">
                            Ausgangspunkt:
                          </span>{" "}
                          {meta.from}
                        </p>
                      )}
                      {meta.action && (
                        <p>
                          <span className="font-semibold">Vorgang:</span>{" "}
                          {meta.action}
                        </p>
                      )}
                      {meta.expected && (
                        <p>
                          <span className="font-semibold">
                            Erwartetes Verhalten:
                          </span>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: meta.expected,
                            }}
                          />
                        </p>
                      )}
                    </div>
                  )}

                  {info.comment && (
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Kommentar:</span>{" "}
                      {info.comment}
                    </p>
                  )}

                  {info.screenshotUrl && (
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Screenshot:</span>{" "}
                      {info.screenshotUrl}
                    </p>
                  )}
                </div>
              );
            })}
            {showOnlyErrors && steps.length === 0 && (
              <p className="text-xs text-slate-600">
                Keine NOK-Schritte in diesem Testlauf.
              </p>
            )}
          </section>
        </div>
      </main>
    );
  }

  // Fallback
  return (
    <main className="min-h-screen bg-slate-50 flex justify-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-black mb-2">
          Ergebnis fehlerhaft
        </h1>
        <p className="text-base text-slate-800">
          Die gespeicherten Daten konnten nicht gelesen werden.
        </p>
      </div>
    </main>
  );
}