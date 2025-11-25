---
fileClass: GeneralTest
testCaseId: SDL02
testTags:
  - Single Config
componente:
  - SDL
view: Start-Screen
vorbedingung: SDL01
---

| Referenz                  | Ausgangspunkt                                                                         | Vorgang                                                                                                                              | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Start-Screen. Keine aktiven SDLs in der Nähe                                          | Einschaltverhalten konfig                                                                                                            | Keine Devices werden gefunden und angezeigt; UI-Feedback, dass nach Devices gesucht wird; [Weitere Info]-Option ist aktiv |
| **`= this.testCaseId`**.2 | Start-Screen. Ein aktiver, in einem BEGA Smart System provisionierter SDL in der Nähe | Einschaltverhalten konfig                                                                                                            | Keine Devices werden gefunden und angezeigt; UI-Feedback, dass nach Devices gesucht wird; [Weitere Info]-Option ist aktiv |
| **`= this.testCaseId`**.3 | Endzustand von .1 oder .2                                                             | Weitere Informationen                                                                                                                | Infos/Hilfe wie Verbindung zu SDL hergestellt werden kann, wird eingeblendet                                              |
| **`= this.testCaseId`**.4 | Konfiguration des Einschalverfahrens                                                  | 2 Minuten warten                                                                                                                     | "Keine Leuchten gefunden" Dialog wird angezeigt                                                                           |
| **`= this.testCaseId`**.5 | Mind. ein aktiver, unprov. SDL idN                                                    | Scan erneut auslösen durch click in "Keine Leuchten gefunden" Dialog oder pull to refresh in "Konfiguration des Einschaltverfahrens" | Gefundene Devices werden in Übersicht gelistet und lassen sich konfig.; [Weitere Info]-Option ist inaktiv                 |
| **`= this.testCaseId`**.6 | Unabhängig ob SDL(s) gefunden                                                         | Abbruch                                                                                                                              | SC Geräte-Suchen-View wird geschlossen; Start-View wird angezeigt                                                         |
