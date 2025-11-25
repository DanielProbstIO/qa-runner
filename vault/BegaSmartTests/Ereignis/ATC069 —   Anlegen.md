---
fileClass: GeneralTest
testCaseId: ATC069
testTags:
componente:
view: Ereignisse
vorbedingung: System wurde erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt
---
| Referenz                  | Ausgangspunkt                                                            | Vorgang                                                     | Erwartetes Verhalten                                                                                                 |
| :------------------------ | :----------------------------------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Alle betroffenen Geräte sind erreichbar                                  | [Erstellen], Ereignis vollständig und korrekt konfigurieren | Erfolg, Ereignis wird ausgeführt, Konfig. Geräte reagieren entsprechend                                              |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                                                | Unvollständige Szenenkonfiguration (z.B. kein Name gesetzt) | Speichern nicht möglich                                                                                              |
| **`= this.testCaseId`**.3 | Einzelne Geräte sind ausgeschaltet                                       | **`= this.testCaseId`**.1                                   | Ereignis wird regulär erstellt                                                                                       |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.1, Bluetooth am mobilen Endgerät ist deaktiviert | **`= this.testCaseId`**.1                                   | Information: Keine Verbindung zum System                                                                             |
| **`= this.testCaseId`**.5 | Coordinator ist ausgeschaltet                                            | **`= this.testCaseId`**.1                                   | Ereignis kann nicht erstell werden                                                                                   |
| **`= this.testCaseId`**.6 | Ereignis mit fremdem ZigBee Geräten erstellen                            | **`= this.testCaseId`**.1                                   | Information: Fremdes Gerät unterstützt diese Funktion nicht                                                          |
| **`= this.testCaseId`**.7 | **`= this.testCaseId`**.1                                                | Einmaliges Ereignis konfigurieren                           | Ereignis erfolgreich angelegt, Ereignis triggert zur konfig. Zeit die ausgewählten Geräte und wiederholt sich nicht  |
| **`= this.testCaseId`**.8 | **`= this.testCaseId`**.1                                                | Tägliches Ereignis konfig.                                  | Ereignis erfolgreich angelegt, Ereignis triggert jeden Tag zur konfig. Uhrzeit die ausgewählten Geräte               |
| **`= this.testCaseId`**.9 | **`= this.testCaseId`**.1                                                | Wöchentliches Ereignis konfigurieren                        | Ereignis erfolgreich angelegt, Ereignis triggert am konfig. Wochentag(n) zur konfig. Uhrzeit die ausgewählten Geräte |
