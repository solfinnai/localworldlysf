import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { sampleArticles } from '@/data/articles';
import { CATEGORY_LABELS, ArticleCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Stories | LocalWorld Spotlight',
  description: 'Discover the stories behind San Francisco\'s best local businesses. Interviews, features, and neighborhood guides.',
};

export default function StoriesPage() {
  const featuredArticle = sampleArticles.find(a => a.featured);
  const otherArticles = sampleArticles.filter(a => a.id !== featuredArticle?.id);
  
  return (
    <main className="min-h-screen bg-cream">
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
            <Link href="/stories" className="text-sm font-medium text-primary">
              Stories
            </Link>
            <Link href="/businesses" className="text-sm font-medium text-muted hover:text-primary transition-colors">
              Businesses
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white font-display font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            San Francisco Stories
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the people, places, and stories that make San Francisco unique. 
            From hidden gems to local legends, we tell the stories behind the businesses you love.
          </p>
        </div>
      </section>
      
      {/* Featured Story */}
      {featuredArticle && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <Link href={`/stories/${featuredArticle.slug}`} className="block group">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-[50vh] min-h-[400px]">
                  <Image
                    src={featuredArticle.heroImage.url}
                    alt={featuredArticle.heroImage.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Featured Badge */}
                  <span className="absolute top-6 left-6 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured Story
                  </span>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="max-w-3xl">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                        {CATEGORY_LABELS[featuredArticle.category as ArticleCategory]}
                      </span>
                      <h2 className="text-white font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                        {featuredArticle.title}
                      </h2>
                      {featuredArticle.subtitle && (
                        <p className="text-white/80 text-lg md:text-xl mb-6 max-w-2xl">
                          {featuredArticle.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span>{featuredArticle.author.name}</span>
                        <span>·</span>
                        <span>{featuredArticle.readTime} min read</span>
                        <span>·</span>
                        <span>{featuredArticle.viewCount.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}
      
      {/* All Stories Grid */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary font-display">All Stories</h2>
            
            {/* Category Filter */}
            <div className="hidden md:flex gap-2">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/stories/${article.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.heroImage.url}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {article.sponsored && (
                    <span className="absolute top-3 right-3 bg-accent/90 text-primary text-xs font-bold px-2 py-1 rounded">
                      Sponsored
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {CATEGORY_LABELS[article.category as ArticleCategory]}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-primary font-display mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {article.subtitle && (
                    <p className="text-muted text-sm mb-4 line-clamp-2">
                      {article.subtitle}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{article.author.name}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold font-display mb-4">
            Get Stories in Your Inbox
          </h2>
          <p className="text-white/70 mb-8">
            Weekly spotlights on the best local businesses, delivered every Thursday.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent text-primary font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lg font-bold font-display">
              Local<span className="text-accent">World</span> Spotlight
            </span>
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
