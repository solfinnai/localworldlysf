import { Article, Author } from '@/lib/types';

export const authors: Author[] = [
  {
    id: 'author-1',
    name: 'Sarah Chen',
    avatar: {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      alt: 'Sarah Chen',
    },
    bio: 'San Francisco native covering local food, culture, and the stories behind our city\'s best businesses.',
    social: {
      twitter: 'https://twitter.com/sarahchen_sf',
      instagram: 'https://instagram.com/sarahchen_sf',
    },
  },
  {
    id: 'author-2',
    name: 'Marcus Williams',
    avatar: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      alt: 'Marcus Williams',
    },
    bio: 'Former chef turned writer, exploring the intersection of food, community, and identity in the Bay Area.',
  },
];

export const sampleArticles: Article[] = [
  {
    id: 'article-1',
    slug: 'heart-of-mission-ritual-coffee',
    title: 'The Heart of the Mission: How Ritual Coffee Became a San Francisco Institution',
    subtitle: 'From a small roastery to a citywide movement, one family\'s obsession with perfect coffee changed how we drink',
    category: 'interview',
    tags: ['coffee', 'mission-district', 'local-business', 'craft-coffee'],
    publishedAt: '2026-03-15',
    updatedAt: '2026-03-15',
    readTime: 8,
    featured: true,
    sponsored: false,
    
    heroImage: {
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop',
      alt: 'Ritual Coffee roastery in the Mission District',
      caption: 'The original Ritual Coffee location on Valencia Street has been roasting since 2005.',
      credit: 'Photo by Jason Leung',
    },
    
    content: [
      {
        type: 'text',
        content: `When quadruple espresso shots cost $4.50 and come in a cup that looks like a fishbowl, you know you're somewhere special. Welcome to Ritual Coffee, where the line stretches to the door on Saturday mornings and everyone—from tech workers to neighborhood regulars—waits patiently for what many consider the best coffee in San Francisco.`,
      },
      {
        type: 'text',
        content: `But Ritual is more than just good coffee. It's a story about family, persistence, and a city that, for a brief moment, decided it cared about where its beans came from and how they were roasted.`,
      },
      {
        type: 'quote',
        text: 'We never set out to be cool. We just wanted to make coffee we were proud to drink.',
        author: 'Faye Kayamba',
        title: 'Co-founder, Ritual Coffee',
        image: {
          url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
          alt: 'Faye Kayamba',
        },
      },
      {
        type: 'text',
        content: `Faye Kayamba and her business partner, whose kitchen-table roasting operation eventually became one of San Francisco's most influential coffee companies, started Ritual in 2005 with a single 12-kilo roaster and a belief that the Bay Area deserved better than stale, over-roasted beans.`,
      },
      {
        type: 'image',
        image: {
          url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop',
          alt: 'Coffee being poured',
          caption: 'Each cup at Ritual is crafted with precision and care.',
        },
        layout: 'full',
      },
      {
        type: 'text',
        content: `Today, Ritual sources beans from over 30 farms across 15 countries, maintains four café locations across the city, and supplies coffee to hundreds of restaurants and offices. But walk into any of their spaces, and you'll notice something refreshing: there's no pretension. Just good coffee, served by people who genuinely love what they do.`,
      },
      {
        type: 'divider',
        style: 'ornament',
      },
      {
        type: 'text',
        content: `The Mission location remains the spiritual home of Ritual. The exposed brick walls, the warehouse-style ceiling, the communal tables where strangers become friends over shared outlets—it's all deliberately designed to foster community.`,
      },
      {
        type: 'business-card',
        business: {
          id: 'ritual-coffee',
          name: 'Ritual Coffee Roasters',
          slug: 'ritual-coffee',
          category: 'Coffee',
          address: '1026 Valencia St, San Francisco, CA 94110',
          neighborhood: 'Mission District',
          phone: '(415) 641-1100',
          website: 'https://www.ritualroasters.com',
          social: {
            instagram: 'https://instagram.com/ritualroasters',
            facebook: 'https://facebook.com/ritualcoffee',
          },
          rating: 4.7,
          reviewCount: 1247,
        },
        showMap: true,
        cta: 'directions',
      },
    ],
    
    businesses: [
      {
        id: 'ritual-coffee',
        name: 'Ritual Coffee Roasters',
        slug: 'ritual-coffee',
        category: 'Coffee',
        address: '1026 Valencia St, San Francisco, CA 94110',
        neighborhood: 'Mission District',
        phone: '(415) 641-1100',
        website: 'https://www.ritualroasters.com',
        social: {
          instagram: 'https://instagram.com/ritualroasters',
        },
        rating: 4.7,
        reviewCount: 1247,
      },
    ],
    primaryBusiness: {
      id: 'ritual-coffee',
      name: 'Ritual Coffee Roasters',
      slug: 'ritual-coffee',
      category: 'Coffee',
      address: '1026 Valencia St, San Francisco, CA 94110',
      neighborhood: 'Mission District',
      phone: '(415) 641-1100',
      website: 'https://www.ritualroasters.com',
    },
    
    author: authors[0],
    
    viewCount: 4820,
    shareCount: 234,
    bookmarkCount: 567,
  },
  {
    id: 'article-2',
    slug: 'tartine-bakery-bread-story',
    title: 'The Bread That Changed Everything: Tartine and the Renaissance of San Francisco Baking',
    subtitle: 'How a Chad Robertson\'s quest for the perfect loaf put San Francisco on the global bread map',
    category: 'feature',
    tags: ['bakeries', 'bread', 'tartine', 'artisan-food'],
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-10',
    readTime: 12,
    featured: true,
    sponsored: false,
    
    heroImage: {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=900&fit=crop',
      alt: 'Freshly baked sourdough bread',
      caption: 'Tartine\'s country loaf has become the benchmark for artisan bread in America.',
    },
    
    content: [
      {
        type: 'text',
        content: `At 5 AM, before the fog has lifted from the hills, Chad Robertson is already at work. Not because he has to be—Tartine Bakery has not wanted for customers in its 20-plus years of operation—but because some things cannot be rushed. The bread demands it.`,
      },
      {
        type: 'text',
        content: `What started as a tiny operation in a forgotten corner of the Mission District has become something of a pilgrimage site for bread lovers worldwide. People fly from Tokyo, London, and New York just to stand in line for Tartine's country loaf.`,
      },
      {
        type: 'quote',
        text: 'Every loaf tells the story of the day it was made—the temperature, the humidity, the mood. That\'s what makes bread alive.',
        author: 'Chad Robertson',
        title: 'Head Baker, Tartine Bakery',
      },
    ],
    
    businesses: [],
    
    author: authors[1],
    
    viewCount: 6200,
    shareCount: 412,
    bookmarkCount: 890,
  },
  {
    id: 'article-3',
    slug: 'best-hidden-gems-north-beach',
    title: '10 North Beach Hidden Gems Even longtime SF Residents Don\'t Know About',
    subtitle: 'Beyond the tourist traps: our curated guide to the real North Beach experience',
    category: 'listicle',
    tags: ['north-beach', 'hidden-gems', 'local-guide', 'italian'],
    publishedAt: '2026-03-05',
    updatedAt: '2026-03-05',
    readTime: 6,
    featured: false,
    sponsored: true,
    sponsoredBy: {
      id: 'sf-explorer',
      name: 'SF Explorer',
      slug: 'sf-explorer',
      category: 'Tourism',
      address: 'San Francisco, CA',
      neighborhood: 'San Francisco',
      phone: null,
      website: 'https://sfexplorer.com',
    },
    
    heroImage: {
      url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&h=900&fit=crop',
      alt: 'North Beach street scene at dusk',
      caption: 'The charming streets of San Francisco\'s Little Italy.',
    },
    
    content: [
      {
        type: 'text',
        content: `North Beach is San Francisco's Italian heart—home to espresso bars that have been pulling shots since the 1950s, trattorias where the owners might be your nonna, and cafes where you'll find poets, painters, and philosophers nursing a single cappuccino for hours.`,
      },
      {
        type: 'text',
        content: `But beyond the famous spots that draw crowds from across the world, there's a quieter North Beach that only locals know. Here are 10 hidden gems that capture the authentic spirit of the neighborhood.`,
      },
      {
        type: 'divider',
        style: 'ornament',
      },
      {
        type: 'text',
        content: `**1. Limón** — This unassuming spot serves ceviche that will make you question every fish taco you've ever had. The secret? Everything's caught daily and prepared with Peruvian techniques passed down through generations.`,
      },
      {
        type: 'text',
        content: `**2. Café Divine** — Tucked above Columbus Avenue, this tiny bar feels like a secret garden. The aperol spritz is exceptional, and the terrace views of the bay are completely free.`,
      },
    ],
    
    businesses: [],
    
    author: authors[0],
    
    viewCount: 8900,
    shareCount: 756,
    bookmarkCount: 1203,
  },
];

export const getFeaturedArticles = (): Article[] => {
  return sampleArticles.filter(a => a.featured);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return sampleArticles.filter(a => a.category === category);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return sampleArticles.find(a => a.slug === slug);
};
