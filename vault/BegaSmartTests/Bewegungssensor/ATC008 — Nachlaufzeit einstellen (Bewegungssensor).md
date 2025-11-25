---
fileClass: GeneralTest
testCaseId: ATC008
testTags:
  - Motion Sensor
componente:
  - SSL
  - HF Basic
view: Bediengeräte/SSL/Bewegungssensor
vorbedingung:
---

| Referenz                  | Ausgangspunkt                     | Vorgang                                                    | Erwartetes Verhalten |
| :------------------------ | :-------------------------------- | :---------------------------------------------------------- | :------------------- |
| **`= this.testCaseId`**.1 | Bewegungssensor aktiv             | [Nachlaufzeit] auswählen                                   | Navigation zu Nachlaufzeit-Konfigurations-View |
| **`= this.testCaseId`**.2 | Nachlaufzeit-Konfigurations-View   | Gewünschte Stunden, Minuten und Sekunden einstellen, speichern | Navigation zurück zur Einrichtung-Bewegungssensor-View, Nachlaufzeit zeigt entsprechende Änderung der vorgenommenen Einstellung an |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2          | Gewünschte Stunden, Minuten und Sekunden einstellen und verwerfen [<] | Navigation zurück zur Einrichtung-Bewegungssensor-View, gemachte Konfiguration wird verworfen |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.2          | Nachlaufzeit auf 10sec, speichern, [Anwenden] drücken       | Nach detektierter Bewegung behält die Leuchte ihren def. Zustand für 10sec bei |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.2          | Nachlaufzeit < 5sec, speichern                              | Werte < 5 sec lassen sich nicht einstellen. Speichern Button ist deaktiviert |
