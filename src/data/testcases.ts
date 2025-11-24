// src/data/testcases.ts

export type TestStep = {
  id: string;        // z.B. "ATC026.1"
  startView: string; // Ausgangspunkt
  action: string;    // Vorgang
  expected: string;  // Erwartetes Verhalten
};

export type TestCase = {
  id: string;
  title: string;
  component: string;
  view: string;
  precondition: string;
  steps: TestStep[];
};

export const testcases: TestCase[] = [
  {
    id: "ATC026",
    title: "Konfigurieren der Gesten",
    component: "SRD",
    view: "Bediengeräte/SRD",
    precondition: "SRD im System eingebunden",
    steps: [
      {
        id: "ATC026.1",
        startView: "Bediengeräte/SRD",
        action: "[Konfigurieren der Geste] öffnen",
        expected:
          "Navigation zur Konfigurieren-der-Geste-View; alle Gesten werden aufgelistet",
      },
      {
        id: "ATC026.2",
        startView: "Konfigurieren-der-Geste-View",
        action: "Geste + Aktion wählen, zurück navigieren",
        expected: "Konfiguration wird verworfen",
      },
      {
        id: "ATC026.3",
        startView: "Konfigurieren-der-Geste-View",
        action: "Geste + Aktion wählen, [Speichern]",
        expected:
          "Konfiguration wird gespeichert, Aktion wird unter der Geste angezeigt; SRD lässt sich entsprechend steuern",
      },
      {
        id: "ATC026.4",
        startView: "Bediengeräte/SRD",
        action: "Aktion für nicht-konfigurierbare Geste setzen",
        expected: "Setzen einer Aktion ist nicht möglich",
      },
      {
        id: "ATC026.5",
        startView: "Konfigurieren-der-Geste-View",
        action: "[(i) – Wie konfiguriere ich Gesten?]",
        expected: "Navigation zur Info-View",
      },
    ],
  },
  {
    id: "ATC017",
    title: "RC Pro – Gruppen auf Taste konfigurieren",
    component: "RcPro",
    view: "Bediengeräte/RC/Taste/Gruppen",
    precondition:
      "RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein",
    steps: [
      {
        id: "ATC017.1",
        startView: "keine Gruppen dem System hinzugefügt",
        action: "-",
        expected:
          '"Keine Leuchten oder Geräte vorhanden" wird angezeigt, weiter bei [Gruppe hinzufügen]',
      },
      {
        id: "ATC017.2",
        startView: "mindestens 1 Gruppe vorhanden",
        action: "-",
        expected: "Aktionen und vorhandene Gruppen werden angezeigt",
      },
      {
        id: "ATC017.3",
        startView: "ATC017.2",
        action: "Aktion, Gruppe auswählen und speichern",
        expected:
          "Navigation zum RC-Screen, Konfiguration wird gespeichert; Info-Card, wie Konfiguration auf RC übertragen werden kann, wird angezeigt",
      },
      {
        id: "ATC017.4",
        startView: "ATC017.3, Info-Card wird angezeigt",
        action: "[Ok] drücken",
        expected: "Card verschwindet",
      },
      {
        id: "ATC017.5",
        startView: "ATC017.3, Info-Card wird angezeigt",
        action: "[Nicht mehr anzeigen] drücken",
        expected:
          "Card verschwindet und wird bei der nächsten Tasten-Konfiguration nicht mehr angezeigt",
      },
      {
        id: "ATC017.6",
        startView: "ATC017.2",
        action:
          "Aktion, Gruppe auswählen und zurück zum RC-Screen navigieren (2x zurück)",
        expected: "Gewählte Konfiguration wurde nicht der Taste zugewiesen",
      },
    ],
  },
];