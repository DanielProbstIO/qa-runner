---
fileClass: GeneralTest
testCaseId: ATC037
testTags:
componente:
  - Smart Socket
view: Systemeinstellungen/Smart-Socket
vorbedingung: Gerät zu Smart Socket in App hinzugefügt
---
| Referenz                  | Ausgangspunkt                                                                | Vorgang                           | Erwartetes Verhalten            |
| :------------------------ | :--------------------------------------------------------------------------- | :-------------------------------- | :------------------------------ |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Socket                                             | Dreipunkt-Menü auf Gerät, Löschen | Verbundenes Gerät wird gelöscht |
| **`= this.testCaseId`**.2 | Gerät ist Teil einer Gruppe mit mehreren Geräten                             | **`= this.testCaseId`**.1         |                                 |
| **`= this.testCaseId`**.3 | Gerät ist nur mit sich selbst in der Gruppe bzw. letztes Gerät in der Gruppe | **`= this.testCaseId`**.1         |                                 |
