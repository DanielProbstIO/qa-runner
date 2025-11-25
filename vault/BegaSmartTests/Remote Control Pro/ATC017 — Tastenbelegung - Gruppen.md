---
fileClass: GeneralTest
testCaseId: ATC017
testTags:
componente:
  - RcPro
view: Bediengeräte/RC/Taste/Gruppen
vorbedingung: RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein
---
| Referenz                  | Ausgangspunkt                                       | Vorgang                                                                  | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :-------------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | keine Gruppen dem System hinzugefügt                | -                                                                        | "Keine Leuchten oder Geräte vorhanden" wird angezeigt, weiter bei [Gruppe hinzufügen]                                     |
| **`= this.testCaseId`**.2 | mindestens 1 Gruppe vorhanden                       | -                                                                        | Aktionen und vorhandene Gruppen werden angezeigt                                                                          |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                           | Aktion, Gruppe auswählen und speichern                                   | Navigation zum RC Screen, Konfig. wird gespeichert,<br>Info-Card wie Konfig. auf RC übertragen werden kann wird angezeigt |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Ok] drücken                                                             | Card verschwindet                                                                                                         |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Nicht mehr anzeigen] drücken                                            | Card verschwindet und wird bei der nächsten Tasten Konfig. nicht mehr angezeigt                                           |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.2                           | Aktion, Gruppe auswählen und zurück zum RC Screen navigieren (2x zurück) | Gewählte Konfig. wurde nicht der Taste zugewiesen                                                                         |
