---
fileClass: GeneralTest
testCaseId: ATC074
testTags:
componente:
view: Ereignisse
vorbedingung: System erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt, Ereignis erstellt
---
| Referenz                  | Ausgangspunkt             | Vorgang                                            | Erwartetes Verhalten          |
| :------------------------ | :------------------------ | :------------------------------------------------- | :---------------------------- |
| **`= this.testCaseId`**.1 | Ereignis-View             | Ereignis nach links swipen, [Löschen], [Abbrechen] | Löschvorgang wird abgebrochen |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1 | Ereignis nach links swipen, [Löschen], [Löschen]   | Ereignis wird gelöscht        |
