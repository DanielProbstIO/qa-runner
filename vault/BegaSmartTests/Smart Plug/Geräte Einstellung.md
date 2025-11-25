---
fileClass: GeneralTest
testCaseId:
testTags:
componente:
  - Smart Plug
view: SmartPlug Detail-Screen
vorbedingung:
---
| Referenz                  | Ausgangspunkt             | Vorgang                                                               | Erwartetes Verhalten                               |
| :------------------------ | :------------------------ | :-------------------------------------------------------------------- | :------------------------------------------------- |
| **`= this.testCaseId`**.1 | SmartPlug Detail-Screen   | -                                                                     | Screen mit Stromverbrauch und ein/ausschalt Button |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1 | Ein/Ausschalten                                                       | Smart Plug schaltet ein und aus                    |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1 | Stecke eine variable Last in Smart Plug in eingeschaltetem Zustand an | Leistung wird angezeigt und aktualisiert           |
