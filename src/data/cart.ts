import Images from "../constants/images";

export type CartAddress = {
  name: string;
  pincode: string;
  addressLine: string;
};

export type CartItem = {
  id: string;
  brand: string;
  title: string;
  size: string;
  qty: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: keyof typeof Images;
};

export type CartSummary = {
  totalMrp: number;
  discount: number;
  platformFee: number;
};

export const CART_ADDRESS: CartAddress = {
  name: "Pawan",
  pincode: "452003",
  addressLine: "Near Vaibhavi Bhojnalaya, Vallabh Nagar, Rajkumar Bridge",
};

export const CART_ITEMS: CartItem[] = [
  {
    id: "cart1",
    brand: "Mast & Harbour",
    title: "Men Regular Fit Checked Casual Shirt",
    size: "39",
    qty: 1,
    price: 825,
    originalPrice: 2399,
    discountPercent: 65,
    image: "placeholder2",
  },
  {
    id: "cart2",
    brand: "Levis",
    title: "Men 512 Slim Tapered Fit Heavy Fade Jeans",
    size: "30",
    qty: 1,
    price: 1246,
    originalPrice: 2899,
    discountPercent: 57,
    image: "placeholder3",
  },
  {
    id: "cart3",
    brand: "British Club",
    title: "Eau De Parfum Gift Set",
    size: "Standard",
    qty: 1,
    price: 2477,
    originalPrice: 3985,
    discountPercent: 38,
    image: "placeholder4",
  },
];

export const CART_SUMMARY: CartSummary = {
  totalMrp: 11283,
  discount: 6758,
  platformFee: 23,
};

