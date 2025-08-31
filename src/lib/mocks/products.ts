// src/lib/mocks/products.ts

export type ImageT = { src: string; alt: string };
export type Variant = {
  id: string;
  name: string;
  colorHex: string;
  images: ImageT[];
};

export type Product = {
  // IDs usados nas rotas /products/[id]
  id: string;

  // Dados de detalhe
  title: string; // título do produto (ex: "Nike Air Force 1 Mid '07")
  subtitle: string; // ex: "Men's Shoes"
  variants: Variant[];
  description: string[];
  details: string[];
  compareAtPrice?: number;
  promo?: string;

  // Dados de listagem e filtros (SSR)
  gender: ('men' | 'women' | 'unisex')[];
  colors: string[];
  sizes: string[];
  price: number;
  featured?: boolean;
  createdAt: string; // ISO

  // Dados de card (listagem e "You Might Also Like")
  card?: {
    genderLabel: string;
    colourCountLabel: string;
    image: string; // imagem principal do card
    badge?: { label: string; variant: 'best' | 'extra' | 'sustainable' };
  };
};

// ----------------------------
// MOCK PRODUCTS
// (imagens em /public/store/*)
// ----------------------------
export const PRODUCTS: Product[] = [
  {
    id: 'af1-mid',
    title: "Nike Air Force 1 Mid '07",
    subtitle: "Men's Shoes",
    variants: [
      {
        id: 'white-black',
        name: 'White/Black',
        colorHex: '#f3f3f3',
        images: [
          { src: '/store/shoe-6.avif', alt: "AF1 Mid '07 – side" },
          { src: '/store/shoe-6.avif', alt: "AF1 Mid '07 – angled" },
        ],
      },
    ],
    description: [
      'Classic AF1 design with durable leather overlays for heritage look.',
      'Nike Air cushioning delivers lightweight comfort with every step.',
      'Mid-cut padded collar adds a bold, athletic look.',
    ],
    details: [
      'Shown: White/Black',
      'Foam midsole with Nike Air unit',
      'Style: AF1-MID-0006',
    ],
    // listagem / filtros
    gender: ['men'],
    colors: ['white', 'black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    price: 98.3,
    featured: true,
    createdAt: '2024-11-20',
    // card
    card: {
      genderLabel: "Men's Shoes",
      colourCountLabel: '6 Colour',
      image: '/store/shoe-6.avif',
      badge: { label: 'Best Seller', variant: 'best' },
    },
  },
  {
    id: 'court-vision',
    title: 'Nike Court Vision Low Next Nature',
    subtitle: "Men's Shoes",
    variants: [
      {
        id: 'black-blue',
        name: 'Black/Blue',
        colorHex: '#1f2937',
        images: [
          { src: '/store/shoe-7.avif', alt: 'Court Vision – side' },
          { src: '/store/shoe-7.avif', alt: 'Court Vision – angled' },
        ],
      },
    ],
    description: [
      'Retro basketball style meets modern comfort.',
      'Next Nature materials with at least 20% recycled content.',
      'Perforated vamp for breathability.',
    ],
    details: [
      'Shown: Black/Blue',
      'Rubber cupsole for traction and durability',
      'Style: CV-LOW-0007',
    ],
    // listagem / filtros
    gender: ['men', 'unisex'],
    colors: ['black', 'blue'],
    sizes: ['7', '8', '9', '10'],
    price: 98.3,
    createdAt: '2025-02-01',
    // card
    card: {
      genderLabel: "Men's Shoes",
      colourCountLabel: '4 Colour',
      image: '/store/shoe-7.avif',
      badge: { label: 'Extra 20% off', variant: 'extra' },
    },
  },
  {
    id: 'af1-platform',
    title: 'Nike Air Force 1 PLTAFORM',
    subtitle: "Women's Shoes",
    variants: [
      {
        id: 'white-pink',
        name: 'White/Pink',
        colorHex: '#f9e7ef',
        images: [
          { src: '/store/shoe-8.avif', alt: 'AF1 Platform – side' },
          { src: '/store/shoe-8.avif', alt: 'AF1 Platform – angled' },
        ],
      },
    ],
    description: [
      'Elevated stance with a platform midsole for a fresh AF1 take.',
      'Soft leather upper and plush collar for comfort.',
      'Heritage details keep it true to the icon.',
    ],
    details: [
      'Shown: White/Pink',
      'Rubber outsole with heritage pivot circle',
      'Style: AF1-PLT-0008',
    ],
    // listagem / filtros
    gender: ['women'],
    colors: ['white', 'pink'],
    sizes: ['6', '7', '8', '9'],
    price: 98.3,
    featured: true,
    createdAt: '2025-01-12',
    // card
    card: {
      genderLabel: "Men's Shoes",
      colourCountLabel: '1 Colour',
      image: '/store/shoe-8.avif',
      badge: { label: 'Sustainable Materials', variant: 'sustainable' },
    },
  },
  {
    id: 'dunk-low-retro',
    title: 'Nike Dunk Low Retro',
    subtitle: "Men's Shoes",
    variants: [
      {
        id: 'green-yellow',
        name: 'Green/Yellow',
        colorHex: '#e2f58d',
        images: [
          { src: '/store/shoe-9.avif', alt: 'Dunk Low – side' },
          { src: '/store/shoe-9.avif', alt: 'Dunk Low – angled' },
        ],
      },
    ],
    description: [
      'Timeless hoops style for everyday wear.',
      'Padded, low-cut collar looks sleek and feels great.',
      'Rubber outsole with classic hoops pivot circle.',
    ],
    details: ['Shown: Green/Yellow', 'Style: DUNK-RETRO-0009'],
    // listagem / filtros
    gender: ['men'],
    colors: ['green', 'yellow'],
    sizes: ['8', '9', '10', '11'],
    price: 98.3,
    createdAt: '2024-08-08',
    // card
    card: {
      genderLabel: "Men's Shoes",
      colourCountLabel: '6 Colour',
      image: '/store/shoe-9.avif',
      badge: { label: 'Best Seller', variant: 'best' },
    },
  },
  {
    id: 'air-max-systm',
    title: 'Nike Air Max SYSTM',
    subtitle: "Men's Shoes",
    variants: [
      {
        id: 'white-red',
        name: 'White/Red',
        colorHex: '#fff5f5',
        images: [
          { src: '/store/shoe-10.avif', alt: 'Air Max SYSTM – side' },
          { src: '/store/shoe-10.avif', alt: 'Air Max SYSTM – angled' },
        ],
      },
    ],
    description: [
      "Inspired by the '80s running revolution.",
      'Visible Air unit softens each step.',
      'Mixed-material upper adds durability.',
    ],
    details: ['Shown: White/Red', 'Style: AM-SYSTM-0010'],
    // listagem / filtros
    gender: ['men', 'unisex'],
    colors: ['white', 'red'],
    sizes: ['7', '8', '9', '10'],
    price: 98.3,
    createdAt: '2025-03-05',
    // card
    card: {
      genderLabel: "Men's Shoes",
      colourCountLabel: '4 Colour',
      image: '/store/shoe-10.avif',
      badge: { label: 'Extra 20% off', variant: 'extra' },
    },
  },
];

// helpers para abstrair o “banco”
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getSuggestedProducts(id: string, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.id !== id).slice(0, count);
}
