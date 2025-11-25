---
testid: "005"
tags:
---

## Beleuchtung bei bestimmter Umgebungshelligkeit


| Test Case ID        | ATC`= this.testid`                                                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Komponente          | Device mit Lichtsensor                                                                                                                                          |
| View /  Entry Point | Bediengeräte/Geräte Konfigurieren/Szene auswählen\|                                                                                                             |
| Vorbedingung        | System mit mindestens einem Lichtsensor hinzugefügt und Lichtsensor ist aktiv ([[Lichtsensor aktivieren_deaktivieren]] und [[Lichtsensor Schwelle einstellen]]) |

| Referenz             | Ausgangspunkt                                                                                | Vorgang                                            | Erwartetes Verhalten                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ATC`= this.testid`.1 | View: Bediengeräte/SLL\|HF<br><br>Lichtsensor ist aktiviert  <br>**keine** Szenen hinterlegt | [Gerät konfigurieren] auswählen<br>                | Navigation zur Szenen-auswählen-View<br><br>Option zum Erstellen einer Szene                                                                                                           |
| ATC`= this.testid`.2 | Szene Erstellen                                                                              | [Erstellen]                                        | ATC066                                                                                                                                                                                 |
| ATC`= this.testid`.3 | View: Bediengeräte/SSL\|HF<br><br>Lichtsensor ist aktiviert<br><br>Szenen hinterlegt         | [Gerät konfigurieren] auswählen<br>                | Navigation zur Szenen-auswählen-View<br><br>Hinterlegte Szenen werden angezeigt<br>                                                                                                    |
| ATC`= this.testid`.4 | Szenen-Auswählen-View                                                                        | Aus angezeigten Szenen auswählen und [Speichern]   | Navigation zurück zu Bediengeräte/SSL\|HF-View.  <br>Einstellungen wurden übernommen. (Persistiert?)<br><br>Unter [Geräte Konfigurieren] wird angezeigt, dass eine Szene gewählt wurde |
| ATC`= this.testid`.5 | Szenen-Auswählen-View                                                                        | Aus angezeigten Szenen auswählen und  <br>[zurück] | Navigation zurück zu Bediengeräte/SSL\|HF-View.  <br>Einstellungen werden verworfen                                                                                                    |


