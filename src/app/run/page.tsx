"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { VaultTestCase } from "@/lib/vault-testcases";


type TestCase = VaultTestCase;

type SortKey = "id" | "title" | "component" | "view";

type TestSession = {
  id: string;
  testerName: string;
  device: string;
  createdAt: string;
  testIds: string[];
  currentIndex?: number;
  results?: Record<string, any>;
  testMeta?: Record<
    string,
    {
      title: string;
      component?: string;
      view?: string;
    }
  >;
};

export default function RunSetupPage() {
  const router = useRouter();
  const [testcases, setTestcases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/testcases");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: TestCase[] = await res.json();
        setTestcases(data);
      } catch (e) {
        console.error("Fehler beim Laden der Testcases:", e);
        setError("Testcases konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const activeId = window.localStorage.getItem("activeSessionId");
    if (!activeId) return;

    const raw = window.localStorage.getItem(activeId);
    if (!raw) return;

    try {
      const session = JSON.parse(raw);
      setActiveSession({ ...session, id: activeId });
    } catch (e) {
      console.error("Aktive Session konnte nicht gelesen werden:", e);
    }
  }, []);

  const [forcedTestIds, setForcedTestIds] = useState<string[] | null>(null);
  const [testerName, setTesterName] = useState("");
  const [device, setDevice] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const testsParam = params.get("tests");
    if (!testsParam) return;

    const ids = testsParam
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (ids.length > 0) {
      setForcedTestIds(ids);
      setSelectedIds(ids);
    }
  }, []);

  const uniqueTestcases = useMemo(() => {
    const seen = new Set<string>();

    const base = forcedTestIds
      ? testcases.filter((t) => forcedTestIds.includes(t.id))
      : testcases;

    return base.filter((tc) => {
      if (seen.has(tc.id)) return false;
      seen.add(tc.id);
      return true;
    });
  }, [testcases, forcedTestIds]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    uniqueTestcases.forEach((t) => {
      if (Array.isArray(t.testTags)) {
        t.testTags.forEach((tag) => {
          const trimmed = tag.trim();
          if (trimmed.length > 0) {
            tags.add(trimmed);
          }
        });
      }
    });

    return Array.from(tags).sort((a, b) => a.localeCompare(b, "de"));
  }, [uniqueTestcases]);

  const filteredTests = useMemo(() => {
    const f = filter.trim().toLowerCase();

    return uniqueTestcases.filter((t) => {
      const haystack = [t.id, t.title, t.component, t.view]
        .join(" ")
        .toLowerCase();
      const matchesText = !f || haystack.includes(f);

      const tags: string[] = Array.isArray(t.testTags) ? t.testTags : [];
      const matchesTag =
        selectedTags.length === 0 ||
        tags.some((tag) => selectedTags.includes(tag));

      return matchesText && matchesTag;
    });
  }, [filter, uniqueTestcases, selectedTags]);

  const allFilteredSelected =
    filteredTests.length > 0 &&
    filteredTests.every((t) => selectedIds.includes(t.id));

  const handleToggleAllFiltered = () => {
    setSelectedIds((prev) => {
      if (allFilteredSelected) {
        // gefilterte Tests aus der Auswahl entfernen, andere Auswahl behalten
        const filteredIds = new Set(filteredTests.map((t) => t.id));
        return prev.filter((id) => !filteredIds.has(id));
      } else {
        // alle gefilterten Tests zur Auswahl hinzufügen
        const merged = new Set(prev);
        filteredTests.forEach((t) => merged.add(t.id));
        return Array.from(merged);
      }
    });
  };

  const sortedTests = useMemo(() => {
    const arr = [...filteredTests];

    arr.sort((a, b) => {
      const getVal = (t: TestCase) => {
        switch (sortKey) {
          case "id":
            return t.id ?? "";
          case "title":
            return t.title ?? "";
          case "component":
            return t.component ?? "";
          case "view":
            return t.view ?? "";
          default:
            return t.id ?? "";
        }
      };

      const av = getVal(a).toString().toLowerCase();
      const bv = getVal(b).toString().toLowerCase();

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [filteredTests, sortKey, sortDir]);

  function toggleSelection(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSelectAllVisible() {
    setSelectedIds(filteredTests.map((t) => t.id));
  }

  function handleClearSelection() {
    setSelectedIds([]);
  }

  function handleSort(key: SortKey) {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
        return prevKey;
      } else {
        setSortDir("asc");
        return key;
      }
    });
  }

  function handleResumeSession() {
    if (!activeSession) return;

    const testIds: string[] = activeSession.testIds ?? [];
    const results = activeSession.results ?? {};

    if (testIds.length === 0) {
      alert("In der aktiven Session sind keine Testfälle hinterlegt.");
      return;
    }

    const doneCount = Object.keys(results).length;
    const total = testIds.length;

    // 🔹 Wenn alle Tests erledigt sind → direkt zur Session-Ergebnis-Seite
    if (total > 0 && doneCount >= total) {
      router.push(`/results/${activeSession.id}`);
      return;
    }

    // 🔹 Sonst: passenden Test zum Fortsetzen finden
    const currentIndex: number = activeSession.currentIndex ?? 0;
    let idx = currentIndex;

    // Wenn currentIndex schon hinter dem letzten Test liegt:
    if (idx >= total) {
      // Versuche, den ersten Test ohne Ergebnis zu finden
      idx = testIds.findIndex((testId) => !results[testId]);

      if (idx === -1) {
        // Fallback: sicherheitshalber trotzdem zum Ergebnis
        router.push(`/results/${activeSession.id}`);
        return;
      }
    }

    const nextId = testIds[idx];
    router.push(`/tests/${nextId}`);
  }

  function handleResetSession() {
    if (typeof window !== "undefined") {
      const activeId = window.localStorage.getItem("activeSessionId");
      if (activeId) {
        // Optional: Session-Eintrag behalten oder löschen
        // window.localStorage.removeItem(activeId);
      }
      window.localStorage.removeItem("activeSessionId");
    }
    setActiveSession(null);
  }

  function handleStartSession() {
    if (!testerName.trim()) {
      alert("Bitte einen Tester-Namen eingeben.");
      return;
    }
    if (selectedIds.length === 0) {
      alert("Bitte mindestens einen Test auswählen.");
      return;
    }

    const createdAt = new Date().toISOString();
    const sessionId = `session_${createdAt}`;

    // Meta-Daten (Titel, Komponente, View) pro Test-ID sammeln,
    // damit die Result-Ansicht mehr als nur die ID anzeigen kann.
    const testMeta: Record<
      string,
      {
        title: string;
        component?: string;
        view?: string;
      }
    > = {};

    for (const id of selectedIds) {
      const tc = testcases.find((t) => t.id === id);
      if (tc) {
        testMeta[id] = {
          title: tc.title,
          component: tc.component,
          view: tc.view,
        };
      }
    }

    const session: TestSession = {
      id: sessionId,
      testerName: testerName.trim(),
      device: device.trim(),
      createdAt,
      testIds: selectedIds,
      currentIndex: 0,
      results: {},
      testMeta,
    };

    // Session speichern
    localStorage.setItem(sessionId, JSON.stringify(session));
    localStorage.setItem("activeSessionId", sessionId);

    // Zum ersten Test springen
    const firstTestId = selectedIds[0];
    router.push(`/tests/${firstTestId}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-slate-800">Lade Testfälle aus dem Vault …</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-red-700">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-black">
            Test-Session starten
          </h1>
          <p className="text-sm text-slate-800 mt-2">
            Wähle die Testfälle aus, die in dieser Session ausgeführt werden
            sollen. Name und Gerät müssen nur hier einmal angegeben werden.
          </p>
        </header>

        {activeSession && (
          <section className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Aktive Session
                </p>
                <p className="text-xs text-blue-900">
                  Session-ID:{" "}
                  <span className="font-mono">{activeSession.id}</span>
                </p>
                {activeSession.testerName && (
                  <p className="text-xs text-blue-900">
                    Tester:{" "}
                    <span className="font-semibold">
                      {activeSession.testerName}
                    </span>
                  </p>
                )}
                {activeSession.device && (
                  <p className="text-xs text-blue-900">
                    Gerät/Version:{" "}
                    <span className="font-semibold">
                      {activeSession.device}
                    </span>
                  </p>
                )}
                {activeSession.createdAt && (
                  <p className="text-xs text-blue-900">
                    Gestartet:{" "}
                    {new Date(activeSession.createdAt).toLocaleString("de-DE")}
                  </p>
                )}
              </div>
              <div className="text-right">
                {(() => {
                  const testIds: string[] = activeSession.testIds ?? [];
                  const results = activeSession.results ?? {};
                  const doneCount = Object.keys(results).length;
                  const total = testIds.length;

                  return (
                    <p className="text-xs text-blue-900">
                      Fortschritt:{" "}
                      <span className="font-semibold">
                        {doneCount} / {total || "?"} Tests abgeschlossen
                      </span>
                    </p>
                  );
                })()}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleResumeSession}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white"
              >
                Session fortsetzen
              </button>
              <button
                type="button"
                onClick={handleResetSession}
                className="px-3 py-1 rounded-md text-xs border border-blue-400 text-blue-800 bg-blue-100"
              >
                Neue Session starten
              </button>
            </div>
          </section>
        )}

        {/* Meta-Infos zur Session */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Gerät / Version
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="z.B. iPhone 15 / App 1.0.3"
            />
          </div>
        </section>

        {/* Filter */}
        <section className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-semibold text-black">
                Filter (z.B. Komponente „RcPro“)
              </label>
              <input
                className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="ID, Titel, Komponente oder View suchen..."
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <button
                type="button"
                className="px-3 py-2 text-xs rounded-md border bg-slate-100"
                onClick={handleSelectAllVisible}
              >
                Alle gefilterten auswählen
              </button>
              <button
                type="button"
                className="px-3 py-2 text-xs rounded-md border"
                onClick={handleClearSelection}
              >
                Auswahl zurücksetzen
              </button>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-semibold text-slate-700 mb-1">
                Tags (zum Filtern anklicken, Mehrfachauswahl möglich):
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setSelectedTags((current) =>
                          current.includes(tag)
                            ? current.filter((t) => t !== tag)
                            : [...current, tag]
                        )
                      }
                      className={[
                        "px-3 py-1 rounded-full border text-xs font-medium transition",
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-700">
            Gefundene Tests: {filteredTests.length} • Ausgewählt:{" "}
            {selectedIds.length}
          </p>
        </section>

        {/* Test-Liste */}
        <section className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs uppercase text-slate-700">
              <tr>
                <th className="px-3 py-2 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300"
                    checked={allFilteredSelected}
                    onChange={handleToggleAllFiltered}
                  />
                </th>
                <th
                  className="px-3 py-2 cursor-pointer select-none"
                  onClick={() => handleSort("id")}
                >
                  <span className="inline-flex items-center gap-1">
                    ID
                    {sortKey === "id" && (
                      <span className="text-[10px]">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </span>
                </th>
                <th
                  className="px-3 py-2 cursor-pointer select-none"
                  onClick={() => handleSort("title")}
                >
                  <span className="inline-flex items-center gap-1">
                    Titel
                    {sortKey === "title" && (
                      <span className="text-[10px]">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </span>
                </th>
                <th
                  className="px-3 py-2 cursor-pointer select-none"
                  onClick={() => handleSort("component")}
                >
                  <span className="inline-flex items-center gap-1">
                    Komponente
                    {sortKey === "component" && (
                      <span className="text-[10px]">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </span>
                </th>
                <th
                  className="px-3 py-2 cursor-pointer select-none"
                  onClick={() => handleSort("view")}
                >
                  <span className="inline-flex items-center gap-1">
                    View
                    {sortKey === "view" && (
                      <span className="text-[10px]">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTests.map((t) => {
                const checked = selectedIds.includes(t.id);
                return (
                  <tr
                    key={t.id}
                    className={
                      checked ? "bg-blue-50 border-t border-slate-200" : "border-t border-slate-100"
                    }
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelection(t.id)}
                      />
                    </td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-900">
                      {t.id}
                    </td>
                    <td className="px-3 py-2 text-slate-900">{t.title}</td>
                    <td className="px-3 py-2 text-slate-900">{t.component}</td>
                    <td className="px-3 py-2 text-slate-900">{t.view}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Session Starten */}
        <section className="flex justify-between items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-slate-200 text-slate-900 text-sm font-medium disabled:opacity-40"
            onClick={() => {
              if (selectedIds.length === 0) {
                alert("Bitte zuerst Tests auswählen, die in den Testplan sollen.");
                return;
              }
              if (typeof window === "undefined") return;

              const baseUrl = `${window.location.origin}/run`;
              const url = `${baseUrl}?tests=${encodeURIComponent(
                selectedIds.join(",")
              )}`;

              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard
                  .writeText(url)
                  .then(() => {
                    alert("Link zum Testplan wurde in die Zwischenablage kopiert.");
                  })
                  .catch(() => {
                    alert("Konnte den Link nicht automatisch kopieren. URL: " + url);
                  });
              } else {
                alert("Testplan-URL:\n" + url);
              }
            }}
            disabled={selectedIds.length === 0}
          >
            Link für Testplan kopieren
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-40"
            onClick={handleStartSession}
            disabled={selectedIds.length === 0 || !testerName.trim()}
          >
            Session starten
          </button>
        </section>
      </div>
    </main>
  );
}