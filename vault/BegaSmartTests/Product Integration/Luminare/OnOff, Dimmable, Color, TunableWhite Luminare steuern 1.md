---
fileClass: GeneralTest
testCaseId: PI104
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                                            | Erwartetes Verhalten                                                                                                                                                                                                                                                                                         |
| :------------------------ | :--------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle OnOff, Dimmable, Color, TunableWhite Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Es sind zwei Tabs verfügbar.<br>Auf einem kann der Endpunkt An/Aus gemacht, gedimmed werden und es kann eine Farbe ausgewählt werden.<br>Auf dem anderen kann der Endpunkt An/Aus gemacht, gedimmed werden und es kann eine Farbtemperatur ausgewählt werden.<br> |
| **`= this.testCaseId`**.2 | Bedienansicht    | Wähle ein Farbe aus falls möglich                                                                  | Folgendes sollte im Logger zu sehen sein.<br>AT+CCMVTOHUS:...                                                                                                                                                                                                                                                |
| **`= this.testCaseId`**.3 |                  | Wiederholen für alle OnOff, Dimmable, Color, TunableWhite Luminare/Relay/Broadcast Endpunkte       |                                                                                                                                                                                                                                                                                                              |

