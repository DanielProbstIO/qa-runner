---
fileClass: GeneralTest
testCaseId: PBM05
testTags:
componente: [PBM]
view: Input-Konfig-Screen/Category-Selection
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; Basic Setup abgeschlossen; Gruppe als Kategorie gewählt
---


| Referenz                  | Ausgangspunkt                 | Vorgang                                              | Erwartetes Verhalten |
| :------------------------ | :---------------------------- | :--------------------------------------------------- | :------------------- |
| **`= this.testCaseId`**.1 | Gruppen-Dropdown-Menu         | Gruppe(n) auswählen; [Abbruch] wählen                | Nicht definiert in Figma |
| **`= this.testCaseId`**.2 | Gruppen-Dropdown-Menu         | Keine Gruppe ausgewählt                              | Alle im System bekannten Gruppen sind gelistet; [Weiter]-Button ausgeblendet und nicht wählbar |
| **`= this.testCaseId`**.3 | Gruppen-Dropdown-Menu         | Max. eine Gruppe auswählen; [Weiter] wählen          | Name der Gruppe wird im Textfeld des Dropdowns angezeigt; Navigation zu Select-Action-Screen (Select-Action in eigenem Test-Case) |
| **`= this.testCaseId`**.4 | Gruppen-Dropdown-Menu         | Mehr als eine Gruppe auswählen; [Weiter] wählen      | Ausgewählte Gruppen werden zu einer neuen Gruppe zusammengelegt; Modal informiert über Zusammenlegung; Navigation zu Group-Merging-Screen |
| **`= this.testCaseId`**.5 | Group-Merging-Modal           | [Don’t show again] wählen                            | Group-Merging-Modal wird nicht erneut angezeigt |
| **`= this.testCaseId`**.6 | Group-Merging-Modal           | [Schließen] wählen                                   | Nicht definiert in Figma |
| **`= this.testCaseId`**.7 | Group-Merging-Screen; erstes Icon ist pre-selected | Gruppen-Icon für neu erstellte Gruppe auswählen; [Abbruch] | Nicht definiert in Figma |
| **`= this.testCaseId`**.8 | Group-Merging-Screen          | Gruppenname anpassen                                 | Name wird gesetzt |
| **`= this.testCaseId`**.9 | Group-Merging-Screen          | Gruppen-Icon für neu erstellte Gruppe auswählen      | Gewähltes Icon markiert |
| **`= this.testCaseId`**.10 | Group-Merging-Screen          | [Gruppe erstellen] wählen                            | Navigation zu Define-Action-Screen (Select-Action in eigenem Test-Case) |
| **`= this.testCaseId`**.11 | Konfig-Wizard-Teil-II-View; zusammengelegte Gruppe erstellt | [Abbruch] wählen                                     | Wenn eine neue Gruppe erstellt wurde, muss diese auch bei Abbruch der Konfiguration im System gelistet werden |
