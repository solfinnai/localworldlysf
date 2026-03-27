import { z } from 'zod';

export const ArticleCategorySchema = z.enum([
  'interview',
  'feature',
  'neighborhood-guide',
  'event-coverage',
  'behind-the-scenes',
  'opinion',
  'listicle',
]);

export type ArticleCategory = z.infer<typeof ArticleCategorySchema>;

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'interview': 'Interview',
  'feature': 'Feature',
  'neighborhood-guide': 'Neighborhood Guide',
  'event-coverage': 'Event Coverage',
  'behind-the-scenes': 'Behind the Scenes',
  'opinion': 'Opinion',
  'listicle': 'Top 10',
};

export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type Image = z.infer<typeof ImageSchema>;

export const BusinessReferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  phone: z.string().nullable(),
  website: z.string().url().nullable(),
  googleMapsUrl: z.string().url().nullable().optional(),
  social: z.object({
    instagram: z.string().url().nullable().optional(),
    facebook: z.string().url().nullable().optional(),
    twitter: z.string().url().nullable().optional(),
  }).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().optional(),
  photos: z.array(ImageSchema).optional(),
});

export type BusinessReference = z.infer<typeof BusinessReferenceSchema>;

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: ImageSchema.optional(),
  bio: z.string().optional(),
  social: z.object({
    twitter: z.string().url().nullable().optional(),
    instagram: z.string().url().nullable().optional(),
  }).optional(),
});

export type Author = z.infer<typeof AuthorSchema>;

export const TextBlockSchema = z.object({
  type: z.literal('text'),
  content: z.string(),
});

export const ImageBlockSchema = z.object({
  type: z.literal('image'),
  image: ImageSchema,
  layout: z.enum(['full', 'wide', 'inline', 'left', 'right']).default('inline'),
});

export const GalleryBlockSchema = z.object({
  type: z.literal('gallery'),
  images: z.array(ImageSchema).min(2).max(12),
  layout: z.enum(['grid', 'carousel']).default('grid'),
});

export const QuoteBlockSchema = z.object({
  type: z.literal('quote'),
  text: z.string(),
  author: z.string(),
  title: z.string().optional(),
  image: ImageSchema.optional(),
});

export const BusinessCardBlockSchema = z.object({
  type: z.literal('business-card'),
  business: BusinessReferenceSchema,
  showMap: z.boolean().default(false),
  cta: z.enum(['directions', 'website', 'phone', 'none']).default('directions'),
});

export const VideoBlockSchema = z.object({
  type: z.literal('video'),
  url: z.string().url(),
  provider: z.enum(['youtube', 'vimeo', 'tiktok', 'instagram']),
  thumbnail: ImageSchema.optional(),
});

export const EmbedBlockSchema = z.object({
  type: z.literal('embed'),
  url: z.string().url(),
  platform: z.string(),
  html: z.string().optional(),
});

export const DividerBlockSchema = z.object({
  type: z.literal('divider'),
  style: z.enum(['line', 'dots', 'ornament', 'space']).default('line'),
});

export const ContentBlockSchema = z.discriminatedUnion('type', [
  TextBlockSchema,
  ImageBlockSchema,
  GalleryBlockSchema,
  QuoteBlockSchema,
  BusinessCardBlockSchema,
  VideoBlockSchema,
  EmbedBlockSchema,
  DividerBlockSchema,
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

export const ArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  category: ArticleCategorySchema,
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  readTime: z.number().default(5),
  featured: z.boolean().default(false),
  sponsored: z.boolean().default(false),
  sponsoredBy: BusinessReferenceSchema.optional(),
  
  heroImage: ImageSchema,
  heroCaption: z.string().optional(),
  
  content: z.array(ContentBlockSchema),
  
  businesses: z.array(BusinessReferenceSchema).default([]),
  primaryBusiness: BusinessReferenceSchema.optional(),
  
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  
  author: AuthorSchema,
  
  viewCount: z.number().default(0),
  shareCount: z.number().default(0),
  bookmarkCount: z.number().default(0),
});

export type Article = z.infer<typeof ArticleSchema>;
