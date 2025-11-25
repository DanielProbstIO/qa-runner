---
fileClass: GeneralTest
testCaseId: ATC084
testTags:
componente:
view: System-bearbeiten/Coordinator
vorbedingung: System wurde erstellt
---
| Referenz                  | Ausgangspunkt                                        | Vorgang                                                        | Erwartetes Verhalten                                                                                                               |
| :------------------------ | :--------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System-bearbeiten                                    | 3 Punkte Menü des Coordinators drücken; [Löschen], [Abbrechen] | Vorgang abgebrochen                                                                                                                |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                            | 3 Punkte Menü des Coordinators drücken; [Löschen], [Löschen]   | Mit dem System-Coordinator wird das gesamte Smart-System gelöscht, Alle Geräte des Systems setzen sich zurück (Zigbee)             |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1, Coordinator ausgeschaltet | **`= this.testCaseId`**.2                                      | Warnhinweis, dass Coordinator nicht gefunden werden konnte, Coordinator. wird aus App gelöscht aber phy. Gerät nicht zurückgesetzt |
