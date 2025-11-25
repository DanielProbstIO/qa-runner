---
fileClass: GeneralTest
testCaseId: SDL01
testTags:
  - Single Config
componente:
  - SDL
view: Start-Screen
vorbedingung: Tutorial [Nicht mehr anzeigen]-Option nicht gesetzt, nach Standort/BLE Permissions  wurde noch nie gefragt
---

| Referenz                   | Ausgangspunkt                                             | Vorgang                                                                        | Erwartetes Verhalten                                                             |
| :------------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1  | Start-Screen                                              | Einschaltverhalten Konfigurieren drücken                                       | Navi. zu SingleConfig Einstiegspunkt; SC Tutorial wird angezeigt                 |
| **`= this.testCaseId`**.2  | SC Tutorial                                               | Weiter                                                                         | Navi. zum 2. Teil des Tutorials                                                  |
| **`= this.testCaseId`**.3  | SC Tutorial                                               | Checkbox "Nicht mehr Anzeigen" muss nicht ausgewählt sein. Abschließen drücken | Navi zum Konfiguration des Einschaltverfahrens. Permissions werden angefragt.    |
| **`= this.testCaseId`**.4  | Konfiguration des Einschaltverfahrens. Permissions Dialog | Alle Permissions ablehnen                                                      | Zurück Navigaiton zu Start-Screen                                                |
| **`= this.testCaseId`**.5  | Start-Screen                                              | Einschaltverhalten Konfigurieren drücken                                       | Navi. zu SingleConfig Einstiegspunkt; SC Tutorial wird angezeigt                 |
| **`= this.testCaseId`**.6  | SC Tutorial                                               | Weiter                                                                         | Navi. zum 2. Teil des Tutorials                                                  |
| **`= this.testCaseId`**.7  | SC Tutorial                                               | Checkbox "Nicht mehr Anzeigen" auswählen. Abschließen drücken                  | Navi zum Konfiguration des Einschaltverfahrens. Permissions werden angefragt.    |
| **`= this.testCaseId`**.8  | Konfiguration des Einschaltverfahrens. Permissions Dialog | Alle Permissions annehmen                                                      | Geräte-Suche wird gestartet                                                      |
| **`= this.testCaseId`**.9  | Konfiguration des Einschaltverfahrens. Geräte-Suche-View  | "Abbrechen" drücken                                                            | Zurück Navigaiton zu Start-Screen                                                |
| **`= this.testCaseId`**.10 | Start-Screen                                              | Einschaltverhalten Konfigurieren drücken                                       | Navi. zu Konfiguration des Einschaltverfahrens; SC Tutorial wird nicht angezeigt |
