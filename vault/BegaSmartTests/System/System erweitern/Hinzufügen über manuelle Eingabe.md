---
fileClass: GeneralTest
testCaseId: ATC052
testTags:
componente:
view: Gerät hinzufügen
vorbedingung: Ein System wurde bereits erstellt
---
| Referenz                  | Ausgangspunkt                                    | Vorgang                                                             | Erwartetes Verhalten                                                                                                             |
| :------------------------ | :----------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Geräte-Hinzufügen-View                           | Geräte aus Liste in Geräte Hinzufügen View auswählen und bestätigen | Nav. zu Gerät-verbinden-View; Info-Card wie Geräte eingebunden werden kann wird präsentiert                                      |
| **`= this.testCaseId`**.2 | Gerät-Verbinden-View                             | [Code eingeben] wählen                                              | Card mit Eingabefeld wird präsentiert                                                                                            |
| **`= this.testCaseId`**.3 | Gerät-Verbinden-View mit Eingabefeld für Art.Nr. | Informationen eines anderen Devices aus Smart Reihe eintragen       | Fehler: Falsches Gerät                                                                                                           |
| **`= this.testCaseId`**.4 | Gerät-Verbinden-View mit Eingabefeld für Art.Nr. | Fremden Informationen eintragen                                     | Fehler: Unbekanntes Gerät                                                                                                        |
| **`= this.testCaseId`**.5 | Gerät-Verbinden-View mit Eingabefeld für Art.Nr. | Informationen eintragen                                             | Gerät wird mit dem vergebenen Namen dem System hinzugefügt;  Nav zu System-Übersicht; Gerät lässt sich steuern und konfigurieren |

