---
fileClass: GeneralTest
testCaseId: ATC073
testTags:
componente:
view: Ereignisse
vorbedingung: System erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt, Ereignis erstellt
---
| Referenz                  | Ausgangspunkt | Vorgang                                      | Erwartetes Verhalten              |
| :------------------------ | :------------ | :------------------------------------------- | :-------------------------------- |
| **`= this.testCaseId`**.1 | Ereignis-View | Ereignis nach links swipen, [Event auslösen] | Event wird vor der Zeit ausgelöst |
