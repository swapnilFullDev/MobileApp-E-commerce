import Images from "../constants/images";

export type ProductDetail = {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  image: keyof typeof Images;
  gallery: Array<keyof typeof Images>;
  description: string;
  highlights: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewsCount: number;
  rentalInfo: string;
  rentalPricePerDay: number;
  rentalDurationOptions: number[];
  securityDeposit: number;
  deliveryInfo: string;
  buyAvailable?: boolean;
  rentalAvailable?: boolean;
};

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  product1: {
    id: "product1",
    title: "Angels mala zip jean kurta set",
    price: "₹3,599",
    image: "placeholder2",
    gallery: ["placeholder2", "placeholder1", "placeholder3"],
    description:
      "Elevate your festive wardrobe with this contemporary kurta set crafted from breathable cotton with a subtle sheen. The intricate tonal embroidery and modern silhouette make it ideal for celebratory evenings.",
    highlights: [
      "Crafted with soft cotton blend for day-long comfort",
      "Detailed tonal embroidery with handcrafted tassels",
      "Includes kurta, matching bottoms, and stole",
      "Dry clean recommended to retain texture and finish",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Mint", "Rose"],
    rating: 4.6,
    reviewsCount: 128,
    rentalPricePerDay: 899,
    rentalDurationOptions: [3, 5, 7],
    securityDeposit: 2000,
    rentalInfo:
      "Rental includes complimentary fitting, professional dry cleaning pre and post use, and easy doorstep pickup within 24 hours after your booking slot.",
    deliveryInfo:
      "Delivered freshly pressed 24 hours before your event with return pickup scheduled the morning after your rental ends.",
  },
  product2: {
    id: "product2",
    title: "Ivory embroidered lehenga",
    price: "₹5,299",
    originalPrice: "₹6,199",
    discountLabel: "15% OFF",
    image: "placeholder1",
    gallery: ["placeholder1", "placeholder4", "placeholder3"],
    description:
      "A timeless lehenga in shimmering ivory adorned with mirror work and sequins. Lightweight layers and a flattering fit create effortless movement for every special occasion.",
    highlights: [
      "All-over hand mirror work and sequin detailing",
      "Soft net dupatta with scalloped lace border",
      "Adjustable drawstring waistband for a custom fit",
      "Comes with padded blouse lining for support",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne"],
    rating: 4.8,
    reviewsCount: 204,
    rentalPricePerDay: 1299,
    rentalDurationOptions: [3, 5, 7],
    securityDeposit: 3500,
    rentalInfo:
      "Enjoy premium lehenga rentals with door-step delivery, one complimentary blouse alteration, and return pickup scheduled the next day after your rental period.",
    deliveryInfo:
      "Arrives 48 hours prior for fittings. Pickup is arranged within 12 hours of your selected return date.",
  },
  product3: {
    id: "product3",
    title: "Satin drape saree",
    price: "₹4,199",
    originalPrice: "₹4,799",
    discountLabel: "12% OFF",
    image: "placeholder4",
    gallery: ["placeholder4", "placeholder2", "placeholder1"],
    description:
      "This ready-to-wear satin drape saree combines modern tailoring with classic elegance. The pre-pleated waist and structured pallu ensure a flattering fit with minimal effort.",
    highlights: [
      "Ready-to-wear silhouette with pre-stitched pleats",
      "Structured pallu with lightweight cancan support",
      "Includes matching embellished belt for styling",
      "Can be hand washed gently or dry cleaned",
    ],
    sizes: ["Free Size"],
    colors: ["Blush Pink", "Berry", "Midnight Blue"],
    rating: 4.4,
    reviewsCount: 96,
    rentalPricePerDay: 749,
    rentalDurationOptions: [3, 6],
    securityDeposit: 1800,
    rentalInfo:
      "All saree rentals arrive steam pressed with an optional draping expert on request. Returns are contactless with damage cover up to ₹1,500 included.",
    deliveryInfo:
      "Ships 36 hours before your booking start time with complimentary return packaging and next-day pickup.",
    buyAvailable: false,
    rentalAvailable: true,
  },
  featured1: {
    id: "featured1",
    title: "Angels mala zip jeans slim black used",
    price: "₹3,999",
    originalPrice: "₹5,000",
    discountLabel: "20% OFF",
    image: "placeholder1",
    gallery: ["placeholder1", "placeholder2", "placeholder3"],
    description:
      "Tailored slim-fit jeans designed with tonal embroidery and antique zip accents. Crafted in premium stretch denim to pair effortlessly with festive kurtas or casual shirts.",
    highlights: [
      "Premium stretch denim with sculpting fit",
      "Signature zip detail with antique finish",
      "Mid-rise waist with reinforced belt loops",
      "Machine wash cold, tumble dry low",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Charcoal"],
    rating: 4.2,
    reviewsCount: 58,
    rentalPricePerDay: 499,
    rentalDurationOptions: [3, 5],
    securityDeposit: 1200,
    rentalInfo:
      "Rentals include hygiene packaging, doorstep delivery, and flexible extensions at ₹250 per extra day.",
    deliveryInfo:
      "Dispatched 24 hours prior and collected the day after use with follow-up quality check updates.",
    buyAvailable: false,
  },
  featured2: {
    id: "featured2",
    title: "Velvet embroidered lehenga set",
    price: "₹4,999",
    originalPrice: "₹6,499",
    discountLabel: "23% OFF",
    image: "placeholder2",
    gallery: ["placeholder2", "placeholder4", "placeholder3"],
    description:
      "Luxurious velvet lehenga set embellished with zari motifs and hand-cut sequins. The structured blouse and layered skirt enhance your silhouette while keeping you comfortable.",
    highlights: [
      "Zari and sequin work across blouse and skirt",
      "Layered cancan for graceful flare",
      "Comfortable cotton lining throughout",
      "Professional dry clean only",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Emerald", "Wine"],
    rating: 4.7,
    reviewsCount: 173,
    rentalPricePerDay: 1399,
    rentalDurationOptions: [3, 5, 7],
    securityDeposit: 3800,
    rentalInfo:
      "Complimentary fitting session, insured shipping, and free dry cleaning post rental are included with every booking.",
    deliveryInfo:
      "Delivered two days before your event with insured handling. Pickup is coordinated within 24 hours post rental.",
    buyAvailable: true,
    rentalAvailable: true,
  },
  featured3: {
    id: "featured3",
    title: "Banarasi silk drape saree",
    price: "₹3,899",
    originalPrice: "₹4,799",
    discountLabel: "18% OFF",
    image: "placeholder3",
    gallery: ["placeholder3", "placeholder1", "placeholder2"],
    description:
      "Handwoven Banarasi silk saree with intricate zari patterning. The soft fall and lustrous finish make it a classic piece for heirloom wardrobes.",
    highlights: [
      "Authentic Banarasi weave with gold zari",
      "Lightweight silk ideal for all-day wear",
      "Includes matching unstitched blouse piece",
      "Dry clean only to preserve sheen",
    ],
    sizes: ["Free Size"],
    colors: ["Royal Blue", "Marigold"],
    rating: 4.9,
    reviewsCount: 221,
    rentalPricePerDay: 899,
    rentalDurationOptions: [3, 6],
    securityDeposit: 2200,
    rentalInfo:
      "Every Banarasi saree rental includes fall & pico finishing, blouse piece pressing, and hassle-free doorstep pickup after your celebration.",
    deliveryInfo:
      "Scheduled delivery 48 hours ahead for trials and styling; pickup reminder sent on the final day with courier collection the next morning.",
  },
  buyOnly1: {
    id: "buyOnly1",
    title: "Handcrafted Heritage Sherwani",
    price: "₹8,499",
    originalPrice: "₹9,299",
    discountLabel: "9% OFF",
    image: "placeholder4",
    gallery: ["placeholder4", "placeholder2", "placeholder1"],
    description:
      "Own this limited-edition sherwani crafted with intricate zari work, finished with silk lining for lasting comfort during grand celebrations.",
    highlights: [
      "Premium brocade with hand-embroidered motifs",
      "Silk lining with moisture-wicking finish",
      "Includes matching stole and pocket square",
      "Complimentary alterations within 7 days",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory Gold", "Champagne"],
    rating: 4.9,
    reviewsCount: 312,
    rentalPricePerDay: 0,
    rentalDurationOptions: [],
    securityDeposit: 0,
    rentalInfo: "This outfit is available for purchase only.",
    deliveryInfo:
      "Ships within 48 hours with insured delivery. Complimentary fitting session included on request.",
    buyAvailable: true,
    rentalAvailable: false,
  },
};

