'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sampleArticles } from '@/data/articles';
import { ArticleCategory } from '@/lib/types';

export default function ArticlesPage() {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredArticles = filter === 'all' 
    ? sampleArticles 
    : sampleArticles.filter(a => a.category === filter);

  const categories = [...new Set(sampleArticles.map(a => a.category))];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Articles</h1>
          <p className="text-muted mt-1">{sampleArticles.length} articles in your library</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <span>✏️</span>
          Write New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({sampleArticles.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.replace('-', ' ')} ({sampleArticles.filter(a => a.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/admin/articles/${article.slug}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={article.heroImage.url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded text-xs font-medium text-primary capitalize">
                {article.category.replace('-', ' ')}
              </span>
              {article.featured && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-accent text-white rounded text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </h3>
              {article.heroCaption && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.heroCaption}</p>
              )}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{article.author.name}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  article.publishedAt 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {article.publishedAt ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg">No articles found</p>
          <Link
            href="/admin/articles/new"
            className="text-accent font-medium hover:underline mt-2 inline-block"
          >
            Write your first article →
          </Link>
        </div>
      )}
    </div>
  );
}
