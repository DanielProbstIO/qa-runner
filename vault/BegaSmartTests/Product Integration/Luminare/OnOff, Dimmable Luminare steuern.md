---
fileClass: GeneralTest
testCaseId: PI102
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Gerät hat mindestens einen Luminare/Relay Endpunkt.
  Entnehme den Anforderungen welcher Endpunkt welche Funktionen hat.
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt    | Vorgang                                                                           | Erwartetes Verhalten                                                                                 |
| :------------------------ | :--------------- | :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Steuer Übersicht | Wähle den OnOff, Dimmable Luminare/Relay/Broadcast Endpunkt vom neuen Produkt aus | Die Endpunkt Bedienansicht öffnet sich.<br>Der Endpunkt kann An/Aus gemacht und gedimmed werden.<br> |
| **`= this.testCaseId`**.2 |                  | Wiederholen für alle OnOff, Dimmable  Luminare/Relay/Broadcast Endpunkte          |                                                                                                      |

