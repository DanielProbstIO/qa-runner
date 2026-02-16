"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { VaultTestCase } from "@/lib/vault-testcases";
import {
  saveScreenshot,
  getScreenshotBlob,
  type ScreenshotRef,
} from "@/lib/screenshot-store";

type StepStatus = "pending" | "ok" | "nok" | "NA";

type StepResult = {
  status: StepStatus;
  comment: string;
  screenshots?: ScreenshotRef[];
};

type SessionData = {
  id?: string;
  testerName?: string;
  device?: string;
  buildVersion?: string;
  title?: string;
  description?: string;
  results?: Record<string, Record<string, StepResult>>;
  testIds?: string[];
  currentIndex?: number;
};

type RunnerStep = {
  id?: string;
  ref?: string;
  reference?: string;
  startingPoint?: string;
  ausgangspunkt?: string;
  from?: string;
  start?: string;
  action?: string;
  vorgang?: string;
  expected?: string;
  erwartet?: string;
};

type StepRow = {
  key: string;
  step: RunnerStep;
  index: number;
  result: StepResult;
};

type TestRunnerProps = {
  test: VaultTestCase;
};

type ScreenshotThumbProps = {
  screenshot: ScreenshotRef;
  onClick: () => void;
  onRemove: () => void;
};

const QUICK_COMMENT_TAGS = ["UI", "Timing", "Text", "Crash"];

function ScreenshotThumb({
  screenshot,
  onClick,
  onRemove,
}: ScreenshotThumbProps) {
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
          <span className="px-1 text-center line-clamp-2">{screenshot.name}</span>
        )}

        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-1 py-[1px] opacity-0 group-hover:opacity-100">
          oeffnen
        </span>
      </button>

      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] text-white flex items-center justify-center shadow"
        aria-label="Screenshot entfernen"
      >
        x
      </button>
    </div>
  );
}

