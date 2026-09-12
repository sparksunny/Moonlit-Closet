export type CategoryType = 'all' | 'bridal' | 'pret' | 'formal' | 'wedding-guest' | 'accessories';
export type OccasionType = 'all' | 'nikkah' | 'mehndi' | 'engagement' | 'reception';

export interface Product {
  id: string;
  name: string;
  category: 'bridal' | 'pret' | 'formal' | 'wedding-guest' | 'accessories';
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
