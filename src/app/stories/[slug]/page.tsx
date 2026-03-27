import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sampleArticles, getArticleBySlug } from '@/data/articles';
import ArticleHero from '@/components/article/Hero';
import ContentRenderer from '@/components/article/ContentRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return { title: 'Article Not Found' };
  }
  
  return {
    title: `${article.title} | LocalWorld Spotlight`,
    description: article.subtitle || article.metaDescription || `Read the story of ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.subtitle || '',
      images: [{ url: article.heroImage.url, width: 1600, height: 900 }],
      type: 'article',
      publishedTime: article.publishedAt || undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = sampleArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);
  
  return (
    <main className="min-h-screen bg-cream">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.subtitle,
            image: article.heroImage.url,
            datePublished: article.publishedAt,
            author: {
              '@type': 'Person',
              name: article.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'LocalWorld Spotlight',
              logo: {
                '@type': 'ImageObject',
                url: 'https://localworldlysf.com/logo.png',
              },
            },
          }),
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary font-display">
              Local<span className="text-accent">World</span>
            </span>
            <span className="hidden sm:inline text-xs font-medium text-muted">Spotlight</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/stories" className="text-sm font-medium text-muted hover:text-primary transition-colors">
              Stories
            </Link>
            <Link href="/businesses" className="text-sm font-medium text-muted hover:text-primary transition-colors">
              Businesses
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <ArticleHero
        image={article.heroImage}
        category={article.category.replace('-', ' ')}
        title={article.title}
        subtitle={article.subtitle}
        author={{
          name: article.author.name,
          avatar: article.author.avatar,
        }}
        publishedAt={article.publishedAt || ''}
        readTime={article.readTime}
      />
      
      {/* Article Content */}
      <article className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Main Content */}
            <div className="min-w-0">
              <ContentRenderer 
                blocks={article.content} 
                business={article.primaryBusiness}
              />
              
              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-muted text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Share */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm font-medium text-muted">Share this story:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors">
                    <span className="text-sm">↗</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors">
                    <span className="text-sm">✉</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors">
                    <span className="text-sm">◎</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-primary mb-4">About the Author</h3>
                  <div className="flex items-center gap-3 mb-4">
                    {article.author.avatar && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image
                          src={article.author.avatar.url}
                          alt={article.author.avatar.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-primary">{article.author.name}</p>
                    </div>
                  </div>
                  {article.author.bio && (
                    <p className="text-sm text-muted leading-relaxed">
                      {article.author.bio}
                    </p>
                  )}
                </div>
                
                {/* Related Stories */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h3 className="font-bold text-primary mb-4">Related Stories</h3>
                  <div className="space-y-4">
                    {relatedArticles.map(related => (
                      <Link
                        key={related.id}
                        href={`/stories/${related.slug}`}
                        className="block group"
                      >
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2">
                          <Image
                            src={related.heroImage.url}
                            alt={related.heroImage.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-primary group-hover:text-accent transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted mt-1">
                          {related.readTime} min read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-2xl font-bold font-display">
                Local<span className="text-accent">World</span> Spotlight
              </span>
              <p className="text-white/60 text-sm mt-2">
                San Francisco's local media platform
              </p>
            </div>
            <div className="flex gap-6 text-sm text-white/60">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/advertise" className="hover:text-white transition-colors">Advertise</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
