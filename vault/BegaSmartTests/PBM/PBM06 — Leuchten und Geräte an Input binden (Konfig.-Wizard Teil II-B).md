---
fileClass: GeneralTest
testCaseId: PBM06
testTags:
componente: [PBM]
view: Input-Konfig-Screen
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; Basic Setup abgeschlossen; Leuchten und Geräte als Kategorie gewählt
---


| Referenz                  | Ausgangspunkt                     | Vorgang                                                | Erwartetes Verhalten |
| :------------------------ | :-------------------------------- | :----------------------------------------------------- | :------------------- |
| **`= this.testCaseId`**.1 | Leuchten-und-Geräte Dropdown Menu | Keine Leuchte oder Gerät ausgewählt                    | Im Dropdown werden nur kompatible Geräte angezeigt (keine Bediengeräte); [Weiter]-Button ausgeblendet und lässt sich nicht wählen |
| **`= this.testCaseId`**.2 | Leuchten-und-Geräte Dropdown Menu | Leuchte(n) und Gerät(e) ausgewählt; [Abbruch] wählen   | Nicht definiert |
| **`= this.testCaseId`**.3 | Leuchten-und-Geräte Dropdown Menu | Max. eine Leuchte oder Gerät wählen; [Weiter] wählen   | Name der Leuchte wird im Textfeld des Dropdowns angezeigt; Navigation zu Select-Action-View |
| **`= this.testCaseId`**.4 | Leuchten-und-Geräte Dropdown Menu | Mehr als eine Leuchte oder Gerät wählen; [Weiter] wählen | Anzahl der ausgewählten Devices steht im Textfeld des Dropdowns; ausgewählte Devices werden zu neuer Gruppe zusammengeführt; Modal informiert über Zusammenführung; Navigation zu Gruppe-Erstellen-Screen |
| **`= this.testCaseId`**.5 | Group-Merging-Modal               | [Don’t show again] wählen                              | Group-Merging-Modal wird nicht erneut angezeigt |
| **`= this.testCaseId`**.6 | Group-Merging-Modal               | [Schließen] wählen                                     | Nicht definiert in Figma |
| **`= this.testCaseId`**.7 | Gruppe-Erstellen-Screen; erstes Icon ist pre-selected | Gruppen-Icon für neu erstellte Gruppe auswählen; [Abbruch] wählen | Nicht definiert in Figma |
| **`= this.testCaseId`**.8 | Gruppe-Erstellen-Screen           | Gruppenname anpassen                                  | Gruppenname wird gesetzt, wenn er nicht gegen definierte Restriktionen verstößt |
| **`= this.testCaseId`**.9 | Gruppe-Erstellen-Screen           | Icon wählen; [Gruppe erstellen] wählen                 | Navigation zu Select-Action-Screen (eigener Test-Case) |
