---
fileClass: GeneralTest
testCaseId: PBM07
testTags:
componente: [PBM]
view: Input-Konfig-Screen
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; Basic Setup abgeschlossen; Szenen als Kategorie gewählt
---

Haben Szenen ihren eignen Action Flow: Szenen haben einen eigenen Select-Action Flow, der auch nochmal zwischen Push-Btn und Switch aufgrund der Eingaben Schnittstellen anders ist

Szenen lassen im Dropdown nur Einzelauswahl zu. Es ist nicht möglich mehrere Szenen auszuwählen, wie zB bei Gruppen.

---

| Referenz                  | Ausgangspunkt           | Vorgang                                 | Erwartetes Verhalten |
| :------------------------ | :---------------------- | :-------------------------------------- | :------------------- |
| **`= this.testCaseId`**.1 | Szene Dropdown Menu     | Keine Szene ausgewählt                  | Alle im System bekannten Szenen sind gelistet; [Weiter]-Button ausgeblendet |
| **`= this.testCaseId`**.2 | Szene Dropdown Menu; Keine Szene ausgewählt     | Szene auswählen                         | Szenenname wird im Textfeld angezeigt |
| **`= this.testCaseId`**.3 | Szene ausgewählt        | Abbruch                                 | Nicht definiert |
| **`= this.testCaseId`**.4 | Szene ausgewählt        | [Weiter] wählen                         | Navigation zu Select-Action-View |
