---
fileClass: GeneralTest
testCaseId: SDL08
testTags:
  - Single Config
componente:
  - SDL
view: SDL-Geräte-Suchen-View
vorbedingung: SDL-Geräte gefunden und gelistet; SDL ist Pin geschützt
---

| Referenz                  | Ausgangspunkt                                                                                             | Vorgang                                   | Erwartetes Verhalten                                                                                                                                                                                              |
| :------------------------ | :-------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | SDL Pin geschützt; in SDL-Geräte-Suchen-View ist Schloss-Icon verriegelt; SDL hält keine aktive BLE conn. | Konfig.-Btn                               | Dialog zum Pin übergeben öffnet sich (Pin wird abgefragt); SDL kann nicht ohne Pin konfig. Werden                                                                                                                 |
| **`= this.testCaseId`**.2 | **SDL09**.1; Pin Dialog                                                                                   | Pin zurücksetzten; falschen Code scannen  | Fehlermeldung: falscher Matrixcode                                                                                                                                                                                |
| **`= this.testCaseId`**.3 | **SDL09**.1; Pin Dialog                                                                                   | Pin zurücksetzten; richtigen Code scannen | Geräte-Pin wird zurück gesetzt; Navi. zu Geräte-Suchen-View; Schloss in SDL-Card ist offen; SDL kann ohne vorige Pin Eingabe konfig werden; In SDL konfig Menu ist Sicherheits-Pin-Schutz Toggle-Btn inaktivieren |
| **`= this.testCaseId`**.4 | SDL Pin geschützt; in SDL-Geräte-Suchen-View ist Schloss-Icon verriegelt; SDL hält aktive BLE conn.       | Konfig.-Btn                               | App hat BLE-Adv-Infos im cache:<br>Gesetzter SDL Geräte-Pin wird über App-UI abgefragt;<br><br>App hat noch keine BLE-Adv-Infos abgefragt: Fehlermeldung, SDL nicht erreichbar                                    |
| **`= this.testCaseId`**.5 | **SDL09**.4; Pin Dialog                                                                                   | Pin zurücksetzten; falschen Code scannen  | Fehlermeldung: falscher Matrixcode                                                                                                                                                                                |
| **`= this.testCaseId`**.6 | **SDL09**.4; Pin Dialog                                                                                   | Pin zurücksetzten; richtiger Code scannen | Fehlermeldung: „Pin konnte nicht zurückgesetzt werden […]“                                                                                                                                                        |
