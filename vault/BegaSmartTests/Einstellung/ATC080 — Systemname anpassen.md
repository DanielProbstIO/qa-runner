---
fileClass: GeneralTest
testCaseId: ATC080
testTags:
componente:
view: Einstellungen/<System>/System-bearbeiten
vorbedingung: Smart-System wurde erstellt
---
| Referenz                  | Ausgangspunkt                                                                        | Vorgang                                | Erwartetes Verhalten                                        |
| :------------------------ | :----------------------------------------------------------------------------------- | :------------------------------------- | :---------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System-bearbeiten                                                                    | Systemname anpassen, zurück navigieren | Name des Systems wird Global in jedem View Header angepasst |
| **`= this.testCaseId`**.2 | Keine weiteren Geräte im System, System Einstellungen, Coordinator inaktiv           | **`= this.testCaseId`**.1              | System nicht verbunden                                      |
| **`= this.testCaseId`**.3 | Mind. ein weiteres BLE-Gerät im System, System Einstellungen,<br>Coordinator inaktiv | **`= this.testCaseId`**.1              | **`= this.testCaseId`**.1                                   |
