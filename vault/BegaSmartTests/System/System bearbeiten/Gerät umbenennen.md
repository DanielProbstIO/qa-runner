---
fileClass: GeneralTest
testCaseId: ATC082
testTags:
componente:
  - Geräte
view: /Einstellungen/System/System bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---

| Referenz                  | Ausgangspunkt                                                               | Vorgang                                                                      | Erwartetes Verhalten                                                       |
| :------------------------ | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System Einstellungen                                                        | Geräte-Info-Icon auf Geräte-Card; [Gerät bearbeiten]; Name und Icon anpassen | Gerätename wird geändert; Auf allen Views wird der Gerätename aktualisiert |
| **`= this.testCaseId`**.2 | System Einstellungen; Gerät inaktiv<br><br>                                 | Geräte-Info-Icon auf Geräte-Card; [Gerät bearbeiten]; Name und Icon anpassen | Gerätename wird geändert; Auf allen Views wird der Gerätename aktualisiert |
| **`= this.testCaseId`**.3 | System Einstellungen; Coordinator inaktiv<br><br><br><br>                   | Geräte-Info-Icon auf Geräte-Card; [Gerät bearbeiten]; Name und Icon anpassen | Gerätename wird geändert; Auf allen Views wird der Gerätename aktualisiert |




