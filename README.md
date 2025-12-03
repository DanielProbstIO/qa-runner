

# QA Runner — Lokale Vault Konfiguration

Dieses Projekt erlaubt dir, Testcases aus Markdown-Dateien zu laden.  
Die Quelle dafür ist ein **Vault** — normalerweise ein Ordner mit `.md`-Dateien.

---

## 📦 Installation

Projekt clonen oder herunterladen:

```bash
git clone git@github.com:DEIN_USER/qa-runner.git
cd qa-runner
```

Abhängigkeiten installieren:

```bash
npm install
```

---

## 🔑 Vault konfigurieren — `.env.local`

Der **Pfad zum Vault** wird über eine Environment Variable gesetzt:

```env
VAULT_PATH=./vault/BegaSmartTests
```

👉 Die Datei heißt:

```
.env.local
```

und liegt **im Projekt-Root**:

```
qa-runner/.env.local
```

### ❗️Wichtig
- `.env.local` wird **nicht automatisch erstellt** — du musst sie anlegen.
- Ohne `VAULT_PATH` versucht die App automatisch:
  ```
  ./vault/BegaSmartTests
  ```
  zu nutzen.

---

## 📁 Welche Pfade sind erlaubt?

### 1️⃣ Relativer Pfad (empfohlen)
Vault liegt im Projekt:

```
VAULT_PATH=./vault/BegaSmartTests
```

✔️ Funktioniert auf jedem Rechner  
✔️ Gut für Teamarbeit  
✔️ Keine privaten Pfade

---

### 2️⃣ Absoluter Pfad (lokale Entwickler-Situation)

Wenn dein Vault woanders liegt:

```env
VAULT_PATH=/Users/deinName/Desktop/MeineVault/BegaSmartTests
```

⚠️ Nur sinnvoll, wenn du lokal arbeitest  
⚠️ Dieser Pfad existiert NICHT bei anderen Personen

---

## 📄 Beispiel Struktur

```
qa-runner/
 ├─ src/
 ├─ vault/
 │   └─ BegaSmartTests/
 │        ├─ Bewegungssensor/
 │        │    └─ ATC006.md
 │        └─ App Initial/
 │             └─ ATC043.md
 └─ .env.local
```

---

## 🚀 Starten

```bash
npm run dev
```

Danach:

➡️ http://localhost:3000/run  
Testcases sollten geladen werden.

Wenn nicht → Vault-Pfad falsch oder leer → in Terminal prüfen.

---

## 🔧 Debug Ausgabe

Beim Start sieht man:

```
[vault-testcases] Verwende TESTS_DIR: /...Pfad zum Vault...
```

Wenn hier nichts steht → `.env.local` fehlt oder falsch.

---


