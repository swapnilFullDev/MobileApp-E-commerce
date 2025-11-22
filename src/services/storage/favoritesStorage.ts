import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@attireBandhan/favorites";

export type SavedItemMode = "rent" | "buy";

export type SavedItem = {
  id: string; // unique key for the saved entry
  productId: string;
  mode: SavedItemMode;
  selectedSize?: string;
  selectedColor?: string;
  // rent specific
  rentalDuration?: number;
  pricePerDay?: number;
  securityDeposit?: number;
  // buy specific
  purchasePrice?: number;
  // when saved
  savedAt: number;
};

export async function getFavorites(): Promise<SavedItem[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!json) return [];
  try {
    const arr = JSON.parse(json) as SavedItem[];
    if (Array.isArray(arr)) return arr;
    return [];
  } catch {
    return [];
  }
}

export async function saveFavorites(items: SavedItem[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

export async function addFavorite(item: SavedItem): Promise<void> {
  const current = await getFavorites();
  // Avoid duplicates by id
  const exists = current.some((x) => x.id === item.id);
  const next = exists
    ? current.map((x) => (x.id === item.id ? item : x))
    : [item, ...current];
  await saveFavorites(next);
}

export async function removeFavorite(id: string): Promise<void> {
  const current = await getFavorites();
  await saveFavorites(current.filter((x) => x.id !== id));
}


