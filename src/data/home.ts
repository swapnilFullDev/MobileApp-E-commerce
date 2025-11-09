import Images from "../constants/images";

export const HOME_TABS = ["All", "Mens", "Women", "Kids"] as const;

export type HomeTab = (typeof HOME_TABS)[number];

export type PromotionCard = {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: keyof typeof Images;
};

export const PROMOTIONS: PromotionCard[] = [
  {
    id: "promo1",
    title: "Celebrate this Diwali With Attire Bandhan",
    description:
      "Buy or rent your favorite fashion to get your looks to wow this festival.",
    cta: "Explore new collection",
    image: "frame1",
  },
  {
    id: "promo2",
    title: "Festive Fits Crafted For You",
    description:
      "Discover designer wear curated to make every celebration unforgettable.",
    cta: "Browse festive edit",
    image: "frame1",
  },
  {
    id: "promo3",
    title: "Everyday Elegance Essentials",
    description:
      "Refresh your wardrobe with breathable fabrics and timeless silhouettes.",
    cta: "Shop essentials",
    image: "frame1",
  },
];

export type ProductItem = {
  id: string;
  title: string;
  price: string;
  image: keyof typeof Images;
  originalPrice?: string;
  discountLabel?: string;
};

export const NEW_ARRIVALS: ProductItem[] = [
  {
    id: "product1",
    title: "Angels mala zip jean kurta set",
    price: "₹3,599",
    image: "placeholder2",
  },
  {
    id: "product2",
    title: "Ivory embroidered lehenga",
    price: "₹5,299",
    image: "placeholder1",
  },
  {
    id: "product3",
    title: "Satin drape saree",
    price: "₹4,199",
    image: "placeholder4",
    originalPrice: "₹4,799",
    discountLabel: "12% OFF",
  },
  {
    id: "buyOnly1",
    title: "Handcrafted Heritage Sherwani",
    price: "₹8,499",
    image: "placeholder4",
    originalPrice: "₹9,299",
    discountLabel: "9% OFF",
  },
];

export type CategoryItem = {
  id: string;
  label: string;
  image: keyof typeof Images;
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: "category1",
    label: "Bridal",
    image: "placeholder1",
  },
  {
    id: "category2",
    label: "Festive",
    image: "placeholder2",
  },
  {
    id: "category3",
    label: "Indo Western",
    image: "placeholder3",
  },
  {
    id: "category4",
    label: "Accessories",
    image: "placeholder4",
  },
];

export const FEATURED_COLLECTIONS: ProductItem[] = [
  {
    id: "featured1",
    title: "Angels mala zip jeans slim black used",
    price: "₹3,999",
    originalPrice: "₹5,000",
    discountLabel: "20% OFF",
    image: "placeholder1",
  },
  {
    id: "featured2",
    title: "Velvet embroidered lehenga set",
    price: "₹4,999",
    originalPrice: "₹6,499",
    discountLabel: "23% OFF",
    image: "placeholder2",
  },
  {
    id: "featured3",
    title: "Banarasi silk drape saree",
    price: "₹3,899",
    originalPrice: "₹4,799",
    discountLabel: "18% OFF",
    image: "placeholder3",
  },
];

export type PromoBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  colors: [string, string];
  leftImage: keyof typeof Images;
  rightImage: keyof typeof Images;
};

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "promoBanner1",
    title: "Get 50% Off",
    subtitle: "for all new product purchases min. purchase ₹3,500",
    cta: "Grab It Now",
    colors: ["#fce1e7", "#f9b4c0"],
    leftImage: "placeholder3",
    rightImage: "placeholder4",
  },
];
