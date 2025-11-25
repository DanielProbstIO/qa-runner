---
testid: "016"
tags:
---

## RC One Namen ändern


| Test Case ID                                                                                                                                                 | ATC`= this.testid` |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Komponente                                                                                                                                                   | RC O               |
| View /  Entry Point                                                                                                                                          | Bediengeräte       |
| Vorbedingung      RC wurde erfolgreich dem System hinzugefügt [[RC One hinzufügen über Data-Matrix-Code Scan]] - [[RC One hinzufügen über manuelle Eingabe]] |                    |

| Referenz             | Ausgangspunkt                                                        | Vorgang          | Erwartetes Verhalten                                                               |
| -------------------- | -------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Bediengeräte/RC                                                      | [Name] auswählen | App navigiert zu Geräte-bearbeiten-View wo der Name gesetzt / geändert werden kann |
| ATC`= this.testid`.2 | Geräte-bearbeiten-View                                               | <name> anwählen  | Eingabegerät wird aktive                                                           |
| ATC`= this.testid`.3 | über eingeblendete Tastatur Namen anpassen. neuer Name != alter Name | [Speichern]      | Neuer Name wird übernommen und App navigiert zurück zu Bediengeräte/RC-View;       |
| ATC`= this.testid`.4 | ATC`= this.testid`.3                                                 | [Abbruch]        | Änderungen werden verworfen, App navigiert zurück zu Bediengeräte/RC-View          |
| ATC`= this.testid`.5 | über eingeblendete Tastatur Namen anpassen. neuer Name == alter Name | [Speichern]      | [Speichern] bleibt ausgegraut und lässt sich nicht benutzen                        |
| ATC`= this.testid`.6 | ATC`= this.testid`.5                                                 | [Abbruch]        | App navigiert zurück zu Bediengeräte/RC-View                                       |

