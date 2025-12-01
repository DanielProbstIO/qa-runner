---
fileClass: GeneralTest
testCaseId: PI008
testTags:
  - PIR Motion Sensor
  - Product Integration
componente:
view:
vorbedingung: |-
  Gerät ist in einem System als Koordinator oder Router. 
  Gerät hat einen Sensor Endpunkt, mit PIR Bewegungssensor Funktionalität.
  Die Sensor Einstellungen wurden seit mindestens einer Minute nicht aufgerufen.
  Verbinde Handy mit Logger.
---

| Referenz                  | Ausgangspunkt                  | Vorgang                       | Erwartetes Verhalten                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------ | :----------------------------- | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengärteübersicht           | -                             | Das Sensor Gerät erscheint in der Liste, der Zustand des Bewegungssensor wird angezeigt                                                                                                                                                                                                                                                                                                                                             |
| **`= this.testCaseId`**.2 | Bediengärteübersicht           | Wähle den Sensor Endpunkt aus | Sensor Detail Ansicht wird angezeigt.<br><br>Unter Sensor ist der Bewegungssensor zu sehen mit seinem Aktuellen Zustand.<br>Wenn er eingeschaltet ist, wird auch die aktuellen Empfindlichkeit und Nachlaufzeit angezeigt.<br><br>Folgende Befehle zum abrufen der aktuellen Einstellungen erscheinen im Logger:<br>ATS:{NODEID},AT+MLSVIEW<br>AT+READMATR:0000,03,0,1105,FCDE,0004<br>AT+READMATR:0000,03,0,1105,FCDE,0002<br><br> |
| **`= this.testCaseId`**.3 | Sensor Detail Ansicht          | Wähle den Bewegungssensor aus | Die Bewegungssensor Detailansicht öffnet sich.<br>Der User hat die Möglichkeit den sensor zu aktivieren/deaktivieren, die Bewegungsempfindlichkeit und die Nachlaufzeit zu ändern.                                                                                                                                                                                                                                                  |
| **`= this.testCaseId`**.4 | Bewegungssensor Detailansicht  | Einstellungen ändern          | Es werden keine Fehler Meldungen angezeigt                                                                                                                                                                                                                                                                                                                                                                                          |
