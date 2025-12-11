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
  buildVersion?: string;
  title?: string;
  description?: string;
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

type TestPlan = {
  id: string;
  title: string;
  description?: string;
  testIds: string[];
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
  const [buildVersion, setBuildVersion] = useState("");
  const [device, setDevice] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [savedPlans, setSavedPlans] = useState<TestPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [forceEditMode, setForceEditMode] = useState(false);
  // Im Edit-Mode: Tests aus aktiver Session vorauswählen, falls noch keine Auswahl besteht
  useEffect(() => {
    if (!forceEditMode) return;
    if (!activeSession) return;
    if (!Array.isArray(activeSession.testIds)) return;
    if (activeSession.testIds.length === 0) return;
    if (selectedIds.length > 0) return; // Nutzer hat bereits etwas gewählt

    setSelectedIds(activeSession.testIds);
  }, [forceEditMode, activeSession, selectedIds.length]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem("savedTestPlans");
    if (!raw) return;

    try {
      const parsed: TestPlan[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSavedPlans(parsed);
      }
    } catch (e) {
      console.error("Gespeicherte Testpläne konnten nicht geladen werden:", e);
    }
  }, []);
  function persistPlans(plans: TestPlan[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("savedTestPlans", JSON.stringify(plans));
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const testsParam = params.get("tests");
    const editParam = params.get("edit");

    if (testsParam) {
      const ids = testsParam
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (ids.length > 0) {
        setForcedTestIds(ids);
        setSelectedIds(ids);
      }
    }

    if (editParam === "1") {
      setForceEditMode(true);
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

  function handleSavePlan() {
    if (selectedIds.length === 0) {
      alert("Bitte zuerst Tests auswählen, die in den Testplan sollen.");
      return;
    }

    const title = planTitle.trim() || `Testplan ${new Date().toLocaleString("de-DE")}`;
    const description = planDescription.trim();

    const newPlan: TestPlan = {
      id: `plan_${Date.now().toString()}`,
      title,
      description: description.length > 0 ? description : undefined,
      testIds: [...selectedIds],
    };

    const updated = [...savedPlans, newPlan];
    setSavedPlans(updated);
    persistPlans(updated);

    alert("Testplan wurde gespeichert.");
  }

  function handleApplySelectedPlan() {
    if (!selectedPlanId) return;

    const plan = savedPlans.find((p) => p.id === selectedPlanId);
    if (!plan) return;

    // Nur IDs übernehmen, die es in den geladenen Testcases wirklich gibt
    const validIds = plan.testIds.filter((id) =>
      uniqueTestcases.some((t) => t.id === id)
    );

    setSelectedIds(validIds);

    if (plan.title) {
      setPlanTitle(plan.title);
    }
    setPlanDescription(plan.description ?? "");
  }

  function handleRenameSelectedPlan() {
    if (!selectedPlanId) return;
    const existing = savedPlans.find((p) => p.id === selectedPlanId);
    if (!existing) return;

    const currentTitle = existing.title || "";
    const newTitle = window.prompt("Neuer Titel für diesen Testplan:", currentTitle);
    if (!newTitle) {
      return;
    }

    const trimmed = newTitle.trim();
    if (!trimmed) {
      alert("Titel darf nicht leer sein.");
      return;
    }

    const updated = savedPlans.map((p) =>
      p.id === selectedPlanId ? { ...p, title: trimmed } : p
    );
    setSavedPlans(updated);
    persistPlans(updated);
    setPlanTitle(trimmed);
  }

  function handleDeleteSelectedPlan() {
    if (!selectedPlanId) return;

    const existing = savedPlans.find((p) => p.id === selectedPlanId);
    const title = existing?.title ?? "unbenannter Plan";

    const ok = window.confirm(
      `Möchtest du den Testplan „${title}“ wirklich löschen?`
    );
    if (!ok) return;

    const updated = savedPlans.filter((p) => p.id !== selectedPlanId);
    setSavedPlans(updated);
    persistPlans(updated);
    setSelectedPlanId("");
  }

 function handleSort(key: SortKey) {
  if (sortKey === key) {
    // Gleiches Feld → Richtung togglen
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  } else {
    // Neues Feld → Richtung zurück auf asc
    setSortKey(key);
    setSortDir("asc");
  }
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
    const allDone = total > 0 && doneCount >= total;

    // Wenn alle Tests erledigt sind und wir NICHT im Edit-Mode sind → direkt zur Session-Ergebnis-Seite
    if (!forceEditMode && allDone) {
      router.push(`/results/${activeSession.id}`);
      return;
    }

    // 🔹 Passenden Test zum Fortsetzen / Bearbeiten finden
    const currentIndex: number = activeSession.currentIndex ?? 0;
    let idx = currentIndex;

    if (forceEditMode) {
      // Im Edit-Mode: bevorzugt den ersten Test mit einem NOK-Schritt anspringen
      const firstNokIndex = testIds.findIndex((testId) => {
        const stepMap = results[testId] ?? {};
        return Object.values(stepMap).some(
          (s: any) => s && s.status === "nok"
        );
      });

      if (firstNokIndex !== -1) {
        idx = firstNokIndex;
      } else {
        // Falls keine NOK-Schritte vorhanden sind: beim ersten Test beginnen
        idx = 0;
      }
    }

    // Wenn currentIndex (oder berechneter Index) hinter dem letzten Test liegt:
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

  function handleStartEditForSelected() {
    if (!activeSession) {
      alert("Es ist keine aktive Session vorhanden.");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Bitte zuerst Tests auswählen, die in dieser Session bearbeitet werden sollen.");
      return;
    }

    // Ausgewählte Testcases als Objekte holen (nur solche, die es im Vault gibt)
    const selectedTests = uniqueTestcases.filter((t) =>
      selectedIds.includes(t.id)
    );

    if (selectedTests.length === 0) {
      alert("Die ausgewählten Tests konnten im Vault nicht gefunden werden.");
      return;
    }

    // IDs sortieren (natürliche Sortierung: ATC001, ATC002, ..., ATC010)
    selectedTests.sort((a, b) =>
      a.id.localeCompare(b.id, "de-DE", { numeric: true })
    );

    const orderedTestIds = selectedTests.map((t) => t.id);

    const updatedSession: TestSession = {
      ...activeSession,
      testIds: orderedTestIds,
      currentIndex: 0,
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(updatedSession.id, JSON.stringify(updatedSession));
      window.localStorage.setItem("activeSessionId", updatedSession.id);
    }

    const firstTestId = orderedTestIds[0];
    router.push(`/tests/${firstTestId}`);
  }

  function handleStartSession() {
    if (selectedIds.length === 0) {
      alert("Bitte zuerst Tests auswählen.");
      return;
    }

    const createdAt = new Date().toISOString();
    const sessionId = `session_${createdAt}`;

    // Ausgewählte Testcases als Objekte holen
    const selectedTests = uniqueTestcases.filter((t) =>
      selectedIds.includes(t.id)
    );

    // Nach ID sortieren (natürliche Sortierung: ATC001, ATC002, ..., ATC010)
    selectedTests.sort((a, b) =>
      a.id.localeCompare(b.id, "de-DE", { numeric: true })
    );

    const orderedTestIds = selectedTests.map((t) => t.id);

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

    for (const tc of selectedTests) {
      testMeta[tc.id] = {
        title: tc.title,
        component: tc.component,
        view: tc.view,
      };
    }

    const session: TestSession = {
      id: sessionId,
      testerName: testerName.trim(),
      device: device.trim(),
      buildVersion: buildVersion.trim(),
      createdAt,
      testIds: orderedTestIds,
      currentIndex: 0,
      results: {},
      testMeta,
      title: planTitle.trim(),
      description: planDescription.trim(),
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(sessionId, JSON.stringify(session));
      window.localStorage.setItem("activeSessionId", sessionId);
    }

    // Zum ersten Test springen (in sortierter Reihenfolge)
    const firstTestId = orderedTestIds[0];
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
                {activeSession.title && (
                  <p className="text-sm font-semibold text-blue-900 mt-1">
                    {activeSession.title}
                  </p>
                )}
                {activeSession.description && (
                  <p className="text-xs text-blue-900 mt-1 whitespace-pre-line">
                    {activeSession.description}
                  </p>
                )}
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
                    Gerät:{" "}
                    <span className="font-semibold">
                      {activeSession.device}
                    </span>
                  </p>
                )}
                {activeSession.buildVersion && (
                  <p className="text-xs text-blue-900">
                    Build-Version:{" "}
                    <span className="font-semibold">
                      {activeSession.buildVersion}
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

        {/* Testplan-Metadaten */}
        <section className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black">
              Testplan Titel (optional)
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2 text-sm text-black placeholder-slate-600"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
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
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              placeholder="Ziel, Scope, besondere Hinweise für diese Session …"
            />
          </div>

          {savedPlans.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-black">
                Gespeicherte Testpläne
              </label>
              <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-end">
                <select
                  className="flex-1 border border-slate-300 rounded-md p-2 text-sm text-black bg-white"
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                >
                  <option value="">– Testplan auswählen –</option>
                  {savedPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.title}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-slate-800 text-white text-xs font-medium disabled:opacity-40"
                    onClick={handleApplySelectedPlan}
                    disabled={!selectedPlanId}
                  >
                    Plan laden
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-slate-100 text-slate-900 text-xs font-medium disabled:opacity-40 border border-slate-300"
                    onClick={handleRenameSelectedPlan}
                    disabled={!selectedPlanId}
                  >
                    Umbenennen
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-red-50 text-red-700 text-xs font-medium disabled:opacity-40 border border-red-200"
                    onClick={handleDeleteSelectedPlan}
                    disabled={!selectedPlanId}
                  >
                    Löschen
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                Ein geladener Plan ist nur eine Ausgangsbasis: Du kannst danach die Testauswahl frei anpassen.
              </p>
            </div>
          )}
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

        {/* Session Starten / Bearbeiten */}
        <section className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-slate-200 text-slate-900 text-sm font-medium disabled:opacity-40"
              onClick={handleSavePlan}
              disabled={selectedIds.length === 0}
            >
              Testplan speichern
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-md bg-slate-100 text-slate-900 text-sm font-medium disabled:opacity-40 border border-slate-300"
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
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            {/* Normaler Start einer neuen Session */}
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-40"
              onClick={handleStartSession}
              disabled={selectedIds.length === 0 || !testerName.trim()}
            >
              Session starten
            </button>

            {/* Bearbeiten-Modus: ausgewählte Tests in aktiver Session durchgehen */}
            {forceEditMode && activeSession && (
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-amber-500 text-white text-sm font-medium disabled:opacity-40"
                onClick={handleStartEditForSelected}
                disabled={selectedIds.length === 0}
              >
                Ausgewählte Tests in dieser Session bearbeiten
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}