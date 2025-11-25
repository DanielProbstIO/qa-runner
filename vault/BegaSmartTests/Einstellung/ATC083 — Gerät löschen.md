---
fileClass: GeneralTest
testCaseId: ATC083
testTags:
componente:
view: Einstellungen/<System>/System-bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---

> [!warning] Löschen eines Gerätes kann unter Umständen Auswirkungen auf Gruppen haben, z.B. wenn eine Gruppe nur aus dem gelöschten Gerät besteht oder alle Geräte in einer Gruppe gelöscht werden.

| Referenz                  | Ausgangspunkt                                                                                       | Vorgang                                                       | Erwartetes Verhalten                                                                                                         |
| :------------------------ | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System Einstellungen,<br>Gerät ist aktiv,<br>Coord. aktiv                                           | 3 Punkte Menü auf einem Gerät drücken, [Löschen], [Abbrechen] | Löschvorgang abgebrochen                                                                                                     |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                                                                           | 3 Punkte Menü auf einem Gerät drücken, [Löschen], [Löschen]   | Gerät wird aus App gelöscht, phys. Gerät wird zurückgesetzt                                                                  |
| **`= this.testCaseId`**.3 | zu löschendes BLE-Gerät ist inaktiv                                                                 | **`= this.testCaseId`**.2                                     | Warnung, dass Gerät nicht gefunden werden kann, Gerät wird aus App gelöscht,<br>phys. Gerät kann nicht zurück gesetzt werden |
| **`= this.testCaseId`**.4 | zu löschendes Gerät (kein BLE) ist inaktiv                                                          | **`= this.testCaseId`**.2                                     | Keine Warnung, Gerät wird aus App gelöscht, phys. Gerät kann nicht zurück gesetzt werden                                     |
| **`= this.testCaseId`**.5 | zu löschendes BLE-Gerät ist aktiv, Coord. inaktiv                                                   | **`= this.testCaseId`**.2                                     | **`= this.testCaseId`**.2                                                                                                    |
| **`= this.testCaseId`**.6 | zu löschendes Gerät (kein BLE) ist aktiv,<br>Coordinator inaktiv                                    | **`= this.testCaseId`**.2                                     | **`= this.testCaseId`**.2                                                                                                    |
| **`= this.testCaseId`**.7 | Zu löschendes Gerät (kein BLE) ist aktiv, kein weiteres BLE-Gerät im System,<br>Coordinator inaktiv | **`= this.testCaseId`**.2                                     | Connection-Lost-View                                                                                                         |
