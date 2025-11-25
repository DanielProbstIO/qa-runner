---
fileClass: GeneralTest
testCaseId: ATC009
testTags:
  - Scene
  - Motion Sensor
componente:
  - SSL
  - HF Basic
view: Bediengeräte/SSL/Bewegungssensor
vorbedingung:
---

| Referenz                  | Ausgangspunkt                                            | Vorgang                                                                                      | Erwartetes Verhalten                                                                                                     |
| :------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | View: Bediengeräte/SSL\|HF Bewegungssensor ist aktiviert | [Bewegung bei Dunkelheit] auswählen                                                          | Navigation zur Einrichtung-Bewegung-View                                                                                 |
| **`= this.testCaseId`**.2 | Einrichtung-Bewegung-View, keine Szene hinterlegt        | [Szene erstellen] auswählen                                                                  | Navigation zur Szenen-hinzufügen-View                                                                                    |
| **`= this.testCaseId`**.3 | Szenen-hinzufügen-View                                   | [Leuchten und Geräte] wählen und mindestens 1 Gerät hinzufügen, [Weiter] wählen              | Dialog zur Information der Gruppenerstellung wird gezeigt, [Schließen] wählen, Navigation zur Gruppe-erstellen-View      |
| **`= this.testCaseId`**.4 | Gruppe-erstellen-View                                    | [Gruppe erstellen] auswählen                                                                 | Navigation zur Szenen-editieren-View                                                                                     |
| **`= this.testCaseId`**.5 | Szenen-editieren-View                                    | Gruppe wählen, Gerät einschalten, neue beliebige Konfiguration auswählen, [Anwenden] drücken | Navigation zurück zur Szene-editieren-View                                                                               |
| **`= this.testCaseId`**.6 | Szenen-editieren-View, neue Konfiguration wurde gewählt  | [Fertigstellen] drücken                                                                      | Navigation zurück zu Einrichtung-Dunkelheit-View, neu erstellte Szene ist vorausgewählt, [Anwenden] Button ist aktiviert |
| **`= this.testCaseId`**.7 | Erstellte Szene wurde ausgewählt                         | [Anwenden] drücken                                                                           | [Bewegung in Dunkelheit] erhält den Namen der erstellten Szene                                                           |
