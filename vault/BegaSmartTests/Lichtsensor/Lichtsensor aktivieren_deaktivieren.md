---
testid: "002"
tags:
---

## Lichtsensor aktivieren/deaktivieren


| Test Case ID        | ATC`= this.testid`                  |
| ------------------- | ----------------------------------- |
| Komponente          | Device mit Lichtsensor              |
| View /  Entry Point | Bediengeräte/SSL\|HF                |
| Vorbedingung        | SSL/HF wurde dem System hinzugefügt |

| Referenz             | Ausgangspunkt               | Vorgang                                                                                | Erwartetes Verhalten                                                                                                                                                                                                                                             |
| -------------------- | --------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Lichtsensor ist aktiviert   | Lichtsensor deaktivieren  <br>(Toggle-Button)                                          | Toggle-Button ist deaktiviert<br><br>Card mit den Lichtsensor Attributen klappt sich ein.<br><br>Das Konfigurationsmenü **Beleuchtung bei bestimmter Umgebungshelligkeit** ist inaktive und ausgegraut; Konf. Lichtsensor Events werden nicht mehr ausgelöst     |
| ATC`= this.testid`.2 | Lichtsensor ist deaktiviert | Unter **Beleuchtung bei bestimmter Umgebungshelligkeit** [Gerät konfigurieren]  wählen | Toggle-Button ist aktiviert<br><br>Card mit den Lichtsensor Attributen klappt sich aus.<br><br>Das Konfigurationsmenü **Beleuchtung bei bestimmter Umgebungshelligkeit** ist aktiv und lässt sich bearbeiten;  <br><br>Konf. Lichtsensor Events werden ausgelöst |
| ATC`= this.testid`.3 | Lichtsensor ist deaktiviert | Lichtsensor aktivieren  <br>(Toggle-Button)                                            | Toggle-Button ist aktiviert<br><br>Card mit den Lichtsensor Attributen klappt sich aus.<br><br>Das Konfigurationsmenü **Beleuchtung bei bestimmter Umgebungshelligkeit** ist aktiv und lässt sich bearbeiten;  <br><br>Konf. Lichtsensor Events werden ausgelöst |

