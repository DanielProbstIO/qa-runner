---
fileClass: GeneralTest
testCaseId: ATC053
testTags:
componente:
  - Geräte
view: Einstellungen/system/Zigbee-Geräte finden
vorbedingung: System wurde eingerichtet
comment: "Prüfen/Klären: was passiert, wenn Geräte gefunden wurden und der Suchvorgang wiederholt wird? Werden dann die gefundenen Geräte gelöscht?  Ab welchem Zeitpunkt sind die Geräte Teil des Systems?"
---
| Referenz                   | Ausgangspunkt                                                                | Vorgang                                                | Erwartetes Verhalten                                                                                                               |
| :------------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1  | Geräte-Finden-View                                                           | [Start]                                                | Gerätesuche wird gestartet: AT+PJOIN:2D; 60s-Timer läuft ab                                                                        |
| **`= this.testCaseId`**.2  | Suche gestartet, Timer noch nicht abgelaufen und noch keine Geräte gefunden  | Suche manuell abzubrechen                              | Suche wird abgebrochen: AT+STOPJOIN                                                                                                |
| **`= this.testCaseId`**.3  | Suche gestartet, Timer noch nicht abgelaufen und min. ein Gerät gefunden     | Suche manuell abzubrechen                              | Manueller Abbruch für 5sec blockiert, danach AT+STOPJOIN; Gefundenes Gerät wird in der Übersicht angezeigt                         |
| **`= this.testCaseId`**.4  | Suche gestartet, Timer abgelaufen und kein Gerät gefunden                    | [Wiederholen]                                          | Suchvorhang wird wiederholt; ATC053.1                                                                                              |
| **`= this.testCaseId`**.5  | Suche gestartet, Timer abgelaufen und min. ein Gerät gefunden                | -                                                      | Info-Notifikation wird eingeblendet, wie Geräte entfernt werden können, die nicht hinzugefügt werden sollen                        |
| **`= this.testCaseId`**.6  | Suche gestartet, Timer noch nicht abgelaufen und min. ein Gerät gefunden     | [Wiederholen]                                          | PRÜFEN                                                                                                                             |
| **`= this.testCaseId`**.7  | Suche gestartet, Timer noch nicht abgelaufen und min. ein Gerät gefunden     | Gerät entfernen durch nach linksziehen der Geräte-Card | Ausgewähltes Gerät wird entfernt                                                                                                   |
| **`= this.testCaseId`**.8  | Smart-gerät gefunden, dass nicht über PJoin provisioniert werden kann        | -                                                      | Fehlermeldung, Gerät wird automatisch gelöscht?                                                                                    |
| **`= this.testCaseId`**.9  | ATC053.5, gefundene Geräte haben min. ein Endpunkt mit passender ProfileID`s |                                                        | Endpunkte werden in der Geräte - Ansicht als einzelne Geräte angezeigt                                                             |
| **`= this.testCaseId`**.10 | ATC053.5 und mind. ein Endpunkt antwortet nicht oder fehlerhaft              |                                                        | Betroffene Geräte werden als Unbekannte Geräte hinzugefügt, können aber nicht gesteuert werden                                     |
| **`= this.testCaseId`**.11 | Endzustand von ATC053.10                                                     | [Gerät Identifizieren]                                 | Endpunktinfos werden erneut abgefragt                                                                                              |
| **`= this.testCaseId`**.12 | ATC053.5 und gefundene Geräte haben keinen Endpunkt mit passender ProfileID  |                                                        | Gerät wird als Unbekanntes Gerät angezeigt                                                                                         |
| **`= this.testCaseId`**.13 | Alle gesuchten Geräte gefunden, und nicht erwünschten entfernt               | [Speichern]                                            | Erkannte Endpunkte werden als Geräte in der Übersicht angezeigt und lassen sich steuern im Rahmen der unterstützten Funktionalität |

