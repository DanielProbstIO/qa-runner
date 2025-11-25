---
testid: "022"
tags:
---

## Tastenbelegung Konfiguration löschen

| Test Case ID        | ATC`= this.testid`                        |
| ------------------- | ------------------------------------------ |
| Komponente          | Remote Control One                         |
| Sub-Komp.           | Mittlere Taste und Taste 0 – 9             |
| Kategorie           | –                                          |
| View /  Entry Point | Bediengeräte/RCOne/taste                 |
| Test-Case           | Konfig. für eine bestimmte Taste löschen   |
| Vorbedingung        | Für die gewählte Taste wurden Einstellungen gemacht |

| Referenz             | Ausgangspunkt                  | Vorgang      | Erwartetes Verhalten                           |
| -------------------- | ------------------------------ | ------------ | ---------------------------------------------- |
| ATC`= this.testid`.1 | View: Bediengeräte/RCOne/taste | [Bearbeiten] | Toast, um Tastenkonfig zu löschen, öffnet sich |
| ATC`= this.testid`.2 | Toast                          | [Abbruch]    | Einstellungen bleiben erhalten                 |
| ATC`= this.testid`.3 | Toast                          | [Entfernen]  | Konfig. auf Taste werden gelöscht              |
