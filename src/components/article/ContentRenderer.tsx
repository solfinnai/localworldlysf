'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ContentBlock, BusinessReference } from '@/lib/types';

interface ContentRendererProps {
  blocks: ContentBlock[];
  business?: BusinessReference;
}

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TextBlock({ content }: { content: string }) {
  return (
    <motion.div
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="prose prose-lg max-w-none font-body text-text leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0"
      dangerouslySetInnerHTML={{ __html: formatTextContent(content) }}
    />
  );
}

function formatTextContent(text: string): string {
  return text
    .split('\n\n')
    .map(para => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return `<h3 class="text-2xl font-display font-bold text-primary mt-10 mb-4">${para.slice(2, -2)}</h3>`;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}

function ImageBlock({ 
  image, 
  layout = 'inline' 
}: { 
  image: { url: string; alt: string; caption?: string; credit?: string };
  layout?: 'full' | 'wide' | 'inline' | 'left' | 'right';
}) {
  const layoutClasses = {
    full: 'w-full max-w-none -mx-6 md:-mx-12',
    wide: 'w-full max-w-5xl mx-auto',
    inline: 'max-w-2xl mx-auto',
    left: 'float-left mr-6 mb-4 max-w-[50%]',
    right: 'float-right ml-6 mb-4 max-w-[50%]',
  };

  return (
    <motion.figure
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${layoutClasses[layout]} my-10`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image.url}
          alt={image.alt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      {image.caption && (
        <figcaption className="text-center text-muted text-sm mt-3">
          {image.caption}
          {image.credit && <span className="text-gray-400"> — {image.credit}</span>}
        </figcaption>
      )}
    </motion.figure>
  );
}

function QuoteBlock({ 
  text, 
  author, 
  title,
  image 
}: { 
  text: string;
  author: string;
  title?: string;
  image?: { url: string; alt: string };
}) {
  return (
    <motion.blockquote
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 md:my-16 max-w-3xl mx-auto"
    >
      <div className="relative">
        {/* Decorative quote mark */}
        <span 
          className="absolute -top-4 -left-4 md:-top-8 md:-left-8 text-8xl md:text-9xl text-accent/20 font-display leading-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        
        <div className="relative pl-8 md:pl-12">
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-primary leading-snug font-medium italic mb-6">
            &ldquo;{text}&rdquo;
          </blockquote>
          
          <footer className="flex items-center gap-4">
            {image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <cite className="not-italic font-bold text-primary">
                {author}
              </cite>
              {title && (
                <p className="text-muted text-sm">{title}</p>
              )}
            </div>
          </footer>
        </div>
      </div>
    </motion.blockquote>
  );
}

function BusinessCard({ business }: { business: BusinessReference }) {
  return (
    <motion.aside
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <h3 className="font-bold text-xl text-primary mb-4">Featured Business</h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Business Photo */}
          {business.photos?.[0] && (
            <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={business.photos[0].url}
                alt={business.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Business Info */}
          <div className="flex-1">
            <h4 className="font-bold text-2xl text-primary font-display mb-2">
              {business.name}
            </h4>
            
            {business.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(business.rating!) ? 'text-accent' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {business.rating} ({business.reviewCount?.toLocaleString()} reviews)
                </span>
              </div>
            )}
            
            <div className="space-y-2 text-sm text-muted mb-4">
              <p className="flex items-center gap-2">
                <span>📍</span> {business.address}
              </p>
              {business.website && (
                <p className="flex items-center gap-2">
                  <span>🌐</span>
                  <a 
                    href={business.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {new URL(business.website).hostname}
                  </a>
                </p>
              )}
              {business.social?.instagram && (
                <p className="flex items-center gap-2">
                  <span>📸</span>
                  <a 
                    href={business.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    @{business.social.instagram.split('/').pop()}
                  </a>
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Visit Website
                  <span>→</span>
                </a>
              )}
              {business.googleMapsUrl && (
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Get Directions
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function Divider({ style = 'line' }: { style?: 'line' | 'dots' | 'ornament' | 'space' }) {
  if (style === 'space') {
    return <div className="my-16" />;
  }
  
  if (style === 'dots') {
    return (
      <motion.div
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="my-12 flex items-center justify-center gap-4"
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="w-2 h-2 rounded-full bg-accent/50" />
        <span className="w-2 h-2 rounded-full bg-accent" />
      </motion.div>
    );
  }
  
  if (style === 'ornament') {
    return (
      <motion.div
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="my-12 md:my-16 flex items-center justify-center"
      >
        <span className="text-accent text-2xl">✦</span>
        <div className="w-16 md:w-24 h-px bg-gray-200 mx-4" />
        <span className="text-accent text-2xl">✦</span>
        <div className="w-16 md:w-24 h-px bg-gray-200 mx-4" />
        <span className="text-accent text-2xl">✦</span>
      </motion.div>
    );
  }
  
  return (
    <motion.hr
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
    />
  );
}

function GalleryBlock({ images, layout = 'grid' }: { images: { url: string; alt: string }[]; layout?: 'grid' | 'carousel' }) {
  if (layout === 'carousel') {
    return (
      <motion.div
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="my-10 overflow-x-auto"
      >
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {images.map((img, i) => (
            <div key={i} className="relative w-72 h-48 flex-shrink-0 rounded-lg overflow-hidden">
              <Image src={img.url} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {images.map((img, i) => (
        <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image src={img.url} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

export default function ContentRenderer({ blocks, business }: ContentRendererProps) {
  return (
    <div className="article-content">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={index} content={block.content} />;
          
          case 'image':
            return (
              <ImageBlock 
                key={index} 
                image={block.image} 
                layout={block.layout} 
              />
            );
          
          case 'quote':
            return (
              <QuoteBlock 
                key={index}
                text={block.text}
                author={block.author}
                title={block.title}
                image={block.image}
              />
            );
          
          case 'business-card':
            return <BusinessCard key={index} business={block.business} />;
          
          case 'divider':
            return <Divider key={index} style={block.style} />;
          
          case 'gallery':
            return (
              <GalleryBlock 
                key={index} 
                images={block.images} 
                layout={block.layout}
              />
            );
          
          default:
            return null;
        }
      })}
      
      {/* Show primary business card at end if exists and not already shown */}
      {business && !blocks.some(b => b.type === 'business-card') && (
        <BusinessCard business={business} />
      )}
    </div>
  );
}
