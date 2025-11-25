---
fileClass: GeneralTest
testCaseId: SDL07
testTags:
  - Single Config
componente:
  - SDL
view: /SDL-Geräte-Suchen-View
vorbedingung: SDL-Geräte gefunden und gelistet; SDL Pin geschützt
---

| Referenz                  | Ausgangspunkt                                         | Vorgang                                        | Erwartetes Verhalten                                                                                                                                                           |
| :------------------------ | :---------------------------------------------------- | :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | SDL hält eine aktive BLE conn. zu einem anderen Gerät | Konfig.-Btn                                    | App hat BLE-Adv-Infos im cache:<br>Gesetzter SDL Geräte-Pin wird über App-UI abgefragt;<br><br>App hat noch keine BLE-Adv-Infos abgefragt: Fehlermeldung, SDL nicht erreichbar |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1; Pin Dialog                 | Falscher Pin eingeben; Anwenden                | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                              |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1; Pin Dialog                 | Richtigen Pin eingeben; Anwenden               | BLE conn. kann nicht aufgebaut werden; Eingegebener Pin kann nicht geprüft werden                                                                                              |
| **`= this.testCaseId`**.4 | SDL hat keine aktive BLE conn.                        | Konfig.-Btn                                    | SDL Geräte-Pin wird über App-UI abgefragt (Pin Dialog)                                                                                                                         |
| **`= this.testCaseId`**.5 | Pin Dialog                                            | Falscher Pin eingeben; Anwenden                | Fehlermeldung                                                                                                                                                                  |
| **`= this.testCaseId`**.6 | Pin Dialog                                            | Richtigen Pin eingeben; Anwenden               | Konfig.-Menu wird geöffnet                                                                                                                                                     |
| **`= this.testCaseId`**.7 | Konfig.-Menu                                          | Sicherheits-Pin-Schutz Toggle Btn deaktivieren | Pin-Schutz ist deaktiviert; Pin wird gelöscht; SDL kann ohne Pin Eingabe konfig. werden; Schloss-Icon in Geräte-Card-View ist geöffnet                                         |
