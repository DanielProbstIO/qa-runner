---
fileClass: GeneralTest
testCaseId: ATC094
testTags:
componente:
view: Einstellungen
vorbedingung: System wurde eingerichtet; Account wurde angelegt
---
| Referenz                  | Ausgangspunkt                                                | Vorgang    | Erwartetes Verhalten                                                                                                                                |
| :------------------------ | :----------------------------------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Einstellungen                                                | [Anmelden] | In-App Browser Fenster öffnet sich, wo die Login Credentials eingegeben werden können                                                               |
| **`= this.testCaseId`**.2 | In-App Browser Fenster,<br>Keine Login Credentials übergeben | [Fertig]   | App zeigt Fehler an                                                                                                                                 |
| **`= this.testCaseId`**.3 | In-App Browser Fenster, Falsche Login Credentials            | [Anmelden] | In-App Browser Fehlermeldung                                                                                                                        |
| **`= this.testCaseId`**.4 | In-App Browser Fenster,<br>richtige Login Credentials        | [Anmelden] | In-App Browser Fenster schließt, User ist angemeldet, ,it Anmeldung verbundener Funktionalität ist nutzbar (System-Übertragen, System-Teilen, usw.) |
