---
fileClass: GeneralTest
testCaseId: ATC026
testTags:
componente:
  - SRD
view: Bediengeräte/SRD
vorbedingung: SRD im System eingebunden
---
| Referenz                  | Ausgangspunkt                | Vorgang                                                | Erwartetes Verhalten                                                                                   |
| :------------------------ | :--------------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengeräte/SRD             | [Konfigurieren der Geste]                              | Nav. zu Konfigurieren-der-Geste-View; hier sind alle Gesten aufgelistet                                |
| **`= this.testCaseId`**.2 | Konfigurieren-der-Geste-View | Geste und danach eine Aktion wählen, zurück navigieren | Konfig wird verworfen                                                                                  |
| **`= this.testCaseId`**.3 | Konfigurieren-der-Geste-View | Geste und danach eine Aktion wählen, [Speichern]       | Konfig wird gespeichert, Aktion wird unter der Geste angezeigt,<br>SRD lässt sich entsprechend Steuern |
| **`= this.testCaseId`**.4 | Bediengeräte/SRD             | Aktion für Nicht-Konfigurierbare-Gesten                | Setzen einer Aktion ist nicht möglich                                                                  |
| **`= this.testCaseId`**.5 | Konfigurieren-der-Geste-View | [(i) – Wie konfiguriere ich Gesten?]                   | Nav. zur Info View                                                                                     |
