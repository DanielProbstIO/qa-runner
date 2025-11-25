---
fileClass: GeneralTest
testCaseId: ATC027
testTags:
componente:
  - SRD
view: System Einstellungen/SRD
vorbedingung: System wurde erstellt, SRD hinzugefügt
---
| Referenz                  | Ausgangspunkt                                                                        | Vorgang                                                                | Erwartetes Verhalten                                                |
| :------------------------ | :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | System Einstellungen                                                                 | Geräte-Info-Icon auf SRD-Card,[Gesten Wiederherstellen], [Abbruch]     | Vorgang abgebrochen                                                 |
| **`= this.testCaseId`**.2 | System Einstellungen                                                                 | Geräte-Info-Icon auf SRD-Card, [Gesten Wiederherstellen], [Bestätigen] | Gesten werden zurückgesetzt,<br>Phys. SRD verhält sich entsprechend |
| **`= this.testCaseId`**.3 | System Einstellungen, SRD ausgeschaltet, keine weiteren aktiven BLE-Geräte im System | **`= this.testCaseId`**.2                                              | System nicht mehr verbunden                                         |
| **`= this.testCaseId`**.4 | System Einstellungen, SRD **ausgeschaltet**, weitere aktiven BLE-Geräte im System    | **`= this.testCaseId`**.2                                              | Fehlermeldung, Gesten werden nicht zurückgesetzt                    |
