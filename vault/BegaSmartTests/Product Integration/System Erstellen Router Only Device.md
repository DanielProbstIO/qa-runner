---
fileClass: GeneralTest
testCaseId: PI002
testTags:
  - RouterOnly
  - Product Integration
componente:
view:
vorbedingung: Produkt kann kein Coordinator sein.
---

| Referenz                  | Ausgangspunkt                | Vorgang      | Erwartetes Verhalten                                                             |
| :------------------------ | :--------------------------- | :----------- | :------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Scan QR Code für Koordinator | Scan QR Code | Es wird eine Fehlermeldung angezeigt das dieses Gerät kein Coordinator sein kann |

