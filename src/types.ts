export type CategoryType = 'all' | 'bridal' | 'party-wear';
export type OccasionType = 'all' | 'nikkah' | 'mehndi' | 'engagement' | 'reception';

export interface Product {
  id: string;
  name: string;
  category: 'bridal' | 'party-wear';
  categoryLabel: string;
  subtitle: string;
  pricePKR: number;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  secondaryImage?: string;
  occasion: 'nikkah' | 'mehndi' | 'engagement' | 'reception' | 'versatile';
  color: string;
  colorName: string;
  fabric: string;
  workType: string;
  description: string;
  deliveryTime: string;
  sizes: string[];
}

export interface SiteContent {
  brandName: string;
  brandTagline: string;
  announcementMessages: string[];
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    image: string;
  };
  featuredCollections: {
    eyebrow: string;
    title: string;
    description: string;
    bridalTitle: string;
    bridalSubtitle: string;
    bridalTag: string;
    bridalImage: string;
    partyWearTitle: string;
    partyWearSubtitle: string;
    partyWearTag: string;
    partyWearImage: string;
  };
  editorial: {
    eyebrow: string;
    title: string;
    leadParagraph: string;
    subParagraph: string;
    image: string;
    artisanImage: string;
    artisanLocation: string;
    artisanTitle: string;
  };
  wardrobe: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    whatsapp: string;
    email: string;
    instagram: string;
    address: string;
    timings: string;
    consultationNote: string;
  };
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  customNotes?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  stars: number;
  author: string;
  city: string;
  occasion?: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  filterKey: OccasionType;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  categoryKey: CategoryType;
}
