---
fileClass: GeneralTest
testCaseId: PI101
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                      | Erwartetes Verhalten                                                                                   |
| :------------------------ | :--------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle den OnOff Only Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Der Endpunkt kann ausschließlich An/Aus gemacht werden.<br> |
| **`= this.testCaseId`**.2 |                  | Wiederholen für alle OnOff Only Luminare/Relay/Broadcast Endpunkte           |                                                                                                        |

