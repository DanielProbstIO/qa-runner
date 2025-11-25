---
fileClass: GeneralTest
testCaseId: ATC085
testTags:
componente:
  - Geräte
view: System-bearbeiten
vorbedingung: System wurde eingerichtet
comment: Abgesehen von der korrekten Eingabe bzw. des korrekten Scans, müssen die verschiedenen Zustände des hinzuzufügenden Geräts ebenfalls berücksichtigt werden. Der Nutzer wird innerhalb der App darauf hingewiesen, dass das Produkt eingeschaltet und zurückgesetzt werden muss. Allerdings kann das Zurücksetzen scheitern oder schlicht ignoriert werden.
---

| Referenz                  | Ausgangspunkt                                                   | Vorgang          | Erwartetes Verhalten                                                                                                                                                  |
| :------------------------ | :-------------------------------------------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Gerät zurückgesetzt                                             | Gerät hinzufügen | Erfolgreich hinzugefügt                                                                                                                                               |
| **`= this.testCaseId`**.2 | Gerät ausgeschaltet                                             | Gerät hinzufügen | Fehler: Gerät nicht erreichbar                                                                                                                                        |
| **`= this.testCaseId`**.3 | Gerät in unbekanntem System provisioniert (nicht zurückgesetzt) | Gerät hinzufügen | Fehler: Gerät nicht zurückgesetzt                                                                                                                                     |
| **`= this.testCaseId`**.4 | Gerät in bekanntem System provisioniert                         | Gerät hinzufügen | Fehler: Gerät bereits in anderem System (Hierbei ist es egal ob das Gerät zurückgesetzt wurde oder nicht. Die EUI48 wird mit bekannten Datenbankeinträgen verglichen) |
| **`= this.testCaseId`**.5 | Gerät bereits per BLE mit anderem mobilem Endgerät verbunden    | Gerät hinzufügen | Fehler: Gerät nicht erreichbar                                                                                                                                        |


