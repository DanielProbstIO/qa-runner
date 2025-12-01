---
fileClass: GeneralTest
testCaseId: PI003
testTags:
  - Product Integration
componente:
view:
vorbedingung: |-
  Produkt kann Router sein.
  Device ist Aktuell nicht Konfiguriert
  Kreiere QR Code mit einer Spezifischen Artikelnummer. Notiere Namen und Bild aus den Anforderungen. 
  Verbinde Handy mit Logger.
---
| Referenz                  | Ausgangspunkt               | Vorgang                          | Erwartetes Verhalten                                                                                                                                                                                                                                                                                                                       |
| :------------------------ | :-------------------------- | :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Scan QR Code zum hinzufügen | Scan QR Code                     | UI Zeigt Dialog zum Namen Vergeben<br>- Icon Is Korrekt für die Artikelnummer<br>- Produktname ist Korrekt für die Artikelnummer<br>- Der vorausgefüllte name entspricht der folgenden Regel:<br>   Wenn der Produktname 27 zeichen oder mehr sind, werden die ersten 24 zeichen mit "... (01)" angezeight. Ansonsten "{Produktname} (01)" |
| **`= this.testCaseId`**.2 | Dialog zur Namensvergabe    | Name Wählen und Ok drücken       | IJOIN Screen wird angezeigt.<br><br>Logging zeigt das folgende Commandos geschickt wurden:<br>- AT+IJOIN:...<br>- AT+STOPJOIN<br>- AT+READCATR:{NodeID},{Endpoint},0,0019,0002                                                                                                                                                             |
| **`= this.testCaseId`**.3 | IJOIN Screen                | Warten bis gerät hinzugefügt ist | Die Steuern Übersicht wird angezeigt. <br>Falls das neue gerät steuerbar ist wird es in der Liste mit dem gewählten Namen und dem Artikel spezifischen Bild angezeigt.                                                                                                                                                                     |
| **`= this.testCaseId`**.4 | Steuer ansicht              | Navigiere zu System bearbeiten   | Das Gerät wird mit dem gewählten Namen und dem Artikel spezifischen Bild angezeigt in der Liste angezeigt.<br>Falls es mehrere Endpunkte gibt, bestehen ihre Namen aus dem Geräte namen + " - {Endpunktname}"                                                                                                                              |
|                           |                             |                                  |                                                                                                                                                                                                                                                                                                                                            |
