---
fileClass: GeneralTest
testCaseId: ATC007
testTags:
  - Motion Sensor
componente:
  - SSL
view: Bediengeräte/SSL/Bewegungssensor
vorbedingung:
---

| Referenz                  | Ausgangspunkt             | Vorgang                                                | Erwartetes Verhalten                                                                                                                                                                                              |
| :------------------------ | :------------------------ | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bewegungssensor aktiviert | Slider auf gewünschten Wert setzen, [Anwenden] drücken | Slider bleibt auf gesetztem Wert, das untere Textfield zeigt den gesetzten Wert in % an; Das Textfield und der Slider stimmen sichtlich überein. Die Leuchten reagieren entsprechend der Einstellung auf Bewegung |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1 | Slider auf niedrigsten Wert setzen, [Anwenden] drücken | Wert der Variable == 1%, Sensor Empfindlichkeit ist gering                                                                                                                                                        |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1 | Slider auf höchsten Wert setzen, [Anwenden] drücken    | Wert der Variable auf == 100%, Sensor Empfindlichkeit ist hoch                                                                                                                                                    |
