---
fileClass: GeneralTest
testCaseId: ATC029
testTags:
componente:
  - SRD
view: Bediengeräte/SRD
vorbedingung: SRD im System eingebunden
---
| Referenz                  | Ausgangspunkt                      | Vorgang                                                         | Erwartetes Verhalten                                                                                               |
| :------------------------ | :--------------------------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengeräte/SRD/Farben-View       | Farbe wählen                                                    | Im Farbkreis passt sich die Farbe und Sättigung entsprechend der ausgewählten Farbe an                             |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1          | Farbkreis anpassen,<br>[< zurück]                               | Das gewählte Farbfeld passt sich entsprechend der im Farbkreis gemachten Änderung an, die Anpassung wird verworfen |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1          | Dreipunkt-Menü, [Farbe umbenennen], Farbe benennen, [Abbruch]   | Änderungen werden verworfen                                                                                        |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.1          | Dreipunkt-Menü, [Farbe umbenennen], Farbe benennen, [Speichern] | Farbfeld wird umbenannt                                                                                            |
| **`= this.testCaseId`**.5 | ATC029.1, Farbfeld ist aktiviert   | Dreipunkt-Menü, [Deaktivieren]                                  | Farbe ist deaktiviert                                                                                              |
| **`= this.testCaseId`**.6 | ATC029.1, Farbfeld ist deaktiviert | Dreipunkt-Menü; [Aktivieren]                                    | Farbe ist aktiviert                                                                                                |
