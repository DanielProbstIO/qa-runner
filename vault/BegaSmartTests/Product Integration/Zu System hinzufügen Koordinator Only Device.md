---
fileClass: GeneralTest
testCaseId: PI004
testTags:
  - CoordinatorOnly
  - Product Integration
componente:
view:
vorbedingung: Produkt darf nur als Koordinator verwendet werden.
---
| Referenz                  | Ausgangspunkt               | Vorgang      | Erwartetes Verhalten                                                                      |
| :------------------------ | :-------------------------- | :----------- | :---------------------------------------------------------------------------------------- |
| **`= this.testCaseId`**.1 | Scan QR Code zum hinzufügen | Scan QR Code | Es wird eine Fehlermeldung angezeigt das dieses Gerät als Koordinator genutzt werden muss |

