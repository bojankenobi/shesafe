const STORAGE_KEY = "calc_prefs";
const DEFAULT_PIN = "1919";

export async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(`calc-salt:${pin}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function saveCustomPin(pin: string): Promise<void> {
  if (!/^\d{4,}$/.test(pin)) return;
  const hashed = await hashPin(pin);
  localStorage.setItem(STORAGE_KEY, hashed);
}

export async function verifyPin(candidate: string): Promise<boolean> {
  try {
    const storedHash = localStorage.getItem(STORAGE_KEY);
    if (!storedHash) {
      return candidate === DEFAULT_PIN;
    }
    const candidateHash = await hashPin(candidate);
    return candidateHash === storedHash;
  } catch {
    return candidate === DEFAULT_PIN;
  }
}

export function clearPinStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
