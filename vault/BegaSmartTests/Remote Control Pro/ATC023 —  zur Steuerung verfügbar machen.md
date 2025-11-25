---
fileClass: GeneralTest
testCaseId: ATC023
testTags:
componente:
  - RcPro
view: Bediengeräte/RCPro/Gruppen und Geräte|Szenen|Lieblingsfarben
vorbedingung:
---
| Referenz                  | Ausgangspunkt                                       | Vorgang                                             | Erwartetes Verhalten                                                                                                                                    |
| :------------------------ | :-------------------------------------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | keine Geräte oder Szenen hinterlegt                 | -                                                   | Die entsprechende View informiert, dass keine Geräte bzw. Szenen hinterlegt sind, Default Lieblingsfarben werden angezeigt und können ausgewählt werden |
| **`= this.testCaseId`**.2 | Geräte und Gruppen hinterlegt                       | Geräte auswählen, speichern drücken                 | Auswahl wird gespeichert,<br>Info-Card wie Konfig. auf RC Pro übertragen werden kann wird angezeigt                                                     |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2, Info-Card wird angezeigt | [Ok] drücken                                        | Card verschwindet                                                                                                                                       |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.2, Info-Card wird angezeigt | [Nicht mehr anzeigen] drücken                       | Card verschwindet und wird bei der nächsten Tasten Konfig. nicht mehr angezeigt                                                                         |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.2                           | Gerät auswählen und zurück zum RC Screen navigieren | Gewählte Konfig. wurde nicht zugewiesen                                                                                                                 |
