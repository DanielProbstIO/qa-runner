---
fileClass: GeneralTest
testCaseId: PI007
testTags:
  - Luminare
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Gerät hat mindestens einen Luminare/Relay Endpunkt.
  Alle Luminare/Relay Endpunkt sind in einer Gruppe.
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt      | Vorgang                                                    | Erwartetes Verhalten                                                                                                                                                                             |
| :------------------------ | :----------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Szenen Übersicht   | Erstelle eine Szene mit allen Luminare/Relay Endpunkten    | Alle Luminare/Relay Endpunkte sind sind in der Szenen auswahl verfügbar                                                                                                                          |
| **`= this.testCaseId`**.2 | Szenen Einstellung | Richte einen Szenen Configuration für die Ganze Szene ein. | Für jeden Endpunkt in der Liste ist folgendes im Logger zu sehen:<br>Falls der Endpunkt Scene Add unterstüzt:<br>AT+SCADD:...<br>Fals der Endpunktm kein Scene Add unterstüzt:<br>AT+SCSTORE:... |


