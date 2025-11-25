---
fileClass: GeneralTest
testCaseId: SDL04
testTags:
  - Single Config
componente:
  - SDL
view: SDL-Geräte-Suchen-View
vorbedingung: SDL-Geräte gefunden und gelistet
---

| Referenz                  | Ausgangspunkt                                                | Vorgang                          | Erwartetes Verhalten                                                                                                                                                         |
| :------------------------ | :----------------------------------------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | SDL hält eine aktive BLE conn. zu einem andren Handy         | Konfig.-Btn                      | BLE conn. kann zu assoziiertem, phys. Gerät nicht hergestellt werden; Fehler wird in SDL-Geräte-Card eingeblendet                                                            |
| **`= this.testCaseId`**.2 | SDL hält keine aktive BLE conn.; SDL ist Pin geschützt       | Konfig.-Btn                      | Geräte-Pin wird über App-UI abgefragt (Pin Dialog)                                                                                                                           |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2; Pin Dialog                        | Falscher Pin eingeben; Anwenden  | Fehlermeldung                                                                                                                                                                |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.2; Pin Dialog                        | Richtigen Pin eingeben; Anwenden | Konfig-Menu wird geöffnet; weiter bei .X                                                                                                                                     |
| **`= this.testCaseId`**.5 | SDL hält eine aktive BLE conn.; SDL ist Pin geschützt        | Konfig.-Btn                      | App hat BLE-Adv-Infos im cache: Gesetzter SDL Geräte-Pin wird über App-UI abgefragt; <br><br>App hat noch keine BLE-Adv-Infos abgefragt: Fehlermeldung, SDL nicht erreichbar |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.5; Pin Dialog                        | Falscher Pin eingeben; Anwenden  | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                            |
| **`= this.testCaseId`**.7 | **`= this.testCaseId`**.5; Pin Dialog                        | Richtigen Pin eingeben; Anwenden | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                            |
| **`= this.testCaseId`**.8 | SDL hält keine aktive BLE conn.; SDL ist nicht Pin geschützt | Konfig.-Btn                      | Konfig-Menu wird geöffnet; weiter bei .X                                                                                                                                     |
| **`= this.testCaseId`**.9 | Konfig.-Menu verlassen                                       | Abbruch                          | Device-Card-View                                                                                                                                                             |
