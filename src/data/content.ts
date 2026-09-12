import { CollectionItem, OccasionItem, Testimonial } from '../types';

import imgBridalCol from '../assets/images/bridal_collection_1789228838332.jpg';
import imgFormalCol from '../assets/images/formal_collection_1789228854542.jpg';
import imgGuestCol from '../assets/images/wedding_guest_wear_1789228874789.jpg';

import imgNikkah from '../assets/images/occasion_nikkah_1789228917366.jpg';
import imgMehndi from '../assets/images/occasion_mehndi_1789228937758.jpg';
import imgEngagement from '../assets/images/occasion_engagement_1789228954754.jpg';
import imgReception from '../assets/images/occasion_reception_1789228972736.jpg';

import imgHero from '../assets/images/hero_bridal_couture_1789228816381.jpg';
import imgArtisan from '../assets/images/artisan_craft_detail_1789228889907.jpg';
import imgJewelry from '../assets/images/bridal_jewelry_detail_1789229071137.jpg';
import imgCeleste from '../assets/images/product_celeste_1789228991428.jpg';
import imgMehr from '../assets/images/product_mehr_1789229008277.jpg';
import imgAnaya from '../assets/images/anaya_bridal_dress_1789229054013.jpg';

export const FEATURED_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-bridal',
    title: 'BRIDAL',
    subtitle: 'Heirloom silhouettes with regal tilla & pearl embroidery',
    tag: 'Haute Couture',
    image: imgBridalCol,
    categoryKey: 'bridal',
  },
  {
    id: 'col-formal',
    title: 'FORMAL',
    subtitle: 'Understated elegance in sheer organza and raw silk',
    tag: 'Luxury Pret',
    image: imgFormalCol,
    categoryKey: 'formal',
  },
  {
    id: 'col-guest',
    title: 'WEDDING GUEST',
    subtitle: 'Luminous tones designed for joyous family celebrations',
    tag: 'Festive Edit',
    image: imgGuestCol,
    categoryKey: 'wedding-guest',
  },
];

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'occ-nikkah',
    title: 'Nikkah',
    subtitle: 'Purity & Grace',
    description: 'Serene ivories, subtle pearls, and translucent dupattas tailored for sacred vows.',
    image: imgNikkah,
    filterKey: 'nikkah',
  },
  {
    id: 'occ-mehndi',
    title: 'Mehndi',
    subtitle: 'Festive Luminescence',
    description: 'Warm saffron champagne tones, shimmering gota patti, and playful fluid movements.',
    image: imgMehndi,
    filterKey: 'mehndi',
  },
  {
    id: 'occ-engagement',
    title: 'Engagement',
    subtitle: 'Soft Romance',
    description: 'Delicate blush undertones, hand-cut crystals, and sculpted contemporary necklines.',
    image: imgEngagement,
    filterKey: 'engagement',
  },
  {
    id: 'occ-reception',
    title: 'Wedding Reception',
    subtitle: 'Majestic Grandeur',
    description: 'Opulent floor-length silhouettes, trailing veils, and royal antique metallic embroidery.',
    image: imgReception,
    filterKey: 'reception',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The embroidery was even more beautiful in person. Everything felt thoughtfully finished and incredibly elegant. From the first consultation to the bridal fitting, MOONLIT CLOSET exceeded every expectation.',
    stars: 5,
    author: 'Ayesha',
    city: 'Lahore',
    occasion: 'Barat Bride',
  },
  {
    id: 't-2',
    quote: 'The perfect balance of traditional detail and modern elegance. I received compliments all evening. The weight of the fabric and the fall of the kalis were flawless.',
    stars: 5,
    author: 'Sana',
    city: 'Islamabad',
    occasion: 'Walima Bride',
  },
  {
    id: 't-3',
    quote: 'Beautiful fabric, graceful fitting, and exceptional attention to detail. The pearl work on my dupatta looked divine under natural evening candlelight.',
    stars: 5,
    author: 'Hira',
    city: 'Karachi',
    occasion: 'Nikkah Ceremony',
  },
];

export const SOCIAL_GALLERY = [
  {
    id: 'ig-1',
    image: imgHero,
    caption: 'Soft sunlight on handcrafted organza. The Celeste bridal details.',
    likes: '2.4k',
  },
  {
    id: 'ig-2',
    image: imgArtisan,
    caption: 'Patience in every stitch: 380 hours of hand zardozi at the atelier.',
    likes: '3.1k',
  },
  {
    id: 'ig-3',
    image: imgJewelry,
    caption: 'Heirloom polki pearls crafted to complement our bridal couture.',
    likes: '1.8k',
  },
  {
    id: 'ig-4',
    image: imgCeleste,
    caption: 'Grace in movement. Our bride wears the champagne signature peshwas.',
    likes: '4.2k',
  },
  {
    id: 'ig-5',
    image: imgMehr,
    caption: 'Delicate cutwork borders from our latest Autumn/Winter Luxury Pret.',
    likes: '2.7k',
  },
  {
    id: 'ig-6',
    image: imgAnaya,
    caption: 'Regal proportions, timeless memories. The Anaya bridal gown.',
    likes: '5.6k',
  },
];

export const CRAFTSMANSHIP_FEATURES = [
  {
    id: 'feat-1',
    title: 'Intricate Embroidery',
    text: 'Delicate hand-inspired detailing designed to celebrate timeless artistry. Each thread is placed with meticulous devotion by multi-generational craft masters.',
    iconName: 'Sparkles',
  },
  {
    id: 'feat-2',
    title: 'Premium Fabrics',
    text: 'Thoughtfully selected fabrics chosen for comfort, movement, and elegance — from pure 80g raw silk to gossamer-light handwoven organza.',
    iconName: 'Feather',
  },
  {
    id: 'feat-3',
    title: 'Made for Moments',
    text: 'Designed to make celebrations feel personal, memorable, and beautifully yours. We believe bridal wear should carry emotional resonance across generations.',
    iconName: 'HeartHandshake',
  },
];