export default function TestRunner({ test }: TestRunnerProps) {
  const router = useRouter();

  const normalizeReference = (raw: string | undefined): string => {
    if (!raw) {
      return `${test.id}`;
    }

    return raw.replace(/\*\*`= this\.testCaseId`\*\*/g, test.id);
  };

  const normalizeActionText = (raw: string | undefined): string => {
    const resolved = normalizeReference(raw || "");
    return resolved
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/\s*;\s*/g, ";\n")
      .trim();
  };

  function makeStepKey(step: RunnerStep, index: number): string {
    const raw = step.reference || step.ref || step.id;

    if (typeof raw === "string") {
      return normalizeReference(raw);
    }

    return `${test.id}.${index + 1}`;
  }

  function getInitialStepResults(): Record<string, StepResult> {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      const sessionId = window.localStorage.getItem("activeSessionId");
      if (!sessionId) return {};

      const raw = window.localStorage.getItem(sessionId);
      if (!raw) return {};

      const session = JSON.parse(raw) as SessionData;
      if (!session.results || !session.results[test.id]) return {};

      return session.results[test.id] || {};
    } catch (e) {
      console.error("Vorhandene Step-Resultate konnten nicht geladen werden:", e);
      return {};
    }
  }

  const [stepResults, setStepResults] = useState<Record<string, StepResult>>(() =>
    getInitialStepResults()
  );
  const [filterMode, setFilterMode] = useState<
    "all" | "nok" | "pending" | "withComment"
  >("all");
  const [activeStepKey, setActiveStepKey] = useState<string | null>(null);
  const [lastUpdatedStepKey, setLastUpdatedStepKey] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  function getStepResult(key: string): StepResult {
    return (
      stepResults[key] || {
        status: "pending",
        comment: "",
        screenshots: [],
      }
    );
  }

  const allRows: StepRow[] = (test.steps || []).map((rawStep, index) => {
    const step = rawStep as unknown as RunnerStep;
    const key = makeStepKey(step, index);
    return {
      key,
      step,
      index,
      result: getStepResult(key),
    };
  });

  const visibleRows = allRows.filter(({ result }) => {
    if (filterMode === "nok") return result.status === "nok";
    if (filterMode === "pending") return result.status === "pending";
    if (filterMode === "withComment") return result.comment.trim().length > 0;
    return true;
  });

  const totalSteps = allRows.length;
  const ratedSteps = allRows.filter(({ result }) => result.status !== "pending").length;
  const okSteps = allRows.filter(({ result }) => result.status === "ok").length;
  const nokSteps = allRows.filter(({ result }) => result.status === "nok").length;
  const naSteps = allRows.filter(({ result }) => result.status === "NA").length;
  const pendingSteps = allRows.filter(({ result }) => result.status === "pending").length;
  const progress = totalSteps > 0 ? Math.round((ratedSteps / totalSteps) * 100) : 0;

  const shouldWarnOnLeave = dirty && ratedSteps > 0 && pendingSteps > 0;

  const persistStepResults = useCallback(
    (resultsToPersist: Record<string, StepResult>) => {
      if (typeof window === "undefined") return false;

      const sessionId = window.localStorage.getItem("activeSessionId");
      if (!sessionId) return false;

      const raw = window.localStorage.getItem(sessionId);
      if (!raw) return false;

      try {
        const session = JSON.parse(raw) as SessionData;
        session.results = session.results || {};
        session.results[test.id] = resultsToPersist;
        window.localStorage.setItem(sessionId, JSON.stringify(session));
        return true;
      } catch (e) {
        console.error("Auto-Save der Session fehlgeschlagen:", e);
        return false;
      }
    },
    [test.id]
  );

  useEffect(() => {
    if (!preview) return;
    return () => {
      URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  useEffect(() => {
    if (!shouldWarnOnLeave) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldWarnOnLeave]);

  useEffect(() => {
    if (Object.keys(stepResults).length === 0) return;

    const timer = window.setTimeout(() => {
      persistStepResults(stepResults);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [stepResults, persistStepResults]);

  const updateStepResult = useCallback((key: string, partial: Partial<StepResult>) => {
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
    setActiveStepKey(key);
    setLastUpdatedStepKey(key);
    setDirty(true);
  }, []);

  function setStepStatus(key: string, status: StepStatus) {
    updateStepResult(key, { status });
  }

  const focusStepRow = useCallback((stepKey: string) => {
    setActiveStepKey(stepKey);
    rowRefs.current[stepKey]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  function focusNextVisibleStep(stepKey: string) {
    const currentIndex = visibleRows.findIndex((row) => row.key === stepKey);
    if (currentIndex === -1) return;

    const next = visibleRows[currentIndex + 1];
    if (next) {
      focusStepRow(next.key);
    }
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target?.isContentEditable;

      if (isEditable) return;
      if (visibleRows.length === 0) return;

      const key = activeStepKey || visibleRows[0].key;
      const lower = event.key.toLowerCase();

      if (event.key === "1") {
        event.preventDefault();
        updateStepResult(key, { status: "ok" });
      } else if (event.key === "2") {
        event.preventDefault();
        updateStepResult(key, { status: "nok" });
      } else if (event.key === "3") {
        event.preventDefault();
        updateStepResult(key, { status: "NA" });
      } else if (lower === "n") {
        event.preventDefault();
        const currentIndex = visibleRows.findIndex((row) => row.key === key);
        const next = currentIndex >= 0 ? visibleRows[currentIndex + 1] : null;
        if (next) {
          focusStepRow(next.key);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeStepKey, visibleRows, updateStepResult, focusStepRow]);

  async function handleRemoveScreenshot(stepKey: string, screenshotId: string) {
    setStepResults((prev) => {
      const current: StepResult =
        prev[stepKey] || {
          status: "pending" as StepStatus,
          comment: "",
          screenshots: [],
        };

      const filtered = (current.screenshots ?? []).filter((sc) => sc.id !== screenshotId);

      return {
        ...prev,
        [stepKey]: {
          ...current,
          screenshots: filtered,
        },
      };
    });

    setLastUpdatedStepKey(stepKey);
    setDirty(true);
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

      setActiveStepKey(stepKey);
      setLastUpdatedStepKey(stepKey);
      setDirty(true);
    } catch (e) {
      console.error("Screenshot konnte nicht gespeichert werden:", e);
      alert("Screenshot konnte nicht gespeichert werden.");
    }
  }

  useEffect(() => {
    const onPaste = async (event: ClipboardEvent) => {
      if (!activeStepKey || !event.clipboardData) return;

      const hasImage = Array.from(event.clipboardData.items).find((item) =>
        item.type.startsWith("image/")
      );

      if (!hasImage) return;

      const imageFile = hasImage.getAsFile();
      if (!imageFile) return;

      event.preventDefault();
      await handleAddScreenshot(activeStepKey, imageFile);
    };

    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [activeStepKey]);

  async function handleOpenScreenshot(screenshotId: string) {
    try {
      const blob = await getScreenshotBlob(screenshotId);
      if (!blob) {
        alert("Screenshot konnte nicht gefunden werden.");
        return;
      }

      const url = URL.createObjectURL(blob);
      setPreview((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev.url);
        }
        return { url, name: "Screenshot" };
      });
    } catch (e) {
      console.error("Screenshot konnte nicht geladen werden:", e);
      alert("Screenshot konnte nicht geoeffnet werden.");
    }
  }

  function closePreview() {
    setPreview((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }

  function appendCommentTag(stepKey: string, tag: string) {
    const current = getStepResult(stepKey).comment;
    const next = current.trim().length > 0 ? `${current} [${tag}] ` : `[${tag}] `;
    updateStepResult(stepKey, { comment: next });
  }

  function autoResizeTextarea(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 240)}px`;
  }

  function handleFinish() {
    const missingRatings = allRows.filter(({ result }) => result.status === "pending");

    if (missingRatings.length > 0) {
      alert(
        "Bitte alle Test-Schritte mit OK, NOK oder NA bewerten, bevor du zum naechsten Test weitergehst."
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

    let session: SessionData;
    try {
      session = JSON.parse(raw) as SessionData;
    } catch (e) {
      console.error("Session-Daten konnten nicht geparst werden:", e);
      alert("Session-Daten sind fehlerhaft.");
      return;
    }

    session.results = session.results || {};
    session.results[test.id] = stepResults;

    const testIds: string[] = session.testIds ?? [];

    let currentIndex: number =
      typeof session.currentIndex === "number" ? session.currentIndex : 0;

    const idIndex = testIds.indexOf(test.id);
    if (idIndex >= 0) {
      currentIndex = idIndex;
    }

    const nextIndex = currentIndex + 1;
    session.currentIndex = nextIndex;

    window.localStorage.setItem(sessionId, JSON.stringify(session));
    setDirty(false);

    if (nextIndex < testIds.length) {
      const nextId = testIds[nextIndex];
      router.push(`/tests/${nextId}`);
    } else {
      router.push(`/results/${sessionId}`);
    }
  }

  function handleAdjustPlan() {
    persistStepResults(stepResults);
    router.push("/run?edit=1");
  }

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              Fortschritt
            </p>
            <p className="text-sm text-slate-800">
              {ratedSteps}/{totalSteps} Steps bewertet ({progress}%)
            </p>
            <div className="h-2 w-72 max-w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-700">
              OK: {okSteps} | NOK: {nokSteps} | NA: {naSteps} | Offen: {pendingSteps}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Filter:</span>
            {[
              { id: "all", label: "Alle" },
              { id: "nok", label: "Nur NOK" },
              { id: "pending", label: "Nur unbewertet" },
              { id: "withComment", label: "Mit Kommentar" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterMode(f.id as typeof filterMode)}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  filterMode === f.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700">
            Shortcuts: 1=OK, 2=NOK, 3=NA, N=Naechster Step
          </div>
        </div>
      </div>

      <div className="max-h-[72vh] overflow-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed text-sm border-separate border-spacing-0">
          <thead className="text-left text-xs uppercase text-slate-700">
            <tr>
              <th className="sticky top-0 left-0 z-30 w-24 border-b border-slate-200 bg-slate-100 px-3 py-2">
                Status
              </th>
              <th className="sticky top-0 z-20 w-28 border-b border-slate-200 bg-slate-100 px-3 py-2">
                Referenz
              </th>
              <th className="sticky top-0 z-20 w-44 border-b border-slate-200 bg-slate-100 px-3 py-2">
                Ausgangspunkt
              </th>
              <th className="sticky top-0 z-20 w-[26%] border-b border-slate-200 bg-slate-100 px-3 py-2 text-slate-900">
                Vorgang
              </th>
              <th className="sticky top-0 z-20 w-[38%] border-b border-slate-200 bg-slate-100 px-3 py-2">
                Erwartetes Verhalten / Kommentar / Screenshot
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(({ key, step, result, index }) => {
              const actionText = normalizeActionText(step.action || step.vorgang || "");
              const isActive = activeStepKey === key;
              const isUpdated = lastUpdatedStepKey === key;

              return (
                <tr
                  key={key}
                  ref={(el) => {
                    rowRefs.current[key] = el;
                  }}
                  onClick={() => setActiveStepKey(key)}
                  className={[
                    "align-top border-t border-slate-100 transition-colors",
                    isActive ? "bg-blue-50/60" : "even:bg-slate-50",
                    isUpdated ? "ring-1 ring-inset ring-blue-300" : "",
                  ].join(" ")}
                >
                  <td
                    className={[
                      "sticky left-0 z-10 px-3 py-3 align-top",
                      isActive ? "bg-blue-50/95" : index % 2 === 1 ? "bg-slate-50" : "bg-white",
                    ].join(" ")}
                  >
                    <div className="sticky top-2 inline-flex flex-col gap-1 rounded-md border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => setStepStatus(key, "ok")}
                        className={
                          "rounded-md border px-2 py-1 text-[11px] transition-colors " +
                          (result.status === "ok"
                            ? "border-green-700 bg-green-600 text-white"
                            : "border-green-300 bg-white text-green-700 hover:bg-green-50")
                        }
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => setStepStatus(key, "nok")}
                        className={
                          "rounded-md border px-2 py-1 text-[11px] transition-colors " +
                          (result.status === "nok"
                            ? "border-red-700 bg-red-600 text-white"
                            : "border-red-300 bg-white text-red-700 hover:bg-red-50")
                        }
                      >
                        NOK
                      </button>
                      <button
                        type="button"
                        onClick={() => setStepStatus(key, "NA")}
                        className={
                          "rounded-md border px-2 py-1 text-[11px] transition-colors " +
                          (result.status === "NA"
                            ? "border-orange-800 bg-orange-700 text-white"
                            : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50")
                        }
                      >
                        NA
                      </button>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[11px] font-mono text-slate-600">
                    {normalizeReference(step.reference || step.ref || "")}
                  </td>

                  <td className="px-3 py-3 text-xs text-slate-700 leading-5">
                    {step.startingPoint || step.ausgangspunkt || step.from || step.start || ""}
                  </td>

                  <td className="px-3 py-3 text-xs text-slate-900">
                    <div className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-2">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-blue-800">
                        Aktion
                      </p>
                      <p className="whitespace-pre-line text-sm font-semibold leading-6 text-slate-900">
                        {actionText}
                      </p>
                    </div>
                  </td>

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
                          className="w-full resize-y border border-slate-300 rounded-md p-1.5 text-xs text-black placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          rows={2}
                          value={result.comment}
                          onFocus={() => setActiveStepKey(key)}
                          onInput={(e) => autoResizeTextarea(e.currentTarget)}
                          onChange={(e) =>
                            updateStepResult(key, {
                              comment: e.target.value,
                            })
                          }
                          placeholder="z.B. Verhalten leicht verzoegert, Hinweistext war unklar ..."
                        />
                        <div className="flex flex-wrap gap-1">
                          {QUICK_COMMENT_TAGS.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => appendCommentTag(key, tag)}
                              className="rounded border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-700 hover:bg-slate-100"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        className="space-y-1 rounded-md border border-dashed border-slate-300 p-2"
                        onDragOver={(e) => {
                          e.preventDefault();
                          setActiveStepKey(key);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith("image/")) {
                            void handleAddScreenshot(key, file);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="block text-[10px] font-semibold text-slate-700">
                            Screenshots
                          </span>
                          <label className="cursor-pointer text-[10px] text-blue-600 hover:underline">
                            + Screenshot hinzufuegen
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleAddScreenshot(key, e.target.files?.[0])}
                            />
                          </label>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Drag and drop oder Bild einfuegen (Cmd/Ctrl+V)
                        </p>

                        {result.screenshots && result.screenshots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {result.screenshots.map((sc) => (
                              <ScreenshotThumb
                                key={sc.id}
                                screenshot={sc}
                                onClick={() => handleOpenScreenshot(sc.id)}
                                onRemove={() => {
                                  void handleRemoveScreenshot(key, sc.id);
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-500">
                            Noch keine Screenshots hinzugefuegt.
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {visibleRows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-600">
                  Keine Steps fuer den aktuellen Filter gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between gap-2 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (!activeStepKey) return;
              focusNextVisibleStep(activeStepKey);
            }}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Naechster Step (N)
          </button>

          <button
            type="button"
            onClick={handleAdjustPlan}
            className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
          >
            Testplan anpassen
          </button>
        </div>

        <button
          type="button"
          onClick={handleFinish}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 active:bg-blue-800"
        >
          Test abschliessen &amp; weiter
        </button>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={closePreview}>
          <div
            className="relative max-h-full w-full max-w-5xl rounded-lg bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white"
            >
              Schliessen
            </button>
            <img
              src={preview.url}
              alt={preview.name}
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
