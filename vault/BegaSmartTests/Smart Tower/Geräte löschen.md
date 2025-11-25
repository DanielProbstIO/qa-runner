---
fileClass: GeneralTest
testCaseId: ATC042
testTags:
componente:
  - Smart Tower
view: Systemeinstellungen/Smart-Tower
vorbedingung: Smart Tower wurde dem System hinzugefügt, min. eine Leuchte wurde der App hinzugefügt
---
| Referenz                  | Ausgangspunkt                   | Vorgang                                                    | Erwartetes Verhalten        |
| :------------------------ | :------------------------------ | :--------------------------------------------------------- | :-------------------------- |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Tower | Dreipunkt-Menü auf Gerät; [Gerät entfernen]; [Abbruch]<br> | Vorgang abgebrochen         |
| **`= this.testCaseId`**.2 | Systemeinstellungen/Smart-Tower | Dreipunkt-Menü auf Gerät; [Gerät entfernen]; [OK]          | Gerät wird aus App gelöscht |
