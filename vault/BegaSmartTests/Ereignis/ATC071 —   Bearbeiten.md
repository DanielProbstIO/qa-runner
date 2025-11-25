---
fileClass: GeneralTest
testCaseId: ATC071
testTags:
componente:
view: Ereignisse
vorbedingung: System erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt, Ereignis erstellt
---
| Referenz                  | Ausgangspunkt                                           | Vorgang                                                                                                | Erwartetes Verhalten    |
| :------------------------ | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- | :---------------------- |
| **`= this.testCaseId`**.1 | Korrekt konfiguriertes Ereignis                         | Ereignis nach links swipen, [Bearbeiten], Startzeitpunkt verändern und speichern                       | Änderung wird angewandt |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Ausschaltzeitpunkt verändern                                 | Änderung wird angewandt |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Start auf Sonnenaufgang legen                                | Änderung wird angewandt |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Wiederholungen verändern                                     | Änderung wird angewandt |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Namen ändern                                                 | Änderung wird angewandt |
| **`= this.testCaseId`**.6 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Start- auf Endzeitpunkt legen                                | Änderung wird angewandt |
| **`= this.testCaseId`**.7 | Korrekt konfiguriertes Ereignis; Gerät(e) ausgeschaltet | Ereignis nach links swipen, [Bearbeiten], Ereignis bearbeiten                                          | Änderung wird angewandt |
| **`= this.testCaseId`**.8 | **`= this.testCaseId`**.1                               | Ereignis nach links swipen, [Bearbeiten], Name/Ereignis/Zeit/Wiederholung ändern und zurück navigieren | Änderung wird verworfen |
