import AsyncStorage from "@react-native-async-storage/async-storage";

const ADDRESSES_KEY = "@attireBandhan/addresses";
const DEFAULT_ADDRESS_KEY = "@attireBandhan/defaultAddress";

export type AddressTag = "HOME" | "OFFICE" | "OTHER";

export type SavedAddress = {
  id: string;
  name: string;
  phone: string;
  area?: string;
  flat?: string;
  postalCode?: string;
  addressLine1: string;
  addressLine2?: string;
  tag: AddressTag;
  isDefault: boolean;
  createdAt: number;
};

export async function getAddresses(): Promise<SavedAddress[]> {
  try {
    const json = await AsyncStorage.getItem(ADDRESSES_KEY);
    if (!json) return [];
    return JSON.parse(json) as SavedAddress[];
  } catch (error) {
    console.error("Error loading addresses:", error);
    return [];
  }
}

export async function getDefaultAddress(): Promise<SavedAddress | null> {
  try {
    const addresses = await getAddresses();
    const defaultAddr = addresses.find((addr) => addr.isDefault);
    if (defaultAddr) return defaultAddr;

    // If no default, return first address or null
    return addresses.length > 0 ? addresses[0] : null;
  } catch (error) {
    console.error("Error getting default address:", error);
    return null;
  }
}

export async function saveAddress(address: SavedAddress): Promise<void> {
  try {
    const addresses = await getAddresses();

    if (address.isDefault) {
      // Remove default flag from all other addresses
      addresses.forEach((addr) => {
        if (addr.id !== address.id) {
          addr.isDefault = false;
        }
      });
    }

    const existingIndex = addresses.findIndex((addr) => addr.id === address.id);
    if (existingIndex >= 0) {
      addresses[existingIndex] = address;
    } else {
      addresses.push(address);
    }

    await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error("Error saving address:", error);
    throw error;
  }
}

export async function deleteAddress(addressId: string): Promise<void> {
  try {
    const addresses = await getAddresses();
    const filtered = addresses.filter((addr) => addr.id !== addressId);
    await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}

export async function setDefaultAddress(addressId: string): Promise<void> {
  try {
    const addresses = await getAddresses();
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
}
