---
fileClass: GeneralTest
testCaseId: ATC016
testTags:
componente:
  - RcPro
view: Bediengeräte/RC
vorbedingung: RC wurde einem System hinzugefügt. RC kann nicht Coordinator sein
---
| Referenz                  | Ausgangspunkt                                        | Vorgang                                                                                 | Erwartetes Verhalten                                                                                      |
| :------------------------ | :--------------------------------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengeräte/RC                                      | Name auswählen                                                                          | Dialog mit dem Namen erscheint, wo der Name gesetzt werden kann                                           |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1, Dialog ist sichtbar       | Name anwählen                                                                           | Tastatur wird angezeigt und Name kann geändert werden                                                     |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                            | Über eingeblendete Tastatur Namen anpassen. neuer Name != alter Name, Speichern drücken | Neuer Name wird übernommen und das Dialog verschwindet  <br><br>Der neue Name wird unter "Name" angezeigt |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.3, neuen Name eingetragen    | Abbruch drücken                                                                         | Änderungen werden nicht angewandt, Dialog verschwindet                                                    |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.2, neuer Name == alter Namen | Speichern drücken                                                                       | Speichern bleibt ausgegraut und lässt sich nicht benutzen                                                 |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.5                            | Abbruch drücken                                                                         | Dialog verschwindet                                                                                       |
