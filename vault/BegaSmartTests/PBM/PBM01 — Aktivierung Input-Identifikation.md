---
fileClass: GeneralTest
testCaseId: PBM01
testTags:
componente: [PBM]
view: Bediengeräte-View/PBM-Übersicht-Screen
vorbedingung: PBM provisioniert; PBM auf Werkseinstellungen
---

| Referenz                  | Ausgangspunkt                                                                                     | Vorgang                                                                                            | Erwartetes Verhalten                                                                                         |
| :------------------------ | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Def. Werkseinstellungen werden angezeigt; Modal mit Informationen über PBM wird initial angezeigt | [Schließen] wählen                                                                                 | Modal wird geschlossen                                                                                       |
| **`= this.testCaseId`**.2 | PBM-Übersicht-Screen                                                                              | i-Info wählen                                                                                      | Modal mit Informationen über PBM wird wieder eingeblendet                                                    |
| **`= this.testCaseId`**.3 | Mind. ein Taster oder Schalter verbunden                                                          | Aktivierung Input-Identifikation; Eingabe auf phys. PBM tätigen                                    | Korrespondierender Eingang wird in App hervorgehoben                                                         |
| **`= this.testCaseId`**.4 | Mind. zwei Taster oder Schalter verbunden                                                         | Noch während getriggerter Eingang hervorgehoben wird, erneute Eingabe auf anderem phys. PBM machen | Vorheriger Eingang wird nicht mehr hervorgehoben; neuer korrespondierender Eingang in App wird hervorgehoben |
| **`= this.testCaseId`**.5 | Keine Leuchte provisioniert                                                                       | Input wählen                                                                                       | Fehlermeldung „No Gears available in the System“                                                             |
| **`= this.testCaseId`**.6 | „No Gears available“ Modal                                                                        | [Schließen] wählen                                                                                 | Modal wird geschlossen                                                                                       |
| **`= this.testCaseId`**.7 | Mind. eine Leuchte provisioniert                                                                  | Input wählen                                                                                       | Navigation zu erstem Input-Konfig-Screen                                                                     |
