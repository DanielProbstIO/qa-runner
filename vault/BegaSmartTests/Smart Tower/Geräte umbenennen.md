---
fileClass: GeneralTest
testCaseId: ATC040
testTags:
componente:
  - Smart Tower
view: Systemeinstellungen/Smart-Tower
vorbedingung: Smart Tower wurde dem System hinzugefügt, min. eine Leuchte wurde der App hinzugefügt
---
| Referenz                  | Ausgangspunkt                   | Vorgang                                                                      | Erwartetes Verhalten                               |
| :------------------------ | :------------------------------ | :--------------------------------------------------------------------------- | :------------------------------------------------- |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Tower | Geräte-Info-Icon auf Gerät; [Gerät umbenennen]; umbenennen; <br>[Abbruch]    | Änderungen werden verworfen                        |
| **`= this.testCaseId`**.2 | Systemeinstellungen/Smart-Tower | Geräte-Info-Icon auf Gerät; [Gerät umbenennen]; umbenennen;  <br>[speichern] | Änderung werden übernommen; Name wird aktualisiert |
