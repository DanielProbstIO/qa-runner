---
fileClass: GeneralTest
testCaseId: PI006
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Gerät hat mindestens einen Luminare/Relay Endpunkt.
---
| Referenz                  | Ausgangspunkt     | Vorgang                                                  | Erwartetes Verhalten                                                     |
| :------------------------ | :---------------- | :------------------------------------------------------- | :----------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Gruppen übersicht | Erstelle eine Gruppe mit allen Luminare/Relay Endpunkten | Alle Luminare/Relay Endpunkte sind sind in der Gruppen auswahl verfügbar |


