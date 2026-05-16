import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { CATEGORIES } from '../lib/config';

const ALL = 'All';
const allCategories = [ALL, ...CATEGORIES];

function getInitialCategory(): string {
  const hash = window.location.hash;
  const match = hash.match(/[?&]category=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : ALL;
}

export default function Shop() {
  const [category, setCategory] = useState<string>(getInitialCategory);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const handle = () => setCategory(getInitialCategory());
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  const { products, loading, error } = useProducts(
    category === ALL ? undefined : category,
    debouncedSearch || undefined
  );

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Shop All Jerseys</h1>
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search jerseys..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-10 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#ff7900] transition-colors"
            />
            {search && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setSearch('')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <SlidersHorizontal className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? 'bg-[#ff7900] text-white shadow-lg shadow-[#ff7900]/20'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <p className="text-[#ff7900] text-lg">Failed to load products. Please try again.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">&#128247;</div>
            <p className="text-gray-400 text-lg mb-2">No jerseys found</p>
            <p className="text-gray-600 text-sm">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
