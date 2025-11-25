---
fileClass: GeneralTest
testCaseId: ATC018
testTags:
componente:
  - RcPro
view: Bediengeräte/RC/Taste/Leuchten und Geräte
vorbedingung: RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein
---
| Referenz                  | Ausgangspunkt                                       | Vorgang                                                                 | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :-------------------------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | keine Leuchten und Geräte eingebunden               | -                                                                       | "Keine Leuchten oder Geräte vorhanden" wird angezeigt                                                                     |
| **`= this.testCaseId`**.2 | mindestens 1 Leuchte oder Gerät vorhanden           | -                                                                       | Aktionen und vorhandene Geräte werden angezeigt                                                                           |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                           | Aktion, Gerät auswählen und speichern                                   | Navigation zum RC Screen, Konfig. wird gespeichert,<br>Info-Card wie Konfig. auf RC übertragen werden kann wird angezeigt |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Ok] drücken                                                            | Card verschwindet                                                                                                         |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Nicht mehr anzeigen] drücken                                           | Card verschwindet und wird bei der nächsten Tasten Konfig. nicht mehr angezeigt                                           |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.2                           | Aktion, Gerät auswählen und zurück zum RC Screen navigieren (2x zurück) | Gewählte Konfig. wurde nicht der Taste zugewiesen                                                                         |
