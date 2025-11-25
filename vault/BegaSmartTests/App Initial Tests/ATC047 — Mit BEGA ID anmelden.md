---
fileClass: GeneralTest
testCaseId: ATC047
testTags:
componente:
view: Start-Screen
vorbedingung: Nicht eingeloggt, BEGA-ID erstellt
---

---

| Referenz                  | Ausgangspunkt                                             | Vorgang  | Erwartetes Verhalten                                                                                                                                |
| :------------------------ | :-------------------------------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Start-Screen                                              | Anmelden | In-App Browser Fenster öffnet sich, wo die Login Credentials eingegeben werden können                                                               |
| **`= this.testCaseId`**.2 | In-App Browser Fenster; Keine Login Credentials übergeben | Fertig   | Zurück Navigation zur App                                                                                                                           |
| **`= this.testCaseId`**.3 | In-App Browser Fenster; Falsche Login Credentials         | Anmelden | In-App Browser Fehlermeldung                                                                                                                        |
| **`= this.testCaseId`**.4 | In-App Browser Fenster; Richtige Login Credentials        | Anmelden | In-App Browser Fenster schließt; User ist angemeldet; Mit Anmeldung verbundener Funktionalität ist nutzbar (System-Übertragen, System-Teilen, usw.) |
