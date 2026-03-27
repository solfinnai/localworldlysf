import Image from "next/image";
import Link from "next/link";
import { sampleArticles } from "@/data/articles";

export default function Home() {
  const featuredArticle = sampleArticles.find(a => a.featured);
  const recentArticles = sampleArticles.filter(a => !a.featured).slice(0, 3);
  
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
            <Link 
              href="/stories" 
              className="hidden sm:inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80"
            alt="San Francisco skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
          <h1 
            className="text-white font-display font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            The Stories Behind<br />San Francisco's Best
          </h1>
          <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We interview local business owners, explore neighborhoods, 
            and tell the authentic stories that make this city extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/stories"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent/90 transition-colors"
            >
              Explore Stories
              <span>→</span>
            </Link>
            <Link 
              href="/businesses"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Add Your Business
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '300+', label: 'Local Businesses' },
              { value: '50+', label: 'Stories Published' },
              { value: '12', label: 'Neighborhoods' },
              { value: '10K+', label: 'Monthly Readers' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-accent font-display">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Story */}
      {featuredArticle && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-display">Featured Story</h2>
              <Link href="/stories" className="text-accent font-medium hover:underline">
                View all stories →
              </Link>
            </div>
            
            <Link href={`/stories/${featuredArticle.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={featuredArticle.heroImage.url}
                    alt={featuredArticle.heroImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:pl-4">
                  <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    {featuredArticle.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary font-display mb-4 group-hover:text-accent transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>
                  {featuredArticle.subtitle && (
                    <p className="text-muted text-lg mb-6 leading-relaxed">
                      {featuredArticle.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-muted text-sm">
                    <span>{featuredArticle.author.name}</span>
                    <span>·</span>
                    <span>{featuredArticle.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}
      
      {/* Recent Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-display mb-8">Recent Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/stories/${article.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={article.heroImage.url}
                    alt={article.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium text-accent uppercase tracking-wider">
                  {article.category.replace('-', ' ')}
                </span>
                <h3 className="text-xl font-bold text-primary font-display mt-2 mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted text-sm line-clamp-2">
                  {article.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold font-display mb-4">
            Know a Great Local Business?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            We're always looking for San Francisco's hidden gems and the people 
            behind them. Suggest a business for our next spotlight.
          </p>
          <Link 
            href="/nominate"
            className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent/90 transition-colors"
          >
            Nominate a Business
            <span>→</span>
          </Link>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-primary font-display mb-4">
            Stay Local
          </h2>
          <p className="text-muted mb-8">
            Get weekly spotlights on the best of San Francisco delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-2xl font-bold font-display">
                Local<span className="text-accent">World</span>
              </span>
              <p className="text-white/60 text-sm mt-3">
                San Francisco's local media platform connecting businesses with their community.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/stories" className="block hover:text-white transition-colors">All Stories</Link>
                <Link href="/stories?category=interview" className="block hover:text-white transition-colors">Interviews</Link>
                <Link href="/stories?category=neighborhood-guide" className="block hover:text-white transition-colors">Neighborhoods</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Businesses</h4>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/nominate" className="block hover:text-white transition-colors">Get Featured</Link>
                <Link href="/advertise" className="block hover:text-white transition-colors">Advertising</Link>
                <Link href="/sponsor" className="block hover:text-white transition-colors">Sponsorships</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© 2026 LocalWorld Spotlight. All rights reserved.</p>
            <p>Made with ♥ in San Francisco</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
