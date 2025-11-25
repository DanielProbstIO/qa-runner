---
fileClass: GeneralTest
testCaseId: ATC093
testTags:
componente:
view: Einstellungen
vorbedingung:
---
| Referenz                  | Ausgangspunkt | Vorgang               | Erwartetes Verhalten                     |
| :------------------------ | :------------ | :-------------------- | :--------------------------------------- |
| **`= this.testCaseId`**.1 | Einstellungen | [Datenschutz]         | Datenschutzbestimmungen werden angezeigt |
| **`= this.testCaseId`**.2 | Einstellungen | [Nutzungsbedingungen] | Nutzungsbedingungen werden angezeigt     |
