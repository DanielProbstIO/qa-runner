---
fileClass: GeneralTest
testCaseId: ATC038
testTags:
componente:
  - Smart Tower
view: Systemeinstellungen/Smart-Tower
vorbedingung: Smart Tower wurde dem System hinzugefügt, min. eine Leuchte ist angeschlossen
---
| Referenz                  | Ausgangspunkt                   | Vorgang                                   | Erwartetes Verhalten                                                                                |
| :------------------------ | :------------------------------ | :---------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Systemeinstellungen/Smart-Tower | [Gerät Verbinden]; falschen Code scannen; | Fehlermeldung bzw. Hinweis                                                                          |
| **`= this.testCaseId`**.2 | Systemeinstellungen/Smart-Tower | [Gerät Verbinden]; Code scannen;          | Geräte-Konfig-Card wird eingeblendet                                                                |
| **`= this.testCaseId`**.3 | Geräte-Konfig-Card              | Name vergeben; [Abbruch]                  | Systemeinstellungen/Smart-Tower                                                                     |
| **`= this.testCaseId`**.4 | Geräte-Konfig-Card              | Kein Name vergeben; [speichern]           | Fehler                                                                                              |
| **`= this.testCaseId`**.5 | Geräte-Konfig-Card              | Name vergeben; [speichern]                | Leuchte hinzugefügt;  <br><br>Leuchte wird unter Steuern/Geräte angezeigt und kann gesteuert werden |
