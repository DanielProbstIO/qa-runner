---
fileClass: GeneralTest
testCaseId: ATC083
testTags:
componente:
  - Geräte
view: /Einstellungen/System/System bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---

| Referenz                  | Ausgangspunkt                                                                                            | Vorgang                                                | Erwartetes Verhalten                                                                                                          |
| :------------------------ | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System Einstellungen; <br>Gerät ist aktiv; <br>Coord. aktivnstellungen                                   | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Abbruch] | Löschvorgang abgebrochen                                                                                                      |
| **`= this.testCaseId`**.2 | System Einstellungen; <br>Gerät ist aktiv; <br>Coord. aktivnstellungen<br><br>                           | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Gerät wird aus App gelöscht; phys. Gerät wird zurück gesetzt                                                                  |
| **`= this.testCaseId`**.3 | zu löschendes BLE-Gerät ist inaktiv;<br><br><br><br>                                                     | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Warnung, dass Gerät nicht gefunden werden kann; Gerät wird aus App gelöscht; <br>phys. Gerät kann nicht zurück gesetzt werden |
| **`= this.testCaseId`**.4 | zu löschendes Gerät (kein BLE) ist inaktiv                                                               | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Keine Warnung; Gerät wird aus App gelöscht; <br><br>phys. Gerät kann nicht zurück gesetzt werden                              |
| **`= this.testCaseId`**.5 | zu löschendes BLE-Gerät ist aktiv; <br>Coord. inaktiv                                                    | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Gerät wird aus App gelöscht; phys. Gerät wird zurück gesetzt                                                                  |
| **`= this.testCaseId`**.6 | zu löschendes Gerät (kein BLE) ist aktiv; <br>Coordinator inaktiv                                        | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Gerät wird aus App gelöscht; phys. Gerät wird zurück gesetzt                                                                  |
| **`= this.testCaseId`**.7 | Zu löschendes Gerät (kein BLE) ist aktiv; kein weiteres BLE-Gerät im System; <br><br>Coordinator inaktiv | Geräte-Info-Icon auf Geräte-Card; [Löschen]; [Löschen] | Connection-Lost-View                                                                                                          |




