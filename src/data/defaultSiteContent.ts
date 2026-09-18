import { SiteContent } from '../types';
import heroImg from '../assets/images/hero_bridal_couture_1789228816381.jpg';
import bridalEditorialImg from '../assets/images/bridal_collection_1789228838332.jpg';
import craftDetailImg from '../assets/images/artisan_craft_detail_1789228889907.jpg';
import bridalColImg from '../assets/images/bridal_collection_1789228838332.jpg';
import partyWearColImg from '../assets/images/formal_collection_1789228854542.jpg';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brandName: 'MOONLIT CLOSET',
  brandTagline: 'Couture • Lahore',
  announcementMessages: [
    'Complimentary Nationwide Delivery on Selected Collections',
    'Worldwide Express Bridal Shipping | Inquire for Bespoke Orders',
    'Private Bridal Consultations Available at Our Lahore & Islamabad Salons',
  ],
  hero: {
    eyebrow: 'THE BRIDAL EDIT',
    titleLine1: 'Made for Your',
    titleHighlight: 'Most Beautiful',
    titleLine2: 'Beginning',
    description: 'Discover timeless silhouettes, delicate craftsmanship, and graceful details designed for unforgettable celebrations.',
    primaryButtonText: 'Explore Bridal',
    secondaryButtonText: 'View Collections',
    image: heroImg,
  },
  featuredCollections: {
    eyebrow: 'The MOONLIT CLOSET Anthology',
    title: 'Curated for Your Moment',
    description: 'Two iconic collections tailored for wedding ceremonies and luxury evening celebrations.',
    bridalTitle: 'BRIDAL COLLECTION',
    bridalSubtitle: 'Heirloom handcrafted peshwas, lehengas & signature veils with regal tilla & pearl embroidery',
    bridalTag: 'Haute Couture',
    bridalImage: bridalColImg,
    partyWearTitle: 'PARTY WEAR',
    partyWearSubtitle: 'Understated elegance in sheer organza, plush velvet, and embellished raw silk ensembles',
    partyWearTag: 'Festive & Luxury Pret',
    partyWearImage: partyWearColImg,
  },
  editorial: {
    eyebrow: 'THE ART OF CRAFT',
    title: 'Crafted for Moments That Become Memories',
    leadParagraph: 'From intricate embroidery to graceful silhouettes, every MOONLIT CLOSET creation is designed with patience, precision, and a deep appreciation for timeless beauty.',
    subParagraph: 'Each ensemble begins with pure handwoven silk, shaped through hundreds of hours of delicate hand zardozi, vasli, and fine pearl needlework by master artisans in our Lahore atelier.',
    image: bridalEditorialImg,
    artisanImage: craftDetailImg,
    artisanLocation: 'Atelier Lahore',
    artisanTitle: 'Authentic Adda Needlework',
  },
  wardrobe: {
    eyebrow: 'The Complete Atelier',
    title: 'The MOONLIT CLOSET Wardrobe',
    description: 'Discover handcrafted bridal masterpieces and luxury party wear ensembles tailored with heirloom precision.',
  },
  contact: {
    eyebrow: 'Private Atelier & Bridal Concierge',
    title: 'Contact MOONLIT CLOSET',
    description: 'Whether commissioning bespoke bridal couture or selecting tailored festive party wear, our dedicated concierges and master couturiers are at your service.',
    phone: '+1 716-313-1615',
    whatsapp: '+1 716-313-1615',
    email: 'moonlitgemjewels@gmail.com',
    instagram: '@moonlitcloset',
    address: 'Houston / Florida USA',
    timings: '10:00 AM – 8:00 PM',
    consultationNote: 'Private bridal trials and bespoke measurement appointments are scheduled on an individual basis.',
  },
};
