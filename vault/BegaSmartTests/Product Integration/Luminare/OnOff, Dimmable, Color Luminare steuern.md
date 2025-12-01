---
fileClass: GeneralTest
testCaseId: PI103
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                              | Erwartetes Verhalten                                                                                                                       |
| :------------------------ | :--------------- | :----------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle OnOff, Dimmable, Color Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Der Endpunkt kann An/Aus gemacht, gedimmed werden und es kann eine Farbe ausgewählt werden.<br> |
| **`= this.testCaseId`**.2 | Bedienansicht    | Wähle ein Farbe aus falls möglich                                                    | Folgendes sollte im Logger zu sehen sein.<br>AT+CCMVTOHUS:...                                                                              |
| **`= this.testCaseId`**.3 |                  | Wiederholen für alle OnOff, Dimmable, Color Luminare/Relay/Broadcast Endpunkte       |                                                                                                                                            |

