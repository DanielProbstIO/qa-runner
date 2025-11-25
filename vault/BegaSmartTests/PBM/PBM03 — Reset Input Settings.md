---
fileClass: GeneralTest
testCaseId: PBM03
testTags:
componente: [PBM]
view: Konfig-Wizard
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; Input konfiguriert
---

| Referenz                  | Ausgangspunkt                | Vorgang          | Erwartetes Verhalten                                                                    |
| :------------------------ | :--------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Modul-Übersicht-Screen       | Input wählen     | Nav. zu Input-Konfig (Basic-Setup) Screen                                               |
| **`= this.testCaseId`**.2 | Noch keine Konfig hinterlegt | [Reset]          | Nicht definiert in Figma                                                                |
| **`= this.testCaseId`**.3 | Input konfiguriert           | [Reset]          | Reset-Dialog öffnet sich                                                                |
| **`= this.testCaseId`**.4 | Reset-Dialog                 | [Schließen]      | Reset-Dialog wird geschlossen                                                           |
| **`= this.testCaseId`**.5 | Reset-Dialog                 | [Reset Settings] | Gemachte Konfiguration wird zurückgesetzt; Navigation zurück zur Modul-Übersicht-Screen |
