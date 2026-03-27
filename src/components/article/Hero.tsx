'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  image: {
    url: string;
    alt: string;
    caption?: string;
    credit?: string;
  };
  category: string;
  title: string;
  subtitle?: string;
  author: {
    name: string;
    avatar?: { url: string; alt: string };
  };
  publishedAt: string;
  readTime: number;
}

export default function ArticleHero({
  image,
  category,
  title,
  subtitle,
  author,
  publishedAt,
  readTime,
}: HeroProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="relative">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[700px]">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-6 w-full pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                {category.replace('-', ' ')}
              </span>
              
              {/* Title */}
              <h1 
                className="text-white font-display font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {title}
              </h1>
              
              {/* Subtitle */}
              {subtitle && (
                <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
                  {subtitle}
                </p>
              )}
              
              {/* Byline */}
              <div className="flex items-center gap-4 text-white/70 text-sm">
                {author.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      src={author.avatar.url}
                      alt={author.avatar.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-medium">{author.name}</span>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Caption */}
      {image.caption && (
        <div className="max-w-4xl mx-auto px-6 py-4">
          <p className="text-muted text-sm">
            {image.caption}
            {image.credit && (
              <span className="text-gray-400"> — {image.credit}</span>
            )}
          </p>
        </div>
      )}
    </header>
  );
}
