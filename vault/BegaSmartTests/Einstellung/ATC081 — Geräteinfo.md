---
fileClass: GeneralTest
testCaseId: ATC081
testTags:
componente:
view: Einstellungen/<System>/System-bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---
| Referenz                  | Ausgangspunkt                                                        | Vorgang                                                      | Erwartetes Verhalten                                             |
| :------------------------ | :------------------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | System-bearbeiten                                                    | 3 Punkte Menü auf einem Gerät drücken, [Geräteinformationen] | Passende Geräteinformationen werden angezeigt, FW-Version stimmt |
| **`= this.testCaseId`**.2 | Geräteinformationen                                                  | [Produkt-Webseite]                                           | Produkt Webseite wird aufgerufen                                 |
| **`= this.testCaseId`**.3 | System-bearbeiten, Gerät inaktiv, Mind. ein BLE-Gerät aktiv          | **`= this.testCaseId`**.1                                    | **`= this.testCaseId`**.1                                        |
| **`= this.testCaseId`**.4 | System-bearbeiten, Coordinator inaktiv,<br>Mind. ein BLE-Gerät aktiv | **`= this.testCaseId`**.1                                    | **`= this.testCaseId`**.1                                        |
