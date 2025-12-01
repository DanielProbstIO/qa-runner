---
fileClass: GeneralTest
testCaseId: PI010
testTags:
  - Light Sensor
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Gerät hat einen Sensor Endpunkt, mit Lichtsensor Funktionalität.
  Die Sensor Einstellungen wurden seit mindestens einer Minute nicht aufgerufen.
  Verbinde Handy mit Logger.
---

| Referenz                  | Ausgangspunkt             | Vorgang                       | Erwartetes Verhalten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------ | :------------------------ | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengärteübersicht      | -                             | Das Sensor Gerät erscheint in der Liste, der Zustand des Bewegungssensor wird angezeigt                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`= this.testCaseId`**.2 | Bediengärteübersicht      | Wähle den Sensor Endpunkt aus | Sensor Detail Ansicht wird angezeigt.<br><br>Unter Sensor ist der Lichtsensor zu sehen mit seinem Aktuellen Zustand.<br>Wenn er eingeschaltet ist ist die aktuelle Lichtschwelle in LUX zu sehen<br><br>Folgende Befehle zum abrufen der aktuellen Einstellungen erscheinen im Logger:<br>ATS:{NODEID},AT+MLSVIEW<br>AT+READMATR:0000,03,0,1105,FCDE,0007<br>AT+READMATR:0000,03,0,1105,FCDE,0008<br>AT+READMATR:0000,03,0,1105,FCDE,0009<br>AT+READMATR:0000,03,0,1105,FCDE,0016<br>AT+READMATR:0000,03,0,1105,FCDE,0011<br> |
| **`= this.testCaseId`**.3 | Sensor Detail Ansicht     | Wähle den Lichtsensor aus     | Die Lichtsensor Detailansicht öffnet sich.<br>Der User folgende Optionen:<br>Den Sensor zu aktivieren/deaktivieren.<br>Die Schwelle einszustellen.<br>Das Umgebungslicht zu messen.<br>Den TestModus zu aktiviere.                                                                                                                                                                                                                                                                                                            |
| **`= this.testCaseId`**.4 | Lichtsensor Detailansicht | Einstellungen ändern          | Es werden keine Fehler Meldungen angezeigt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
