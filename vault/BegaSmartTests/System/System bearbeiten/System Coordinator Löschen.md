---
fileClass: GeneralTest
testCaseId: ATC084
testTags:
componente:
  - Coordinator
view: /System-bearbeiten/Coordinator
vorbedingung: System wurde erstellt
---

| Referenz                  | Ausgangspunkt                                                 | Vorgang                                                     | Erwartetes Verhalten                                                                                                            |
| :------------------------ | :------------------------------------------------------------ | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | /System-bearbeiten<br><br>                                    | Geräte-Info-Icon auf Coordinator-Card; [Löschen]; [Abbruch] | Vorgang abgebrochen                                                                                                             |
| **`= this.testCaseId`**.2 | /System-bearbeiten<br><br><br><br>                            | Geräte-Info-Icon auf Coordinator-Card; [Löschen]; [Löschen] | Mit dem System-Coordinator wird das gesamte Smart-System gelöscht; <br><br>Alle Geräte des Systems setzen sich zurück (Zigbee)  |
| **`= this.testCaseId`**.3 | /System-bearbeiten; Coordinator ausgeschaltet<br><br><br><br> | Geräte-Info-Icon auf Coordinator-Card; [Löschen]; [Löschen] | Warnhinweis, dass Coordinator nicht gefunden werden konnte; Coo. Wird aus App gelöscht aber phy. Gerät nicht zurück gesetzt<br> |





