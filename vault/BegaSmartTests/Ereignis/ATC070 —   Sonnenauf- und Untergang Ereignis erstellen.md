---
fileClass: GeneralTest
testCaseId: ATC070
testTags:
componente:
view: Ereignisse
vorbedingung: System wurde erstellt, mehrere Smart-Geräte und mind. ein 3rd-Party Gerät hinzugefügt
---
| Referenz                  | Ausgangspunkt                           | Vorgang                                             | Erwartetes Verhalten                                                                                                                                    |
| :------------------------ | :-------------------------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`= this.testCaseId`**.1 | Alle betroffenen Geräte sind erreichbar | Sonnenaufgang-Ereignis korrekt konfigurieren        | Ereignis erfolgreich angelegt, Ereignis triggert zu der Standort abhängigen Sonnenaufgangszeit, die ausgewählten Geräte                                 |
| **`= this.testCaseId`**.2 | **`= this.testCaseId`**.1               | Sonnenaufgang-Ereignis mit Delta Zeit konfigurieren | Ereignis erfolgreich angelegt; Ereignis triggert zu der Standort abhängige, um die Delta Zeit verschobenen Sonnenaufgangszeit die ausgewählten Geräte   |
| **`= this.testCaseId`**.3 | **`= this.testCaseId`**.1               | Sonnenuntergang-Ereignis korrekt konfigurieren      | Ereignis erfolgreich angelegt; Ereignis triggert zu der Standort abhängigen Sonnenuntergangszeit, die ausgewählten Geräte                               |
| **`= this.testCaseId`**.4 | **`= this.testCaseId`**.1               | Sonnenaufgang-Ereignis mit Delta Zeit konfigurieren | Ereignis erfolgreich angelegt; Ereignis triggert zu der Standort abhängige, um die Delta Zeit verschobenen Sonnenuntergangszeit die ausgewählten Geräte |
