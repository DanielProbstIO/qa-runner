---
fileClass: GeneralTest
testCaseId: PI108
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                                     | Erwartetes Verhalten                                                                                                                                |
| :------------------------ | :--------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle OnOff, Dimmable, TunableWhite Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Der Endpunkt kann An/Aus gemacht, gedimmed werden und es kann eine Farbtemperatur ausgewählt werden.<br> |
| **`= this.testCaseId`**.2 |                  | Wiederholen für alle OnOff, Dimmable, TunableWhite Luminare/Relay/Broadcast Endpunkte       |                                                                                                                                                     |

