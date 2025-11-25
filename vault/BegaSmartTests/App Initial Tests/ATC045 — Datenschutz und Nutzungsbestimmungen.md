---
fileClass: GeneralTest
testCaseId: ATC045
testTags:
componente:
  - Smart Device unabhängig
view: Datenschutz und Nutzungsbestimmungen
vorbedingung: Erstmalige Benutzung der App; Zustimmung noch nicht erteilt
---

---

| Referenz                  | Ausgangspunkt                                  | Vorgang                                                      | Erwartetes Verhalten                                     |     |
| :------------------------ | :--------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------- | --- |
| **`= this.testCaseId`**.1 | Datenschutzbestimmungen / Nutzungsbestimmungen | Ablehnen                                                     | Zurück navigation                                        |     |
| **`= this.testCaseId`**.2 | Startscreen                                    | Navigation zu Datenschutzbestimmungen / Nutzungsbestimmungen |                                                          |     |
| **`= this.testCaseId`**.3 | Datenschutzbestimmungen / Nutzungsbestimmungen | Zustimmen                                                    | App kann benutzt werden, System kann eingerichtet werden |     |
