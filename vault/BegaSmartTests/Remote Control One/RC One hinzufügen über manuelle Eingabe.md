---
testid: "015"
tags:
---

## Remote Control One hinzufügen über manuelle Eingabe


| Test Case ID        | ATC`= this.testid`                                           |
| ------------------- | ------------------------------------------------------------ |
| Komponente          | RC One                                                       |
| View /  Entry Point | Gerät hinzufügen                                             |
| Vorbedingung        | RC in bestehendes System über die manuelle Eingabe einbinden |

| Referenz              | Ausgangspunkt                                                                       | Vorgang                                                            | Erwartetes Verhalten                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1  | Beim Erstellen des Systems RC hinzufügen oder nachträglich;  Geräte-Hinzufügen-View | RC One aus Liste in Geräte-Hinzufügen-View auswählen               | Nav. zu Gerät-verbinden-View; Info-Card wie RC One eingebunden werden kann                                           |
| ATC`= this.testid`.2  | Gerät-verbinden-View                                                                | [< Back]                                                           | Geräte-Hinzufügen-View                                                                                               |
| ATC`= this.testid`.3  | Geräte-Hinzufügen-View                                                              | [Code eingeben]                                                    | Card wo Artikelnummer der RC eingegeben werden kann                                                                  |
| ATC`= this.testid`.4  | Gerät-verbinden-View/Card mit Artikelnummer                                         | Artikelnummer eines anderen Smart Gerätes eingeben                 | Toast: falsches Gerät                                                                                                |
| ATC`= this.testid`.5  | Gerät-verbinden-View/Card mit Artikelnummer                                         | Falsche Artikelnummer eingeben                                     | Toast: Gerät nicht gefunden                                                                                          |
| ATC`= this.testid`.6  | Gerät-verbinden-View/Card mit Artikelnummer                                         | Artikelnummer des RC eingeben; <br><br>[Weiter] / [Verbinden]      | RC wird erkannt, Card zum Eingeben weiterer Informationen wird eingeblendet<br><br>                                  |
| ATC`= this.testid`.7  | Card für weitere RC-Informationen (ZigBee MAC und ZigBee install Code)              | Falsche MAC oder  Falscher install Code                            | Eingabe wird nicht akzeptiert; [Weiter] Button kann nicht gewählt werden                                             |
| ATC`= this.testid`.8  | Card für weitere RC-Informationen (ZigBee MAC und ZigBee install Code)              | Optionale Eingabe machen; [Zurück]                                 | Nav zurück zum Anfang der Gerät-Verbinden-View, ggf. gemachte eingaben werden verworfen                              |
| ATC`= this.testid`.9  | Card für weitere RC-Informationen (ZigBee MAC und ZigBee install Code)              | Richtige MAC und Richtiger install Code; <br><br>[weiter] oder [✓] | ZigBee-Geräte-finden-View; <br><br>60s-Timer zum Abrufen der RC Geräte Infos (einbinden der RC ins Netzwerk) startet |
|                       | Time abgelaufen; Gerät nicht gefunden                                               |                                                                    | Notifikation, Gerät konnte nicht hinzugefügt worden;                                                                 |
|                       | Time abgelaufen; Geräteinfos unvollständig                                          |                                                                    | RC wird als Unidentifiziertes Gerät in System-Bearbeiten-View angezeigt                                              |
| ATC`= this.testid`.10 | Timer nicht abgelaufen und RC wird erfolgreich ins Netzwerk integriert              |                                                                    | Nav zu System-bearbeiten-View. Dort wird der System Coordinator angezeigt und die RC als Fernbedienung               |
| ATC`= this.testid`.11 | System-bearbeiten-View                                                              | [<] zurück oder [Fertig]                                           | Das System wird um die Hinzugefügten Devices erweitert und kann jetzt konfiguriert und bedient werden                |

