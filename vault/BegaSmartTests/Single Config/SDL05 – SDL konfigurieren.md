---
fileClass: GeneralTest
testCaseId: SDL05
testTags:
  - Single Config
componente:
  - SDL
view: /SDL-Konfig-Menu
vorbedingung: SDL-Geräte gefunden und gelistet; Konfig-Menu geöffnet
---

| Referenz | Ausgangspunkt | Vorgang | Erwartetes Verhalten |
| :-- | :-- | :-- | :-- |
| **`= this.testCaseId`**.1 | SDL Helligkeit regulieren | Helligkeit über Slider setzten; [Anwenden] | Helligkeit des phys. Gerät passt sich entsprechend an; Slider lässt sich präzise auf einen Wert setzten; der gesetzte Wert wird in % angezeigt und stimmt mit dem Slider überein; erst durch [Anwenden] wird konfig. übernommen |
| **`= this.testCaseId`**.2 | Sanftes Einschalten aktivieren | Sanftes-Einschalten-Toggle-Btn aktivieren |  |
| **`= this.testCaseId`**.3 | Sanftes Einschalten deaktivieren | Sanftes-Einschalten-Toggle-Btn deaktivieren |  |
| **`= this.testCaseId`**.4 | Zwei SDL in Device-Card-View; ersten SDL auf 85% setzten und Sanftes-Einschalten aktiveren; [Anwenden] | Zweiten SDL in Device-Card-View wählen; [Letzte Einstellungen übernehmen] | Zweiter SDL übernimmt konfig. des ersten (Helligkeit auf 85% und Sanftes-Einschalten) |
