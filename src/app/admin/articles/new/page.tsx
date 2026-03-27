'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { useCRM } from '@/context/CRMContext';
import Image from 'next/image';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'quote' | 'business-card';
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  businessId?: string;
  author?: string;
}

const CATEGORIES = [
  'Coffee & Cafe',
  'Restaurants',
  'Bakery',
  'Bars & Nightlife',
  'Retail',
  'Arts & Culture',
  'Hidden Gems',
  'Local Guides',
  'Interviews',
];

export default function NewArticlePage() {
  const router = useRouter();
  const { businesses, addBusiness } = useCRM();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('LocalWorld Team');
  const [content, setContent] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
    };
    setBlocks([...blocks, newBlock]);
    setShowBlockMenu(false);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Article created:', {
      title,
      slug,
      excerpt,
      category,
      coverImage,
      author,
      content,
      blocks,
      status,
    });
    
    setSaving(false);
    router.push('/admin/articles');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/articles" className="text-primary hover:underline text-sm mb-4 inline-flex items-center gap-1">
          ← Back to Articles
        </Link>
        <h1 className="text-2xl font-bold text-primary font-display">Create New Article</h1>
        <p className="text-muted mt-1">Write and publish spotlight articles</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-lg font-bold"
                placeholder="The Heart of the Mission: Ritual Coffee"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="heart-of-mission-ritual-coffee"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                placeholder="A brief summary of your article..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="https://images.unsplash.com/..."
              />
              {coverImage && (
                <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    onError={() => setCoverImage('')}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Article Content</h2>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowBlockMenu(!showBlockMenu)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                + Add Block
              </button>
              {showBlockMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                  <button
                    type="button"
                    onClick={() => addBlock('text')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    Text Block
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    Image Block
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('quote')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    Pull Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('business-card')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    Business Card
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your article..."
            />
          </div>

          {blocks.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-gray-700">Additional Blocks</h3>
              {blocks.map((block, index) => (
                <div key={block.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500 capitalize">
                      {block.type === 'business-card' ? 'Business Card' : block.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {block.type === 'text' && (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                      placeholder="Additional text content..."
                    />
                  )}
                  
                  {block.type === 'image' && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={block.imageUrl || ''}
                        onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Image URL"
                      />
                      <input
                        type="text"
                        value={block.imageCaption || ''}
                        onChange={(e) => updateBlock(block.id, { imageCaption: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Caption (optional)"
                      />
                      {block.imageUrl && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={block.imageUrl}
                            alt="Block image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {block.type === 'quote' && (
                    <div className="space-y-3">
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none italic"
                        placeholder="Quote text..."
                      />
                      <input
                        type="text"
                        value={block.author || ''}
                        onChange={(e) => updateBlock(block.id, { author: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Quote author"
                      />
                    </div>
                  )}
                  
                  {block.type === 'business-card' && (
                    <select
                      value={block.businessId || ''}
                      onChange={(e) => updateBlock(block.id, { businessId: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="">Select a business...</option>
                      {businesses.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/articles"
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving || !title}
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {status === 'published' ? 'Publish Article' : 'Save Draft'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
