---
fileClass: GeneralTest
testCaseId: PBM02
testTags:
componente: [PBM]
view: Input-Konfig-Screen
vorbedingung: PBM provisioniert
---

| Referenz                  | Ausgangspunkt                    | Vorgang                    | Erwartetes Verhalten                                                                                                                                                                                             |
| :------------------------ | :------------------------------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Keine Leuchte provisioniert      | Input-Konfig-Button wählen | Fehlermeldung „No Gears available in the System“                                                                                                                                                                 |
| **`= this.testCaseId`**.2 | Mind. eine Leuchte provisioniert | Input Kanal wählen         | Nav. zu erstem Input-Konfig-Screen; Device-Type ist pre-selected basierend auf der letzten Auswahl, initial keine Auswahl; Icon ist pre-selected basierend auf Input; Input-Name wird in Screen-Header angezeigt |
| **`= this.testCaseId`**.3 | Noch keine Device-Type gewählt   | [Weiter]                   | [Weiter] Button inaktiv und kann nicht gewählt werden                                                                                                                                                            |
| **`= this.testCaseId`**.4 | Noch keine Device-Type gewählt   | Name anpassen              | Gewählter Name wird in Screen Header angepasst                                                                                                                                                                   |
| **`= this.testCaseId`**.5 | Noch keine Device-Type gewählt   | Device Type wählen         | Gewählter Device-Typ wird markiert                                                                                                                                                                               |
| **`= this.testCaseId`**.6 | -                                | Icon wählen                | Gewähltes Icon wird markiert und übernommen                                                                                                                                                                      |
| **`= this.testCaseId`**.7 | Input-Konfig-Screen              | [Abbruch]                  | Nicht definiert in Figma                                                                                                                                                                                         |
| **`= this.testCaseId`**.8 | Input-Konfig-Screen              | [Weiter]                   | Nav. zu Kategorie-Auswahl-Screen                                                                                                                                                                                 |
