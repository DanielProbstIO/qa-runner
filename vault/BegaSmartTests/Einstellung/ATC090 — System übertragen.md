---
fileClass: GeneralTest
testCaseId: ATC090
testTags:
componente:
view: Einstellungen
vorbedingung: Bereits ein Smart-System eingerichtet; mit BEGA-ID angemeldet
---
>[!info] Wird ein System übertragen, ist es auf dem Quell-Gerät nicht mehr vorhanden. Das System kann bei fehlerfreier Übertragung auf das Ziel-Gerät von diesem gesteuert und konfiguriert werden. Um nachvollziehen zu können, ob der Übertragungsvorgang erfolgreich war, muss die Konfiguration des Smart-System das übertragen werden soll, gemerkt werden. Dies kann entweder in Eigenverantwortung geschehen oder man nimmt sich ein System Konfig Template zur Hilfe. 

| Referenz                  | Ausgangspunkt                                 | Vorgang                                                                                       | Erwartetes Verhalten                                                                                                                    |
| :------------------------ | :-------------------------------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Einstellungen                                 | [System übertragen]                                                                           | Nav. auf Sys-Übertragen View, App generiert QR-Code, Nach fünf Minuten läuft der Token ab und ein neuer QR-Code wird generiert          |
| **`= this.testCaseId`**.2 | Smart-Sys mit iOS erstellt, Einstellungen     | Sys auf anderes iOS-Gerät übertragen, [System übertragen], mit Ziel-Gerät QR-Code scannen     | Smart-System wird auf Ziel-Gerät übertragen, Sys lässt sich auf Ziel-Gerät steuern und Konfigurieren, Sys wird auf Quell-Gerät gelöscht |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                     | Sys auf Android-Gerät übertragen, [System übertragen], mit Ziel-Gerät QR-Code scannen         | **`= this.testCaseId`**.2                                                                                                               |
| **`= this.testCaseId`**.4 | Smart-Sys mit Android erstellt, Einstellungen | Sys auf anderes Android-Gerät übertragen, [System übertragen], mit Ziel-Gerät QR-Code scannen | **`= this.testCaseId`**.2                                                                                                               |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.4                     | Sys auf iOS-Gerät übertragen, [System übertragen], mit Ziel-Gerät QR-Code scannen             | **`= this.testCaseId`**.2                                                                                                               |
| **`= this.testCaseId`**.6 | System wurde übertragen                       | -                                                                                             | System lässt sich auf Ziel-Gerät **nicht** steuern und /oder konfigurieren                                                              |
