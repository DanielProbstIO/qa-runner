---
fileClass: GeneralTest
testCaseId: ATC072
testTags:
componente:
view: Ereignisse
vorbedingung: System erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt, Ereignis erstellt
---
| Referenz                  | Ausgangspunkt             | Vorgang                       | Erwartetes Verhalten                          |
| :------------------------ | :------------------------ | :---------------------------- | :-------------------------------------------- |
| **`= this.testCaseId`**.1 | Ereignis-View             | Ausschalten mit Toggle-Switch | Event deaktiviert, Event wird nicht ausgelöst |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1 | Einschalten mit Toggle-Switch | Event aktiviert, Event wird ausgelöst         |
