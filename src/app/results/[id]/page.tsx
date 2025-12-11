"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getScreenshotBlob, type ScreenshotRef } from "@/lib/screenshot-store";

type StepResult = {
  status: "pending" | "ok" | "nok" | "NA";
  comment: string;
  screenshotUrl?: string; // für alte Runs
  screenshots?: ScreenshotRef[]; // neue Struktur mit mehreren Screenshots
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
  buildVersion?: string;
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

type ScreenshotThumbProps = {
  screenshot: ScreenshotRef;
};

function ScreenshotThumb({ screenshot }: ScreenshotThumbProps) {
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
        console.error("Thumbnail (Result) konnte nicht geladen werden:", e);
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
      {/* Kleine Thumbnail-Ansicht für den Bildschirm */}
      <div className="relative w-20 h-16 border border-slate-300 rounded-md overflow-hidden bg-slate-100 text-[10px] text-slate-700 flex items-center justify-center print:hidden">
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
      </div>

      {/* Große Ansicht nur im Druck/PDF */}
      {url && (
        <div className="hidden print:block mt-2">
          <img
            src={url}
            alt={screenshot.name}
            className="w-full max-h-[20cm] object-contain border border-slate-300 rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export default function ResultPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const router = useRouter();

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
      <main className="min-h-screen bg-slate-50 flex justify-center p-8 print:bg-white print:p-4">
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
    const testIdsFromResults = session.results
      ? Object.keys(session.results)
      : [];
    const testIds =
      testIdsFromResults.length > 0
        ? testIdsFromResults
        : session.testIds && session.testIds.length > 0
        ? session.testIds
        : [];

    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex items-start justify-between gap-4 print:items-center">
            <header className="flex-1 border-b border-slate-300 pb-3 mb-1 print:border-b-2 print:pb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                {/* Logo im PDF (aus public/logo.png) */}
                <div className="hidden print:flex items-center justify-center w-24 h-10">
                  <img
                    src="/logo.png"
                    alt="Firmenlogo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 print:text-[10px]">
                    Testdokumentation
                  </p>
                  <h1 className="text-2xl font-semibold text-black print:text-3xl">
                    {session.title && session.title.trim().length > 0
                      ? session.title
                      : "Session-Ergebnis"}
                  </h1>

                  {session.description && session.description.trim().length > 0 && (
                    <p className="mt-1 text-sm text-slate-700 whitespace-pre-line print:text-[12px]">
                      {session.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-1 text-xs text-slate-700 space-y-1 print:text-[11px]">
                {session.id && (
                  <p>
                    <span className="font-semibold">Session-ID:</span>{" "}
                    <span className="font-mono">{session.id}</span>
                  </p>
                )}
                {session.createdAt && (
                  <p>
                    <span className="font-semibold">Gestartet:</span>{" "}
                    {new Date(session.createdAt).toLocaleString("de-DE")}
                  </p>
                )}
                {session.testerName && (
                  <p>
                    <span className="font-semibold">Tester:</span>{" "}
                    {session.testerName}
                  </p>
                )}
                {session.device && (
                  <p>
                    <span className="font-semibold">Gerät:</span>{" "}
                    {session.device}
                  </p>
                )}
                {session.buildVersion && (
                  <p>
                    <span className="font-semibold">Build-Version:</span>{" "}
                    <span className="font-mono">{session.buildVersion}</span>
                  </p>
                )}
              </div>
            </header>

            <div className="mt-1 flex flex-col items-end gap-2 print:hidden">
              {/* Session im Test-Runner weiterbearbeiten */}
<button
  type="button"
  onClick={() => {
    try {
      if (typeof window !== "undefined" && session.id) {
        window.localStorage.setItem("activeSessionId", session.id);
      }
    } catch (e) {
      console.error("Konnte Session nicht als aktiv markieren:", e);
    }
    // 👉 Neuer Bearbeiten-Screen
    router.push(`/results/${session.id}/edit`);
  }}
  className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600"
>
  Session bearbeiten
</button>

              {/* Neuen Lauf mit demselben Testplan starten */}
              <button
                type="button"
                onClick={() => {
                  if (!testIds || testIds.length === 0) {
                    alert("Für diese Session wurden keine Testfälle gefunden.");
                    return;
                  }
                  const query = encodeURIComponent(testIds.join(","));
                  router.push(`/run?tests=${query}`);
                }}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                Neuen Lauf mit diesem Testplan starten
              </button>

              {/* JSON-Export wie bisher */}
              <button
                type="button"
                onClick={() => {
                  const rawId = session.id ?? "session";
                  const rawBuild = session.buildVersion || "";
                  const safeBuild = rawBuild
                    .toString()
                    .trim()
                    .replace(/[^a-zA-Z0-9._-]/g, "_");
                  const filename = `${rawId}${safeBuild ? `-${safeBuild}` : ""}.json`;
                  exportJson(filename, session);
                }}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900"
              >
                JSON exportieren
              </button>

              {/* PDF-Export wie bisher */}
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
              const naCount = allSteps.filter(
                ([, s]) => s.status === "NA"
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
                    </div>
                    <div className="text-sm font-semibold flex gap-4">
                      <span className="text-green-700">OK: {okCount}</span>
                      <span className="text-red-700">NOK: {nokCount}</span>
                      <span className="text-orange-700">NA: {naCount}</span>
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
                                : s.status === "NA"
                                ? "bg-orange-50 border-orange-200"
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
                                  Screenshot (Legacy-Link):
                                </span>{" "}
                                {s.screenshotUrl}
                              </p>
                            )}

                            {Array.isArray(s.screenshots) &&
                              s.screenshots.length > 0 && (
                                <div className="mt-1 space-y-1">
                                  <p className="text-[11px] text-slate-700 font-semibold">
                                    Screenshots (lokal gespeichert):
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {s.screenshots.map((sc) => (
                                      <ScreenshotThumb
                                        key={sc.id}
                                        screenshot={sc}
                                      />
                                    ))}
                                  </div>
                                </div>
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
              <div className="flex items-start justify-between gap-4 mb-2">
                {/* Logo im PDF (aus public/logo.png) */}
                <div className="hidden print:flex items-center justify-center w-24 h-10">
                  <img
                    src="/logo.png"
                    alt="Firmenlogo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1">
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
                </div>
              </div>
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
                      : info.status === "NA"
                      ? "bg-orange-100 border-orange-300"
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
                      <span className="font-semibold">
                        Screenshot (Legacy-Link):
                      </span>{" "}
                      {info.screenshotUrl}
                    </p>
                  )}

                  {Array.isArray(info.screenshots) &&
                    info.screenshots.length > 0 && (
                      <div className="mt-1 space-y-1">
                        <p className="text-[11px] text-slate-700 font-semibold">
                          Screenshots (lokal gespeichert):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {info.screenshots.map((sc) => (
                            <ScreenshotThumb key={sc.id} screenshot={sc} />
                          ))}
                        </div>
                      </div>
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