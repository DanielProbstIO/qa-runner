---
testid: "019"
tags:
---

## Tastenbelegung Szenen

| Test Case ID        | ATC`= this.testid`                  |
| ------------------- | ----------------------------------- |
| Komponente          | Remote Control (One)                |
| Sub-Komp.           | One: Mittlere Taste und Taste 0 – 9 |
| Kategorie           | Szenen                              |
| View /  Entry Point | Bediengeräte/RC/taste/Szenen/       |
| Test-Case           | Szene einer Taste zuweisen          |
| Vorbedingung        | RC eingebunden                      |

| Referenz             | Ausgangspunkt                        | Vorgang                                             | Erwartetes Verhalten                                                                                      |
| -------------------- | ------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Bediengeräte/RC-View; keine Szenen angelegt | [Button] ⟹ [Szenen]                              | Nav. zu Szenen-Konfigurations-View;<br><br>Weiter bei ATC066                                              |
| ATC`= this.testid`.2 | Bediengeräte/RC-View; Szenen angelegt | ATC018.1                                            | Nav. zu Szenen-Konfigurations-View; Verfügbare Szenen werden angezeigt                                   |
| ATC`= this.testid`.3 | Szenen-Konfigurations-View            | Szene wählen; [<]                                   | Einstellung wird verworfen;<br><br>Nav zu <taste-n>-konfig-View                                           |
| ATC`= this.testid`.4 | Szenen-Konfigurations-View            | Szene wählen; [Speichern]                           | Einstellung wird gespeichert;<br><br>Nav zu Bediengeräte/RC-View                                          |
| ATC`= this.testid`.5 | Info-Card                             | [Verstanden]                                        | Nav zurück zu Bediengeräte/RC-View;                                                                       |
| ATC`= this.testid`.6 | Info-Card                             | [Nicht mehr anzeigen]                               | Info-Card wird bei der nächsten Tasten-Konfig nicht mehr angezeigt;<br><br>Nav zurück zu Bediengeräte/RC-View; |