---
fileClass: GeneralTest
testCaseId: ATC080
testTags:
componente:
  - System
view: /Einstellungen/System/System bearbeiten
vorbedingung: Smart-System wurde erstellt
---

| Referenz                  | Ausgangspunkt                                                                              | Vorgang             | Erwartetes Verhalten                                        |
| :------------------------ | :----------------------------------------------------------------------------------------- | :------------------ | :---------------------------------------------------------- |
| **`= this.testCaseId`**.1 | /System-bearbeiten                                                                         | Systemname Anpassen | Name des Systems wird Global in jedem View Header angepasst |
| **`= this.testCaseId`**.2 | Keine weiteren Geräte im System; System Einstellungen;  <br><br>Coordinator inaktiv        | Systemname Anpassen | System nicht verbunden                                      |
| **`= this.testCaseId`**.3 | Mind. ein weiteres BLE-Gerät im System; System Einstellungen;  <br><br>Coordinator inaktiv | Systemname Anpassen | Name des Systems wird Global in jedem View Header           |



