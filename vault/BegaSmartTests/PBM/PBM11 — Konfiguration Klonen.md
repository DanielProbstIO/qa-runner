---
fileClass: GeneralTest
testCaseId: PBM11
testTags:
componente: [PBM]
view: PBM-Übersicht-Screen
vorbedingung: Mind. ein Input auf dem Eltern PBM konfig; mind. ein weiters PBM wurde provisioniert
---

Soll nur eingeblendet werden, wenn das aktuelle PBM konfiguriert ist und sich mind. ein weiteres PBM im System befindet.

---

| Referenz | Ausgangspunkt | Vorgang | Erwartetes Verhalten |
| :-- | :-- | :-- | :-- |
| **`= this.testCaseId`**.1 | Vorbedingung nicht erfüllt |  | [Einstellungen klonen] wird nicht angezeigt |
| **`= this.testCaseId`**.2 | Modul-Übersicht-Screen | [Einstellungen Klonen] | Clone-Settings-Modal öffnet sich; in Modal werden alle provisionierten PBM gelistet |
| **`= this.testCaseId`**.3 | Clone-Settings-Modal; Keines der Zusätzlichen PBM wurde konfig.  | Ein oder mehrere PBM auswählen; [Anwenden] | Alle Konfigurationen werden vollständig auf alle ausgewählten PBM übertragen |
| **`= this.testCaseId`**.4 | Clone-Settings-Modal; mind. ein PBM wurde bereits konfig | Bereits konfig. PBM auswählen | Modal mit Hinweis, dass Einstellungen bei Fortfahren überschrieben, werden |
| **`= this.testCaseId`**.5 | Hinweis-Modal | [Abbruch] | Vorgang wird abgebrochen; |
| **`= this.testCaseId`**.6 | Hinweis-Modal | [Weiter] | Alle Konfigurationen werden vollständig auf alle ausgewählten PBM übertragen |
| **`= this.testCaseId`**.7 | Konfig auf Ziel-PBM übertragen | In PBM-Übersicht navigieren; PBM-Bedienen | Die Inputs des PBM entsprechen des Eltern-PBM; PBM verhält sich entsprechend der übertragene Konfig. |
