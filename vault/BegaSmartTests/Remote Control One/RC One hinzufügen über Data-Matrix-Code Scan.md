---
testid: "014"
tags:
---

## Remote Control One hinzufügen über Data-Matrix-Code Scan


| Test Case ID        | ATC`= this.testid`                                                    |
| ------------------- | --------------------------------------------------------------------- |
| Komponente          | RC One                                                                |
| View /  Entry Point | Gerät hinzufügen                                                      |
| Vorbedingung        | Ein System wurde bereits erstellt. Die RC kann nicht Coordinator sein |

| Referenz             | Ausgangspunkt                                                                       | Vorgang                                                   | Erwartetes Verhalten                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ATC`= this.testid`.1 | Beim Erstellen des Systems RC hinzufügen oder nachträglich;  Geräte-Hinzufügen-View | RC One aus Liste in Geräte-Hinzufügen-View auswählen      | Nav. zu Gerät-verbinden-View; Info-Card wie RC One eingebunden werden kann                             |
| ATC`= this.testid`.2 | Gerät-verbinden-View                                                                | Data-Matrix-Code eines anderen BEGA Smart Gerätes Scannen | Fehlermeldung                                                                                          |
| ATC`= this.testid`.3 | Gerät-verbinden-View                                                                | Data-Matrix-Code des falschen Gerätes Scannen             | Fehlermeldung                                                                                          |
| ATC`= this.testid`.4 | Gerät-verbinden-View                                                                | DataMatrix-Code scannen                                   | Card wo der Name des Devices gesetzt werden kann                                                       |
| ATC`= this.testid`.5 | Gerätename-Card                                                                     | Eindeutigen Device Namen vergeben und [Abbrechen]         | Nav. zurück zu Geräte-Hinzufügen-View                                                                  |
| ATC`= this.testid`.6 | Gerät-verbinden-View                                                                | Eindeutigen Device Namen vergeben und [Speichern]         | ZigBee-Geräte-finden-View; <br><br>60s-Timer zum Abrufen der RC Geräte Infos startet                   |
|                      | Time abgelaufen; Gerät nicht gefunden                                               | -                                                         | Notifikation, Gerät konnte nicht hinzugefügt worden;                                                   |
|                      | Time abgelaufen; Geräteinfos unvollständig                                          | -                                                         | RC wird als Unidentifiziertes Gerät in System-Bearbeiten-View angezeigt                                |
| ATC`= this.testid`.7 | Timer nicht abgelaufen und RC wird erfolgreich ins Netzwerk integriert              | -                                                         | Nav zu System-bearbeiten-View. Dort wird der System Coordinator angezeigt und die RC als Fernbedienung |
| ATC`= this.testid`.8 | System-bearbeiten-View                                                              | [<] oder [Fertig]                                         | Das System wird um die Hinzugefügten Devices erweitert und kann jetzt konfiguriert und bedient werden  |

