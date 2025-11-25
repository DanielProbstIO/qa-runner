---
fileClass: GeneralTest
testCaseId: ATC020
testTags:
componente:
  - RcPro
view: Bediengeräte/RC/Taste/Alle Geräte
vorbedingung: RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein
---
| Referenz                  | Ausgangspunkt                                       | Vorgang                                                          | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :-------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Mindestens. eine Leuchte oder Gerät eingebunden     | -                                                                | Aktionen werden angezeigt                                                                                                 |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                           | Aktion auswählen und speichern                                   | Navigation zum RC Screen, Konfig. wird gespeichert,<br>Info-Card wie Konfig. auf RC übertragen werden kann wird angezeigt |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2, Info-Card wird angezeigt | [Ok] drücken                                                     | Card verschwindet                                                                                                         |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.2, Info-Card wird angezeigt | [Nicht mehr anzeigen] drücken                                    | Card verschwindet und wird bei der nächsten Tasten Konfig. nicht mehr angezeigt                                           |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.1                           | Aktion auswählen und zurück zum RC Screen navigieren (2x zurück) | Gewählte Konfig. wurde nicht der Taste zugewiesen                                                                         |
