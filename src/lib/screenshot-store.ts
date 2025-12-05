// src/lib/screenshot-store.ts

export type ScreenshotRef = {
  id: string;
  name: string;
  createdAt: string;
};

const DB_NAME = "qa-runner";
const DB_VERSION = 1;
const STORE_NAME = "screenshots";

function openDb(): Promise<IDBDatabase> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB ist nur im Browser verfügbar."));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("IndexedDB Fehler"));
    };
  });
}

export async function saveScreenshot(file: File): Promise<ScreenshotRef> {
  const db = await openDb();

  const id = `sc_${new Date().toISOString()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  const record = {
    id,
    name: file.name,
    createdAt,
    blob: file,
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error("Could not store file"));
  });

  const ref: ScreenshotRef = { id, name: file.name, createdAt };
  return ref;
}

export async function getScreenshotBlob(id: string): Promise<Blob | null> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    req.onsuccess = () => {
      const result = req.result;
      if (!result) return resolve(null);
      resolve(result.blob as Blob);
    };
    req.onerror = () => reject(req.error ?? new Error("Could not read file"));
  });
}