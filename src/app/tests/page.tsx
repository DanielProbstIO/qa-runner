"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type StepResult = {
  status: "pending" | "ok" | "nok";
  comment: string;
  screenshotUrl: string;
};

type Run = {
  id: string; // hier: Test-ID (z.B. "ATC026")
  testId: string;
  createdAt: string;
  results: Record<string, StepResult>;
};

export default function ResultsOverview() {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("result_")
    );

    const parsed: Run[] = keys
      .map((storageKey) => {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return null;

        try {
          const data = JSON.parse(raw);
          const testIdFromKey = storageKey.replace(/^result_/, "");
          const testId = data.testId ?? testIdFromKey;

          return {
            id: testId,
            testId,
            createdAt: data.createdAt ?? "",
            results: data.results ?? {},
          } as Run;
        } catch {
          return null;
        }
      })
      .filter((r): r is Run => r !== null);

    setRuns(parsed);
  }, []);

  if (runs.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center p-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-black mb-2">
            Test Ergebnisse
          </h1>
          <p className="text-base text-slate-800">
            Es wurden noch keine Testergebnisse gespeichert.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-black mb-6">
          Test Ergebnisse
        </h1>

        <div className="space-y-4">
          {runs.map((run) => {
            const values = Object.values(run.results);
            const okCount = values.filter((v) => v.status === "ok").length;
            const nokCount = values.filter((v) => v.status === "nok").length;

            return (
              <Link
                key={run.id}
                href={`/results/${run.id}`}
                className="block bg-white border border-slate-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-black">
                      {run.testId}
                    </p>
                    <p className="text-sm text-black mt-1">
                      {run.createdAt
                        ? `Datum: ${new Date(
                            run.createdAt
                          ).toLocaleString("de-DE")}`
                        : "Datum nicht verfügbar"}
                    </p>
                  </div>
                  <div className="text-sm font-semibold flex items-center gap-4">
                    <span className="text-green-700">OK: {okCount}</span>
                    <span className="text-red-700">NOK: {nokCount}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}