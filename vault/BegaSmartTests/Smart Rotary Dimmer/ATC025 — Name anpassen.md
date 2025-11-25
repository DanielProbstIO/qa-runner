---
fileClass: GeneralTest
testCaseId: ATC025
testTags:
componente:
  - SRD
view: ATC025
vorbedingung:
---
| Referenz                  | Ausgangspunkt                                             | Vorgang                            | Erwartetes Verhalten                                                                                                                 |
| :------------------------ | :-------------------------------------------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengeräte/SRD                                          | [Name], Name vergeben, [Abbrechen] | Umbenennen Dialog erscheint, Einstellungen werden nach drücken auf [Abbrechen] verworfen und Umbenennen Dialog verschwindet          |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1, Umbenennen Dialog ist sichtbar | [Name], Name vergeben, [Ok]        | Einstellungen werden übernommen und gespeichert, Umbenennen Dialog verschwindet<br><br>Name wurde in Bediengeräte/SRD-View angepasst |
