---
testid: "021"
tags:
---

## Tastenbelegung RC Übertragung

| Test Case ID        | TC`= this.testid`                                     |
| ------------------- | ----------------------------------------------------- |
| Komponente          | Remote Control (One)                              |
| Sub-Komp.           | One: Mittlere Taste und Taste 0 – 9 |
| Kategorie           | –                                                     |
| View /  Entry Point | Bediengeräte/RC                                       |
| Test-Case           | Gemachte Tastenkonfigurationen auf RC übertragen      |
| Vorbedingung        | Konfigurationen wurden vorgenommen                    |

| Referenz            | Ausgangspunkt                                       | Vorgang                                                               | Erwartetes Verhalten                                                                                                                       |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| TC`= this.testid`.1 | Tasten-Konfiguration abgeschlossen; Bediengeräte/RC | Anweisung befolgen, wie Einstellungen auf RC übertragen werden können | Daten werden an RC übertragen;<br><br>Beim Bedienen der Tasten ändern die verbundenen Geräte entsprechend der Tastenbelegung ihren Zustand |
| TC`= this.testid`.2 | Tasten-Konfiguration abgeschlossen; Bediengeräte/RC | Übertragung fehlgeschlagen                                            |                                                                                                                                            |