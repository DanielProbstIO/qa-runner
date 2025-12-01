---
fileClass: GeneralTest
testCaseId: PI107
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  In der Firmware sind Farbtemperaturen hinterlegt.
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                                        | Erwartetes Verhalten                                                                                                                                    |
| :------------------------ | :--------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle OnOff, Dimmable, SwitchableWhite Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Der Endpunkt kann An/Aus gemacht, gedimmed werden und es können zwei Farbtemperaturen ausgewählt werden.<br> |
| **`= this.testCaseId`**.2 |                  | Wiederholen für alle OnOff, Dimmable, SwitchableWhite Luminare/Relay/Broadcast Endpunkte       |                                                                                                                                                         |

