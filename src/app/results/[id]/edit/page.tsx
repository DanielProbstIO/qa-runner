"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type StepResult = {
  status: "pending" | "ok" | "nok" | "NA";
  comment: string;
  screenshotUrl?: string;
  screenshots?: any[];
};

type SessionRun = {
  id: string;
  testerName?: string;
  device?: string;
  buildVersion?: string;
  createdAt?: string;
  title?: string;
  description?: string;
  testIds?: string[];
  currentIndex?: number;
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

export default function EditSessionPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [session, setSession] = useState<SessionRun | null>(null);
  const [loading, setLoading] = useState(true);

  const [testerName, setTesterName] = useState("");
  const [device, setDevice] = useState("");
  const [buildVersion, setBuildVersion] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!id) return;

    setLoading(true);
    try {
      let raw = window.localStorage.getItem(id);

      if (!raw) {
        const activeId = window.localStorage.getItem("activeSessionId");
        if (activeId) {
          raw = window.localStorage.getItem(activeId);
        }
      }

      if (!raw) {
        setSession(null);
        return;
      }

      const parsed = JSON.parse(raw) as SessionRun;
      setSession(parsed);

      const testIds =
        parsed.testIds && parsed.testIds.length > 0
          ? parsed.testIds
          : parsed.results
          ? Object.keys(parsed.results)
          : [];

      setSelectedTestIds(testIds);

      setTesterName(parsed.testerName ?? "");
      setDevice(parsed.device ?? "");
      setBuildVersion(parsed.buildVersion ?? "");
      setTitle(parsed.title ?? "");
      setDescription(parsed.description ?? "");
    } catch (e) {
      console.error("Session konnte nicht geladen werden:", e);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-slate-800">Session wird geladen …</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full">
          <h1 className="text-xl font-semibold text-black mb-2">
            Session nicht gefunden
          </h1>
          <p className="text-sm text-slate-800 mb-4">
            Für diese Session konnten keine Daten im lokalen Speicher gefunden
            werden.
          </p>
          <button
            type="button"
            onClick={() => router.push("/results")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </main>
    );
  }

  const testIds =
    session.testIds && session.testIds.length > 0
      ? session.testIds
      : session.results
      ? Object.keys(session.results)
      : [];

  const handleToggleTest = (testId: string) => {
    setSelectedTestIds((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const handleToggleAll = () => {
    if (selectedTestIds.length === testIds.length) {
      setSelectedTestIds([]);
    } else {
      setSelectedTestIds(testIds);
    }
  };

const handleStartEdit = () => {
  if (selectedTestIds.length === 0) {
    alert("Bitte mindestens einen Test zum Bearbeiten auswählen.");
    return;
  }

  const firstSelectedId = selectedTestIds[0];

  const updated: SessionRun = {
    ...session,
    testerName: testerName.trim() || undefined,
    device: device.trim() || undefined,
    buildVersion: buildVersion.trim() || undefined,
    title: title.trim() || undefined,
    description: description.trim() || undefined,
    // Nur die ausgewählten Tests sollen im Runner nacheinander durchlaufen werden
    testIds: [...selectedTestIds],
    currentIndex: 0,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(id, JSON.stringify(updated));
    window.localStorage.setItem("activeSessionId", id);
  }

  // Im Runner bei dem ersten ausgewählten Test anfangen
  router.push(`/tests/${firstSelectedId}`);
};

  const handleCancel = () => {
    router.push(`/results/${id}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-black">
            Session bearbeiten
          </h1>
          <p className="text-sm text-slate-700 mt-1">
            Wähle die Testfälle aus, die du nachbearbeiten möchtest, und passe
            bei Bedarf die Meta-Daten an. Danach startest du die Bearbeitung
            im Test-Runner.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Session-ID:{" "}
            <span className="font-mono">{session.id ?? id}</span>
          </p>
        </header>

        {/* Meta-Daten */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Tester-Name
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={testerName}
              onChange={(e) => setTesterName(e.target.value)}
              placeholder="z.B. Daniel"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Gerät
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="z.B. iPhone 15"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Build-Version
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={buildVersion}
              onChange={(e) => setBuildVersion(e.target.value)}
              placeholder="z.B. 1.0.3 (57)"
            />
          </div>
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Session-Titel (optional)
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Release 1.3 – Regression RCPro"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Beschreibung (optional)
            </label>
            <textarea
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Anmerkungen, Scope, Besonderheiten dieser Session …"
            />
          </div>
        </section>

        {/* Test-Auswahl */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              Tests in dieser Session
            </h2>
            <button
              type="button"
              onClick={handleToggleAll}
              className="px-3 py-1 rounded-md border border-slate-300 text-xs text-slate-800 bg-slate-50"
            >
              {selectedTestIds.length === testIds.length
                ? "Alle abwählen"
                : "Alle auswählen"}
            </button>
          </div>

          {testIds.length === 0 && (
            <p className="text-sm text-slate-700">
              In dieser Session wurden keine Testfälle gefunden.
            </p>
          )}

          {testIds.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-left text-xs uppercase text-slate-700">
                  <tr>
                    <th className="px-3 py-2 w-10">Auswahl</th>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Titel</th>
                    <th className="px-3 py-2">Status (OK / NOK / NA)</th>
                  </tr>
                </thead>
                <tbody>
                  {testIds.map((testId) => {
                    const checked = selectedTestIds.includes(testId);
                    const meta = session.testMeta?.[testId];
                    const titleText = meta?.title ?? testId;

                    const stepMap = session.results?.[testId] ?? {};
                    const allSteps = Object.values(stepMap);

                    const okCount = allSteps.filter(
                      (s) => s.status === "ok"
                    ).length;
                    const nokCount = allSteps.filter(
                      (s) => s.status === "nok"
                    ).length;
                    const naCount = allSteps.filter(
                      (s) => s.status === "NA"
                    ).length;

                    return (
                      <tr
                        key={testId}
                        className={
                          checked
                            ? "bg-blue-50 border-t border-slate-200"
                            : "border-t border-slate-100"
                        }
                      >
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleTest(testId)}
                          />
                        </td>
                        <td className="px-3 py-2 font-mono text-xs text-slate-900">
                          {testId}
                        </td>
                        <td className="px-3 py-2 text-slate-900">
                          {titleText}
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-800">
                          <span className="mr-3 text-green-700">
                            OK: {okCount}
                          </span>
                          <span className="mr-3 text-red-700">
                            NOK: {nokCount}
                          </span>
                          <span className="text-orange-700">
                            NA: {naCount}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Aktionen */}
        <section className="flex justify-between items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-md border border-slate-300 text-sm text-slate-800 bg-slate-50"
          >
            Abbrechen &amp; zurück zum Ergebnis
          </button>
          <button
            type="button"
            onClick={handleStartEdit}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-40"
            disabled={selectedTestIds.length === 0}
          >
            Bearbeitung im Test-Runner starten
          </button>
        </section>
      </div>
    </main>
  );
}