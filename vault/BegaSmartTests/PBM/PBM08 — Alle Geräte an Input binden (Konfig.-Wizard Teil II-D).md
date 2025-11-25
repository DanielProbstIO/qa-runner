---
fileClass: GeneralTest
testCaseId: PBM08
testTags:
componente: [PBM]
view: Input-Konfig-Screen
vorbedingung: PBM wurde dem System hinzugefügt; mind. ein Leuchtmittel im System; Basic Setup abgeschlossen; Alle-Geräte als Kategorie gewählt
---

| Referenz                  | Ausgangspunkt            | Vorgang                                      | Erwartetes Verhalten |
| :------------------------ | :----------------------- | :------------------------------------------- | :------------------- |
| **`= this.testCaseId`**.1 | Noch keine Kategorie gewählt | [Alle-Geräte] Kategorie wählen; [Weiter] | Navigation zu Select-Action-Screen |
