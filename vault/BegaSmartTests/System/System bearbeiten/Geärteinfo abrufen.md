---
fileClass: GeneralTest
testCaseId: ATC081
testTags:
componente:
  - Geräte
view: /Einstellungen/System/System bearbeiten
vorbedingung: System wurde erstellt, weiteres BLE-Gerät hinzugefügt
---

| Referenz                  | Ausgangspunkt                                                                 | Vorgang                                      | Erwartetes Verhalten                                             |
| :------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------- | :--------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | /System-bearbeiten                                                            | [Geräte Informationen] in Geräte-Card wählen | Passende Geräteinformationen werden angezeigt; FW-Version stimmt |
| **`= this.testCaseId`**.2 | /Geräteinformationen<br><br>                                                  | [Produkt-Webseite]                           | Produkt Webseite wird aufgerufen                                 |
| **`= this.testCaseId`**.3 | /System-bearbeiten; Gerät inaktiv; <br><br>Mind. ein BLE-Gerät aktiv;<br><br> | [Geräte Informationen] in Geräte-Card wählen | Passende Geräteinformationen werden angezeigt; FW-Version stimmt |
| **`= this.testCaseId`**.4 | /System-bearbeiten; Coordinator inaktiv; <br><br>Mind. ein BLE-Gerät aktiv;   | [Geräte Informationen] in Geräte-Card wählen | Passende Geräteinformationen werden angezeigt; FW-Version stimmt |



