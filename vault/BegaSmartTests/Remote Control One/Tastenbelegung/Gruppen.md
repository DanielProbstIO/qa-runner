---
testid: "017"
tags:
---

## Tastenbelegung Gruppen


| Test Case ID        | ATC`= this.testid`                                                 |
| ------------------- | ------------------------------------------------------------------ |
| Komponente          | RC One                                                             |
| Sub-Komp.           | Mittlere Taste und Taste 0 – 9                                     |
| View /  Entry Point | Bediengeräte/RC/<taste>/Gruppen/                                   |
| Test-Case           | Eine Action für eine Gruppe konfigurieren und an eine Taste Binden |
| Vorbedingung        | RC eingebunden                                                     |

| Referenz             | Ausgangspunkt                              | Vorgang                                                                   | Erwartetes Verhalten                                                                                                    |
| -------------------- | ------------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | Bediengeräte/RC-View und Gruppen vorhanden | TC020.1 Alle Geräte                                                       | Nav. zu Gruppen-Konfig-View; Aktion und Gruppen werden angezeigt                                                        |
| ATC`= this.testid`.2 | Gruppen-Konfig-View                        | Aktion wählen, verfügbare  Gruppe wählen und [speichern]                  | Konfig. wird gespeichert; <br><br>Info-Card wie Konfig. auf RC übertragen werden kann;                                  |
| ATC`= this.testid`.3 | Info-Card                                  | [Verstanden]                                                              | Nav zurück zu Bediengeräte/RC-View;<br><br>                                                                             |
| ATC`= this.testid`.4 | Info-Card                                  | [Nicht mehr anzeigen]                                                     | Info-Card wird bei der nächsten Tasten-Konfig nicht mehr angezeigt; <br><br>Nav zurück zu Bediengeräte/RC-View;<br><br> |
| ATC`= this.testid`.5 | Gruppen-Konfig-View                        | Eine Aktion und eine Gruppe wählen <br><br>und Einstellung  verwerfen [<] | Gemachte Konfiguration wird verworfen; <br><br>Nav zu <taste-n>-konfig-View<br><br>                                     |

