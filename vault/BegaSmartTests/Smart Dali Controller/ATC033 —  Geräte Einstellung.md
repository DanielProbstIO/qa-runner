---
fileClass: GeneralTest
testCaseId: ATC033
testTags:
componente:
  - SDC
view: Systemeinstellungen/Smart-Dali Controller
vorbedingung: Smart Dali Controller wurde dem System hinzugefügt
---
| Referenz                  | Ausgangspunkt                             | Vorgang                                                                                    | Erwartetes Verhalten           |
| :------------------------ | :---------------------------------------- | :----------------------------------------------------------------------------------------- | :----------------------------- |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Dali Controller | Einstellungen öffnen, <br>Farbmodus wählen,<br>Wähle RGBWAF oder XY und [speichern]        | AT Befehl >TBD< wird geschickt |
| **`= this.testCaseId`**.2 | Systemeinstellungen/Smart-Dali Controller | Einstellungen öffnen ,<br>DALI-Voreinstellungen festlegen, [Einstellen]                    | AT Befehl >TBD< wird geschickt |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1                 | Einstellungen öffnen ,<br>DALI-Voreinstellungen festlegen, [Einstellen], zurück navigieren | Änderung wird verworfen        |
