---
testid: "018"
tags:
---

## Tastenbelegung Leuchten und Geräte

| Test Case ID        | ATC`= this.testid`                                                  |
| ------------------- | ------------------------------------------------------------------- |
| Komponente          | Remote Control One                                                  |
| Sub-Komp.           | One: Mittlere Taste und Taste 0 – 9                                 |
| Kategorie           | Leuchten und Geräte                                                 |
| View /  Entry Point | Bediengeräte/RC/Taste/Leuchten und Geräte/                          |
| Test-Case           | Eine Action für eine Leuchte konfigurieren und einer Taste zuweisen |
| Vorbedingung        | RCOne eingebunden                                                   |

| Referenz             | Ausgangspunkt                                                   | Vorgang                                                    | Erwartetes Verhalten                                                                                           |
| -------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Bediengeräte/RC-View; keine Leuchten und Geräte eingebunden     | [Button] ⟹ [Leuchten und Geräte]                           | Nav. zu Leuchten-und-geräte-Konfigurations-View;<br><br>Weiter bei ATC051                                      |
| ATC`= this.testid`.2 | Bediengeräte/RC-View; mind. eine Leuchte oder Gerät eingebunden | ATC018.1                                                   | Nav. zu Leuchten-und-geräte-Konfigurations-View; Aktionen und Geräte angezeigt                                 |
| ATC`= this.testid`.3 | Leuchten-und-Geräte-Konfig-View                                 | Aktion wählen, verfügbare Geräte wählen und [speichern]    | Konfig. wird gespeichert;<br><br>Info-Card wie Konfig. auf RC übertragen werden kann;                          |
| ATC`= this.testid`.4 | Info-Card                                                       | [Verstanden]                                               | Nav zurück zu Bediengeräte/RC-View;                                                                            |
| ATC`= this.testid`.5 | Info-Card                                                       | [Nicht mehr anzeigen]                                      | Info-Card wird bei der nächsten Tasten-Konfig nicht mehr angezeigt;<br><br>Nav zurück zu Bediengeräte/RC-View; |
| ATC`= this.testid`.6 | Leuchten-und-Geräte-Konfig-View                                 | Eine Aktion und Gerät wählen und Einstellung verwerfen [<] | Gemachte Konfiguration wird verworfen;<br><br>Nav zu <taste-n>-konfig-View                                     |

