---
fileClass: GeneralTest
testCaseId: ATC082
testTags:
componente:
view: Einstellungen/<System>/System-bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---
| Referenz                  | Ausgangspunkt                             | Vorgang                                                                                              | Erwartetes Verhalten                                                       |
| :------------------------ | :---------------------------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System Einstellungen                      | 3 Punkte Menü auf einem Gerät drücken, [Gerät bearbeiten], Name und Icon anpassen, speichern         | Gerätename wird geändert, Auf allen Views wird der Gerätename aktualisiert |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                 | 3 Punkte Menü auf einem Gerät drücken, [Gerät bearbeiten], Name und Icon anpassen, zurück navigieren | Änderung wird verworfen                                                    |
| **`= this.testCaseId`**.3 | System Einstellungen, Gerät inaktiv       | **`= this.testCaseId`**.1                                                                            | **`= this.testCaseId`**.1                                                  |
| **`= this.testCaseId`**.4 | System Einstellungen, Coordinator inaktiv | **`= this.testCaseId`**.1                                                                            | **`= this.testCaseId`**.1                                                  |
