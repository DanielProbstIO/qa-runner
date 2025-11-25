---
fileClass: GeneralTest
testCaseId: ATC028
testTags:
componente:
  - SRD
view: Bediengeräte/SRD
vorbedingung: SRD im System eingebunden
---
| Referenz                  | Ausgangspunkt                             | Vorgang                                           | Erwartetes Verhalten                                                                                  |
| :------------------------ | :---------------------------------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Bediengeräte/SRD/ Gruppen-und-Geräte-View | Gruppe(n) und / oder Geräte auswählen [< zurück]  | Gewählte Geräte verworfen                                                                             |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1                 | Gruppe(n) und / oder Geräte auswählen [Speichern] | Einstellungen wird gespeichert, gemachte Konfig. bzgl. Gesten und Aktion betreffen Ausgewählte Geräte |
