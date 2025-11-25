---
fileClass: GeneralTest
testCaseId: SDL06
testTags:
  - Single Config
componente:
  - SDL
view: /SDL-Geräte-Suchen-View
vorbedingung: SDL-Geräte gefunden und gelistet; SDL nicht Pin geschützt
---

| Referenz                  | Ausgangspunkt                                            | Vorgang                                                              | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | SDL hält eine aktive BLE conn. zu einem andren Gerät     | Konfig.-Btn                                                          | BLE Verbindung zu gewähltem SDL kann nicht aufgebaut werden                                                               |
| **`= this.testCaseId`**.2 | SDL hat keine aktive BLE conn.                           | Konfig.-Btn                                                          | Konfig.-Menu wird geöffnet                                                                                                |
| **`= this.testCaseId`**.3 | Nav. zu Konfig.-View                                     | Sicherheits-Pin-Schutz Toggle Btn aktivieren                         | Dialog zum Pin setzten öffnet sich                                                                                        |
| **`= this.testCaseId`**.4 | Pin-Dialog                                               | Wunsch Pin (vier Ziffern) setzten; Eingabe korrigieren               | Gesetzte Ziffern werden einzeln gelöscht                                                                                  |
| **`= this.testCaseId`**.5 | Pin-Dialog                                               | Korrigierten Pin setzten; Anwenden                                   | Pin wurde gesetzt; Toggle-Btn ist aktiv; SDL ist Pin geschützt; in SDL-Geräte-Suchen-View ist das Schloss-Icon verriegelt |
| **`= this.testCaseId`**.6 | /SDL-Geräte-Suchen-View ohne App Neustart (Pin im Cache) | Konfig.-Btn bei Pin geschütztem SDL                                  | Konfig.-Menu wird geöffnet                                                                                                |
| **`= this.testCaseId`**.7 | App neu starten; SDL-Geräte-Suchen-View                  | Konfig.-Btn bei Pin geschütztem SDL                                  | Dialog zum Pin übergeben öffnet sich (Pin wird abgefragt); SDL kann nicht ohne Pin konfig. Oder identifiziert werden      |
| **`= this.testCaseId`**.8 | **`= this.testCaseId`**.7                                | Mit zweitem Handy versuchen den Pin geschützten SDL zu konfigurieren | Dialog zum Pin übergeben öffnet sich (Pin wird abgefragt); SDL kann nicht ohne Pin konfig. Oder identifiziert werden      |
