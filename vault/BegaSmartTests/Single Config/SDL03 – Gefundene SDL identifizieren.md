---
fileClass: GeneralTest
testCaseId: SDL03
testTags:
  - Single Config
componente:
  - SDL
view: Start-View/SC-Geräte-Suchen-View
vorbedingung: SDL-Geräte gefunden und gelistet
---

| Referenz                  | Ausgangspunkt                                                | Vorgang                          | Erwartetes Verhalten                                                                                                                                                         |
| :------------------------ | :----------------------------------------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | SDL hält eine aktive BLE conn. zu einem andren Mobiltelefon  | Identifizieren                   | BLE conn. kann zu assoziiertem, phys. Gerät nicht hergestellt werden; identifikationsversuch schlägt fehl; Fehler wird in SDL-Geräte-Card eingeblendet                       |
| **`= this.testCaseId`**.2 | SDL hält keine aktive BLE conn.; SDL ist Pin geschützt       | Identifizieren                   | Geräte-Pin wird über App-UI abgefragt (Pin Dialog)                                                                                                                           |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2; Pin Dialog                        | Falscher Pin eingeben; Anwenden  | Fehlermeldung                                                                                                                                                                |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.2; Pin Dialog                        | Richtigen Pin eingeben; Anwenden | Assoziiertes phys. Gerät leuchtet auf                                                                                                                                        |
| **`= this.testCaseId`**.5 | SDL hält eine aktive BLE conn.; SDL ist Pin geschützt        | Identifizieren                   | App hat BLE-Adv-Infos im cache: Gesetzter SDL Geräte-Pin wird über App-UI abgefragt; <br><br>App hat noch keine BLE-Adv-Infos abgefragt: Fehlermeldung, SDL nicht erreichbar |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.5; Pin Dialog                        | Falscher Pin eingeben; Anwenden  | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                            |
| **`= this.testCaseId`**.7 | **`= this.testCaseId`**.5; Pin Dialog                        | Richtigen Pin eingeben; Anwenden | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                            |
| **`= this.testCaseId`**.8 | SDL hält keine aktive BLE conn.; SDL ist nicht Pin geschützt | Identifizieren                   | Assoziiertes phys. Gerät leuchtet auf                                                                                                                                        |
