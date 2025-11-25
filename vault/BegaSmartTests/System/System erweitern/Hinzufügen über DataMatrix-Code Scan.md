---
fileClass: GeneralTest
testCaseId: ATC051
testTags:
componente:
view: Gerät hinzufügen
vorbedingung: Ein System wurde bereits erstellt
---
| Referenz                  | Ausgangspunkt          | Vorgang                                                             | Erwartetes Verhalten                                                                                                             |
| :------------------------ | :--------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Geräte-Hinzufügen-View | Geräte aus Liste in Geräte-Hinzufügen-View auswählen und bestätigen | Nav. zu Gerät-verbinden-View; Info-Card wie Geräte eingebunden werden kann wird präsentiert                                      |
| **`= this.testCaseId`**.2 | Info-Card              | [Nicht erneut zeigen] wählen                                        | Card wird bei erneutem Hinzufügen eines weiteren Smart Geräts nicht mehr präsentiert                                             |
| **`= this.testCaseId`**.3 | Info-Card              | [Verstanden] wählen                                                 | Card wird bei erneutem Hinzufügen eines weiteren Smart Geräts erneut präsentiert                                                 |
| **`= this.testCaseId`**.4 | Gerät-verbinden-View   | DataMatrix-Code scannen                                             | Vorgang war erfolgreich; Kamera wird deaktiviert; Gerätename-Card wird präsentiert                                               |
| **`= this.testCaseId`**.5 | Gerätename-Card        | Eindeutigen Device Namen vergeben und [Abbrechen]                   | Nav. zurück zu Geräte-Hinzufügen-View                                                                                            |
| **`= this.testCaseId`**.6 | Gerätename-Card        | Bereits vergebenen Namen vergeben                                   | Hinzufügen scheitert; Warnung wird präsentiert                                                                                   |
| **`= this.testCaseId`**.7 | Gerätename-Card        | Keinen Namen Vergeben                                               | Hinzufügen scheitert; Warnung wird präsentiert                                                                                   |
| **`= this.testCaseId`**.8 | Gerätename-Card        | Zu langen Namen (aktuelle 64 Zeichen) vergeben                      | Hinzufügen scheitert; Warnung wird präsentiert                                                                                   |
| **`= this.testCaseId`**.9 | Gerätename-Card        | Eindeutigen Device Namen vergeben und [Speichern]                   | Gerät wird mit dem vergebenen Namen dem System hinzugefügt;  Nav zu System-Übersicht; Gerät lässt sich steuern und konfigurieren |
