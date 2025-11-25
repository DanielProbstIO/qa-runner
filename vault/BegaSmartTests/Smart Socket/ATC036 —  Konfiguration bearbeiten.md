---
fileClass: GeneralTest
testCaseId: ATC036
testTags:
componente:
  - Smart Socket
view: Systemeinstellungen/Smart-Socket
vorbedingung: Gerät zu Smart Socket in App hinzugefügt
---
| Referenz                  | Ausgangspunkt                    | Vorgang                                                                               | Erwartetes Verhalten            |
| :------------------------ | :------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------ |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Socket | Dreipunkt-Menü auf Gerät, [Gerät bearbeiten], Name ändern,  Icon ändern, [Abbruch]    | Änderungen werden verworfen     |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1        | Dreipunkt-Menü auf Gerät, [Gerät bearbeiten], Keine Änderungen vornehmen, [speichern] | Speichern nicht möglich         |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1        | Dreipunkt-Menü auf Gerät, [Gerät bearbeiten], Änderungen vornehmen, [speichern]       | Einstellungen werden übernommen |
