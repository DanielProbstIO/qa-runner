---
fileClass: GeneralTest
testCaseId: PBM10
testTags:
componente: [PBM]
view: Select-Action
vorbedingung: mind. ein Leuchtmittel im System; Basic Setup durchgeführt und eine der drei Kategorien Gruppe, Leuchten-und-Geräte oder Alle-Geräte gewählt
---


| Referenz | Ausgangspunkt | Vorgang | Erwartetes Verhalten |
| :-- | :-- | :-- | :-- |
| **`= this.testCaseId`**.1 | Banner mit konfig Empfehlung wird eingeblendet; üben den Select-Action Screen können die Aktionen für kurze, lange und doppelte Tastendrücke konfiguriert werden;  | Banner schließen | Banner wird bis zum erneuten Besuchen den Screens nicht mehr angezeigt |
| **`= this.testCaseId`**.2 |  | Action für kurzen Tastendruck bzw. AN (Switch) aus Dropdown wählen | Alle Auswahlmöglichkeiten werden im Dropdown präsentiert; getroffen Auswahl wird in Textfeld angezeigt |
| **`= this.testCaseId`**.3 |  | Action für langen Tastendruck bzw. AUS (Switch) aus Dropdown wählen | Alle Auswahlmöglichkeiten werden im Dropdown präsentiert; getroffen Auswahl wird in Textfeld angezeigt |
| **`= this.testCaseId`**.4 |  | Action für doppelten/ doppelt (switch) aus Dropdown wählen | Alle Auswahlmöglichkeiten werden im Dropdown präsentiert; getroffen Auswahl wird in Textfeld angezeigt |
| **`= this.testCaseId`**.5 |  | Actions Konfigurieren; [Cancel] | Nicht def. In Figma |
| **`= this.testCaseId`**.6 | Konfiguration abgeschlossen | [An Gerät senden] wählen | Bis zu diesem Zeitpunkt sind sämtliche Einstellungen nicht gespeichert und würden verloren gehen, wenn z.B. die App geschlossen wird; Übertragen der Konfig. an Modul; Die Übertragung war erfolgreich; Nav. zu PBM-Übersichts-Screen |
| **`= this.testCaseId`**.7 | Modul-Übersicht-Screen |  | Gemachte konfig. wird in Input-Card angezeigt; nach erfolgreicher Übertragung verhält sich das PBM entsprechend der Konfiguration; |
