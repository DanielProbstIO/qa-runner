---
fileClass: GeneralTest
testCaseId: ATC019
testTags:
componente:
  - RcPro
view: Bediengeräte/RC/Taste/Szenen
vorbedingung: RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein
---
| Referenz                  | Ausgangspunkt                                       | Vorgang                                                         | Erwartetes Verhalten                                                                                                      |
| :------------------------ | :-------------------------------------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Keine Szenen angelegt                               | -                                                               | "Keine Leuchten oder Geräte vorhanden" wird angezeigt, [Szene hinzufügen]                                                 |
| **`= this.testCaseId`**.2 | mindestens 1 Szene vorhanden                        | -                                                               | Vorhandene Szenen werden angezeigt                                                                                        |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                           | Szene auswählen und speichern                                   | Navigation zum RC Screen, Konfig. wird gespeichert,<br>Info-Card wie Konfig. auf RC übertragen werden kann wird angezeigt |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Ok] drücken                                                    | Card verschwindet                                                                                                         |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.3, Info-Card wird angezeigt | [Nicht mehr anzeigen] drücken                                   | Card verschwindet und wird bei der nächsten Tasten Konfig. nicht mehr angezeigt                                           |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.2                           | Szene auswählen und zurück zum RC Screen navigieren (2x zurück) | Gewählte Konfig. wurde nicht der Taste zugewiesen                                                                         |
