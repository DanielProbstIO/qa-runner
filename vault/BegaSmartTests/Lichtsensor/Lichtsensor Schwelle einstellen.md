---
testid: "003"
tags:
---

## Lichtsensor Schwelle einstellen


| Test Case ID        | ATC`= this.testid`                                            |
| ------------------- | ------------------------------------------------------------- |
| Komponente          | Device mit Lichtsensor                                        |
| View /  Entry Point | Bediengeräte/SSL\|HF                                          |
| Vorbedingung        | SSL/HF wurde dem System hinzugefügt und Lichtsensor ist aktiv |

| Referenz             | Ausgangspunkt             | Vorgang                                                            | Erwartetes Verhalten                                                                                                                                                                                                    |
| -------------------- | ------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Lichtsensor ist aktiviert | Slider setzen<br>                                                  | Slider lässt sich an die Vorgesehen Stelle setzen und bleibt dort stehen.  <br>Die Variable _Schwelle_ nimmt den vom Slider gesetzten Wert an; In ATC005 gemachte Konfig. löst bei Unterschreiten des Schwellwertes aus |
| ATC`= this.testid`.2 | Lichtsensor ist aktiviert | Slider setzen, Lichtsensor deaktivieren und anschließend aktiveren | Der gesetzte Slider-Wert bleibt erhalten<br><br><br><br><br><br>                                                                                                                                                        |
| ATC`= this.testid`.3 | Lichtsensor ist aktiviert | Slider setzen und weg navigieren<br>                               | Der gesetzte Slider-Wert bleibt erhalten<br>                                                                                                                                                                            |
| ATC`= this.testid`.4 | Lichtsensor ist aktiviert | Slider setzen und App Schließen                                    | Der gesetzte Slider-Wert bleibt erhalten                                                                                                                                                                                |
| ATC`= this.testid`.5 | Lichtsensor ist aktiviert | Slider auf den niedrigsten Wert setzten                            | Lichtsensor ist aktiviert                                                                                                                                                                                               |
| ATC`= this.testid`.6 | Lichtsensor ist aktiviert | Slider auf 70lx                                                    | Lichtsensor ist aktiviert                                                                                                                                                                                               |
| ATC`= this.testid`.7 | Lichtsensor ist aktiviert | Slider auf den höchsten Wert setzten                               | Lichtsensor ist aktiviert                                                                                                                                                                                               |

