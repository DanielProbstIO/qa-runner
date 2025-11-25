---
fileClass: GeneralTest
testCaseId: ATC006
testTags:
  - Motion Sensor
componente:
  - SSL
  - HF Basic
view: Bediengeräte/SSL| Bewegungssensor
vorbedingung:
---

| Referenz                  | Ausgangspunkt                   | Vorgang                                                          | Erwartetes Verhalten                                                                                    |
| :------------------------ | :------------------------------ | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Bewegungssensor ist aktiviert   | Bewegungssensor deaktivieren (Toggle-Button), [Anwenden] drücken | Navigation zurück zum SSL, Bewegungssensor Card steht auf „aus“                                         |
| **`= this.testCaseId`**.2 | Bewegungssensor ist deaktiviert | Bewegungssensor aktivieren (Toggle-Button), [Anwenden] drücken   | Navigation zurück zum SSL, Bewegungssensor Card steht auf „ein“ und Infos werden auf der Card angezeigt |
