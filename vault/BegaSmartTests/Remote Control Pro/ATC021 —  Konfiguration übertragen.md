---
fileClass: GeneralTest
testCaseId: ATC021
testTags:
componente:
  - RcPro
view: Bediengeräte/RC
vorbedingung: Konfigurationen wurden vorgenommen
---
| Referenz                  | Ausgangspunkt                      | Vorgang                                                               | Erwartetes Verhalten                                                                                                                 |
| :------------------------ | :--------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Tasten Konfiguration abgeschlossen | Anweisung befolgen, wie Einstellungen auf RC übertragen werden können | Daten werden an RC übertragen, beim Bedienen der Tasten ändern die verbundenen Geräte entsprechende der Tastenbelegung ihren Zustand |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1          | Übertragung fehlgeschlagen                                            | RC erhält nicht die Konfig. und ändert nicht den Zustand auf die festgelegten Zustände                                               |
