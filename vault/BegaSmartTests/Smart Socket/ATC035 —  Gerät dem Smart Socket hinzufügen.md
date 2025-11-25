---
fileClass: GeneralTest
testCaseId: ATC035
testTags:
componente:
  - Smart Socket
view: Systemeinstellungen/Smart-Socket
vorbedingung: Smart Socket wurde dem System hinzugefügt
---
Am Smart Socket angeschlossene Geräte können nicht gedimmt werden, es kann auch keine Farbeinstellung vorgenommen werden. Geräte können nur ein und ausgeschaltet werden
- ---

| Referenz                  | Ausgangspunkt                    | Vorgang                                                            | Erwartetes Verhalten            |
| :------------------------ | :------------------------------- | :----------------------------------------------------------------- | :------------------------------ |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Socket | [Gerät Verbinden], Name vergeben,  Icon auswählen, <br>[Abbruch]   | Einstellungen werden verworfen  |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1        | [Gerät Verbinden], Name vergeben, kein Icon auswählen, [Speichern] | Speichern nicht möglich         |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1        | [Gerät Verbinden], Name vergeben, Icon auswählen,<br>[Speichern]   | Einstellungen werden übernommen |
