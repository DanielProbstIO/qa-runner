---
fileClass: GeneralTest
testCaseId: ATC091
testTags:
componente:
view: Einstellungen
vorbedingung: Smart-System auf Endgerät vorhanden, mit BEGA-ID angemeldet
---
>[!info] Wird ein System geteilt, ist es auf dem Quell-Gerät noch vorhanden. Das Quell-Gerät kann das System steuern, jedoch nicht konfigurieren.

| Referenz                  | Ausgangspunkt                                 | Vorgang                                                                               | Erwartetes Verhalten                                                                                                                          |
| :------------------------ | :-------------------------------------------- | :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Einstellung                                   | [System teilen]                                                                       | Nav. auf Sys-Teilen-View, App generiert QR-Code, <br>Nach fünf Minuten läuft der Token ab und ein neuer QR-Code wird generiert                |
| **`= this.testCaseId`**.2 | Smart-Sys mit iOS erstellt, Einstellungen     | Sys mit anderem iOS-Gerät teilen, [System teilen], mit Ziel-Gerät QR-Code scannen     | Smart-System wird mit Ziel-Gerät geteilt, Sys lässt sich auf Ziel-Gerät steuern aber nicht konfigurieren, Sys bleibt auf Quell-Gerät erhalten |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.2                     | Sys mit Android-Gerät teilen, [System teilen], mit Ziel-Gerät QR-Code scannen         | **`= this.testCaseId`**.2                                                                                                                     |
| **`= this.testCaseId`**.4 | Smart-Sys mit Android erstellt, Einstellungen | Sys mit anderem Android-Gerät teilen, [System teilen], mit Ziel-Gerät QR-Code scannen | **`= this.testCaseId`**.2                                                                                                                     |
| **`= this.testCaseId`**.5 | **`= this.testCaseId`**.4                     | Sys mit iOS-Gerät teilen, [System übertragen], mit Ziel-Gerät QR-Code scannen         | **`= this.testCaseId`**.2                                                                                                                     |
| **`= this.testCaseId`**.6 | System wurde übertragen                       | -                                                                                     | System lässt sich auf Ziel-Gerät nicht steuern                                                                                                |
