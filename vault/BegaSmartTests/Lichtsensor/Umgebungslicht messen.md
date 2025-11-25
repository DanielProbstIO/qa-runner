---
testid: "004"
tags:
---

## Umgebungslicht messen


| Test Case ID        | ATC`= this.testid`                                            |
| ------------------- | ------------------------------------------------------------- |
| Komponente          | Device mit Lichtsensor                                        |
| View /  Entry Point | Bediengeräte/SSL\|HF                                          |
| Vorbedingung        | SSL/HF wurde dem System hinzugefügt und Lichtsensor ist aktiv |

| Referenz             | Ausgangspunkt                       | Vorgang                                                                    | Erwartetes Verhalten                                                                                                                                                            |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Lichtsensor ist aktiviert           | Umgebungshelligkeit am Sensorstandort messen durch Drücken des Buttons<br> | Sensor misst die Beleuchtungsstärke in Lux auf der Skala von 1lx – 150lx, der gemessene Wert wird für den User durch ein Sonnensymbol auf der Skala visualisiert                |
| ATC`= this.testid`.2 | Umgebungslicht min. einmal gemessen | Sensor manuell abdunkeln und erneut messen                                 | Feedback an den User in Form eines Ladekreises bei erneutem messen<br><br>Ist der neu gemessene Wert != alter Wert, verschiebt sich das Sonnensymbol entsprechend auf der Skala |
| ATC`= this.testid`.3 | SSL aus                             | Umgebungshelligkeit am Sensorstandort messen durch Drücken des Buttons<br> | Umgebungshelligkeit lässt sich nicht messen<br>                                                                                                                                 |


