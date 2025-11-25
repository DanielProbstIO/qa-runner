---
fileClass: GeneralTest
testCaseId: ATC041
testTags:
componente:
  - Smart Tower
view: Systemeinstellungen/Smart-Tower
vorbedingung: Smart Tower wurde dem System hinzugefügt, min. eine Leuchte wurde der App hinzugefügt
---
| Referenz                  | Ausgangspunkt                   | Vorgang                                     | Erwartetes Verhalten                                         |
| :------------------------ | :------------------------------ | :------------------------------------------ | :----------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Tower | Dreipunkt-Menü auf Gerät; [Geräteinfo];<br> | Geräteinfo wird (mit ggf. aktualisierten namen) eingeblendet |
