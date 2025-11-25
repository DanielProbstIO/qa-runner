---
fileClass: GeneralTest
testCaseId: PBM12
testTags:
componente: [PBM]
view: Basic-Setup
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; mind. ein Input konfig. 
---

| Referenz                   | Ausgangspunkt                       | Vorgang                                                                                          | Erwartetes Verhalten                                                                                  |
| :------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1  | Modul-Übersicht-Screen              | [Editieren] Button wählen                                                                        | Nav. zu Basic-Setup Screen; Die für den Input bereits gesetzten konfig sind markiert                  |
| **`= this.testCaseId`**.2  | Konfig.-Wizard Teil I               | Name editieren                                                                                   | s. PBM04                                                                                              |
| **`= this.testCaseId`**.3  | Konfig.-Wizard Teil I               | Device-Type anpassen                                                                             | Warning-Modal wird präsentiert;                                                                       |
| **`= this.testCaseId`**.4  | Change-config-Modal                 | [Abbrechen] wählen                                                                               | Vorgang wird abgebrochen; Änderung (auch des Device-Types) wird rückgängig gemacht                    |
| **`= this.testCaseId`**.5  | Change-config-Modal                 | [Weiter] wählen                                                                                  | Alle auf dem Input gespeicherte Konfig. werden gelöscht; Input muss neu konfig. werden                |
| **`= this.testCaseId`**.6  | Konfig.-Wizard Teil I               | Icon anpassen                                                                                    | Neu gewähltes Icon wird markiert und gesetzt                                                          |
| **`= this.testCaseId`**.7  | Konfig.-Wizard Teil I               | [Abbrechen] wählen                                                                               | Wizard wird beendet; nav. zu PBM-Übersicht; gemachte Änderungen werden verworfen                      |
| **`= this.testCaseId`**.8  | Konfig.-Wizard Teil I               | [Weiter] wählen                                                                                  | Nav. zu Kategorie-Editieren-Screen                                                                    |
| **`= this.testCaseId`**.9  | Konfig.-Wizard Teil II              | Kategorie anpassen; und neuer Kategorie neue Leuchten-und-Geräte oder Gruppe oder Szene zuweisen | Abhängig von Ziel Kategorie;  s. PBM07 für Gruppen; s. PBM06 für Leuchten-und-Ge. s. PBM07 für Szenen |
| **`= this.testCaseId`**.10 | Konfig.-Wizard Teil II              | [Abbrechen] wählen                                                                               | Wizard wird beendet; nav. zu PBM-Übersicht; gemachte Änderungen werden verworfen                      |
| **`= this.testCaseId`**.11 | Konfig.-Wizard Teil II              | [Weiter] wählen                                                                                  | Nav. zu Konfig.-Wizard Teil III                                                                       |
| **`= this.testCaseId`**.12 | Konfig.-Wizard Teil III-A           | Action für Szene anpassen                                                                        | s. PBM09                                                                                              |
| **`= this.testCaseId`**.13 | Konfig.-Wizard Teil III-B           | Action für Leuchten-und-Geräte oder Gruppe anpassen                                              | s. PBM10                                                                                              |
| **`= this.testCaseId`**.14 | Konfig.-Wizard Teil III             | [Abbrechen] wählen                                                                               | Wizard wird beendet; nav. zu PBM-Übersicht; gemachte Änderungen werden verworfen                      |
| **`= this.testCaseId`**.15 | Konfig.-Wizard Teil III             | [An Gerät senden] wählen                                                                         | Der Eingang wird neu beschrieben;                                                                     |
| **`= this.testCaseId`**.16 | Konfig.-Wizard Teil I,  II oder III | [Zurücksetzen der Einstellungen] wählen                                                         | s. PBM05                                                                                              |
