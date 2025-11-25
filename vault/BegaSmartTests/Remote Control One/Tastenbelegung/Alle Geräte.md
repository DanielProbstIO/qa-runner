---
testid: "020"
tags:
---

## Tastenbelegung Alle Geräte

| Test Case ID        | ATC`= this.testid`                                                        |
| ------------------- | ------------------------------------------------------------------------- |
| Komponente          | Remote Control (One)                                                  |
| Sub-Komp.           | One: Mittlere Taste und Taste 0 – 9                 |
| Kategorie           | Alle Geräte                                                               |
| View /  Entry Point | Bediengeräte/RCOne/taste/alle Geräte/                                   |
| Test-Case           | Für alle Geräte im Netzwerk eine Action einer Taste zuweisen              |
| Vorbedingung        | RCOne eingebunden                                                         |

| Referenz             | Ausgangspunkt                                           | Vorgang                                | Erwartetes Verhalten                                                                                           |
| -------------------- | ------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Bediengeräte/RC-View; keine Geräte eingebunden          | [Button] ⟹ [alle Geräte]             | Nav. zu Alle-Geräte-Konfigurations-View;<br><br>Weiter bei ATC051                                              |
| ATC`= this.testid`.2 | Bediengeräte/RC-View; mind. eine Leuchte oder Gerät eingebunden | ATC020.1                               | Nav. zu Alle-Geräte-Konfig.-View; Aktionen angezeigt                                                           |
| ATC`= this.testid`.3 | Alle-Geräte-Konfig.-View                                | Aktion wählen; [<]                     | Einstellung wird verworfen;<br><br>Nav zu <taste-n>-konfig-View                                                |
| ATC`= this.testid`.4 | Alle-Geräte-Konfig.-View                                | Szene wählen; [Speichern]              | Einstellung wird gespeichert;<br><br>Nav zu Bediengeräte/RC-View                                               |
| ATC`= this.testid`.5 | Info-Card                                               | [Verstanden]                           | Nav zurück zu Bediengeräte/RC-View;                                                                            |
| ATC`= this.testid`.6 | Info-Card                                               | [Nicht mehr anzeigen]                  | Info-Card wird bei der nächsten Tasten-Konfig nicht mehr angezeigt;<br><br>Nav zurück zu Bediengeräte/RC-View; |