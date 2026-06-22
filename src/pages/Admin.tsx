import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit2, Trash2, LogOut, Eye, EyeOff, Save, X, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import { CATEGORIES, SIZES } from '../lib/config';
import LoadingSpinner from '../components/LoadingSpinner';

const emptyForm = {
  name: '',
  price: '',
  category: 'International' as Product['category'],
  sizes: ['M', 'L'] as string[],
  image: '',
  images: [''] as string[],
  description: '',
  is_featured: false,
  is_new_arrival: false,
  is_published: true,
  crossed_out_price: '',
  is_out_of_stock: false,
};

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-900/10 border border-gray-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">JERSEY FITCH Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-gray-900/30 border border-gray-800 text-gray-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              placeholder="admin@jerseyzone.in"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#ff7900] transition-colors text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => setShowPw(s => !s)}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
          </button>
          <p className="text-gray-600 text-xs text-center">
            Create admin accounts via Supabase Dashboard → Authentication
          </p>
        </form>
      </div>
    </div>
  );
}

function ProductFormModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Product;
  onSave: (data: typeof emptyForm) => Promise<void>;
  onClose: () => void;
}) {
  const initialImages =
    (initial as unknown as { images?: unknown })?.images && Array.isArray((initial as unknown as { images?: unknown }).images)
      ? ((initial as unknown as { images?: unknown }).images as unknown[]).filter((x): x is string => typeof x === 'string')
      : [];

  const [form, setForm] = useState(
    initial
      ? {
          name: initial.name,
          price: String(initial.price),
          category: initial.category,
          sizes: initial.sizes,
          image: initial.image,
          images: (initialImages.length > 0 ? initialImages : [initial.image]).filter(Boolean),
          description: initial.description,
          is_featured: initial.is_featured,
          is_new_arrival: initial.is_new_arrival,
          is_published: initial.is_published,
          crossed_out_price: initial.crossed_out_price !== undefined ? String(initial.crossed_out_price) : '',
          is_out_of_stock: initial.is_out_of_stock || false,
        }
      : { ...emptyForm }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleSize = (size: string) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedImages = (form.images || [])
      .map(s => s.trim())
      .filter(Boolean);
    const primaryImage = form.image?.trim() || cleanedImages[0] || '';

    if (!form.name || !form.price || !primaryImage || form.sizes.length === 0) {
      setError('Please fill all required fields and select at least one size.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave({
        ...form,
        image: primaryImage,
        images: cleanedImages.length > 0 ? cleanedImages : [primaryImage],
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-10 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900 font-bold text-lg">{initial ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-gray-900/30 border border-gray-800 text-gray-400 text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Product Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              placeholder="e.g. Argentina World Cup Jersey 2022"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Price (&#8377;) *</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
                placeholder="1299"
                min="1"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as Product['category'] }))}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Crossed-out Price (&#8377;) (optional)</label>
            <input
              type="number"
              value={form.crossed_out_price}
              onChange={e => setForm(f => ({ ...f, crossed_out_price: e.target.value }))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              placeholder="1599"
              min="0"
            />
            <p className="text-gray-600 text-xs mt-2">
              Enter the original price to show as crossed-out. Leave empty for no crossed-out price.
            </p>
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Primary Image URL *</label>
            <input
              type="url"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-gray-400 text-xs uppercase tracking-wider block">More Images (optional)</label>
              <button
                type="button"
                onClick={() =>
                  setForm(f => ({
                    ...f,
                    images: [...(f.images?.length ? f.images : ['']), ''],
                  }))
                }
                className="text-xs font-semibold text-gray-600 hover:text-gray-700 transition-colors"
              >
                + Add image
              </button>
            </div>
            <div className="space-y-2">
              {(form.images || []).map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={e =>
                      setForm(f => {
                        const next = [...(f.images || [])];
                        next[idx] = e.target.value;
                        return { ...f, images: next };
                      })
                    }
                    className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#ff7900] transition-colors text-sm"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm(f => {
                        const next = [...(f.images || [])];
                        next.splice(idx, 1);
                        return { ...f, images: next.length ? next : [''] };
                      })
                    }
                    className="px-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors text-sm"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-2">
              Add extra images to enable the slider on the product details page.
            </p>
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Available Sizes *</label>
            <div className="flex gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-12 h-10 rounded-lg text-sm font-semibold border-2 transition-all ${
                    form.sizes.includes(size)
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#ff7900] transition-colors text-sm resize-none"
              placeholder="Product description..."
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { key: 'is_featured', label: 'Featured' },
              { key: 'is_new_arrival', label: 'New Arrival' },
              { key: 'is_published', label: 'Published' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                  className="w-4 h-4 accent-gray-900"
                />
                <span className="text-gray-700 text-sm">{label}</span>
              </label>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <span className="text-gray-900 text-sm font-semibold block">Out of Stock Status</span>
              <span className="text-gray-500 text-xs">Mark this product as out of stock to disable purchases.</span>
            </div>
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, is_out_of_stock: !f.is_out_of_stock }))}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                form.is_out_of_stock ? 'bg-red-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  form.is_out_of_stock ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold border border-gray-300 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm"
            >
              {saving ? <LoadingSpinner size="sm" /> : <><Save className="w-4 h-4" /> {initial ? 'Update' : 'Add Product'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<boolean>(false);
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    fetchProducts();
  }, [session]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    setProducts((data as Product[]) || []);
    setLoadingProducts(false);
  };

  const handleSave = async (form: typeof emptyForm) => {
    const payloadWithOutOfStock = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes,
      image: form.image,
      description: form.description,
      is_featured: form.is_featured,
      is_new_arrival: form.is_new_arrival,
      is_published: form.is_published,
      is_out_of_stock: form.is_out_of_stock,
      crossed_out_price: form.crossed_out_price ? Number(form.crossed_out_price) : null,
    };

    // Payload without is_out_of_stock — used as fallback if the column doesn't exist yet in DB
    const payloadBase = (() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { is_out_of_stock: _oos, ...rest } = payloadWithOutOfStock;
      return rest;
    })();

    const maybeImages = (form.images || []).map(s => s.trim()).filter(Boolean);

    const withImages = (base: Record<string, unknown>) =>
      maybeImages.length > 0 ? { ...base, images: maybeImages } : base;

    const save = async (payload: Record<string, unknown>) => {
      if (editProduct) {
        return await supabase.from('products').update(payload as never).eq('id', editProduct.id);
      }
      return await supabase.from('products').insert(payload as never);
    };

    const isMissingColumn = (msg: string, col: string) =>
      new RegExp(`could not find the '${col}' column|column .*${col}|${col}.*column|schema cache`, 'i').test(msg);

    // First attempt: full payload with is_out_of_stock + images
    const { error: err1 } = await save(withImages(payloadWithOutOfStock));

    if (!err1) {
      await fetchProducts();
      setEditProduct(undefined);
      return;
    }

    const msg1 = String((err1 as { message?: unknown }).message ?? '');

    // Fallback 1: is_out_of_stock column missing — retry without it (but keep images)
    if (isMissingColumn(msg1, 'is_out_of_stock')) {
      const { error: err2 } = await save(withImages(payloadBase));
      if (!err2) {
        await fetchProducts();
        setEditProduct(undefined);
        return;
      }
      const msg2 = String((err2 as { message?: unknown }).message ?? '');
      // Fallback 2: images column also missing
      if (isMissingColumn(msg2, 'images')) {
        const { error: err3 } = await save(payloadBase);
        if (err3) throw err3;
        await fetchProducts();
        setEditProduct(undefined);
        return;
      }
      throw err2;
    }

    // Fallback: images column missing — retry without images
    if (isMissingColumn(msg1, 'images')) {
      const { error: err2 } = await save(payloadWithOutOfStock);
      if (err2) throw err2;
      await fetchProducts();
      setEditProduct(undefined);
      return;
    }

    throw err1;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    await supabase.from('products').delete().eq('id', id);
    await fetchProducts();
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) return <LoginForm onLogin={() => setSession(true)} />;

  return (
    <div className="min-h-screen bg-white pt-20">
      {(showForm || editProduct) && (
        <ProductFormModal
          initial={editProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditProduct(undefined); }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Product Manager</h1>
            <p className="text-gray-500 text-sm mt-1">{products.length} products total</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all text-sm"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-xl transition-all text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {loadingProducts ? (
          <div className="py-16 flex justify-center"><LoadingSpinner size="lg" /></div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-5 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">Product</th>
                    <th className="text-left px-4 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold hidden sm:table-cell">Category</th>
                    <th className="text-left px-4 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">Price</th>
                    <th className="text-left px-4 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">Flags</th>
                    <th className="text-right px-5 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-700"
                          />
                          <div className="min-w-0">
                            <p className="text-gray-900 text-sm font-medium truncate max-w-[180px]">{product.name}</p>
                            <p className="text-gray-600 text-xs mt-0.5">{product.sizes.join(', ')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-gray-400 text-sm">{product.category}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-gray-900 font-semibold text-sm">
                          &#8377;{product.price.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex gap-1.5 flex-wrap">
                          {product.is_featured && (
                            <span className="text-xs bg-yellow-900/50 text-yellow-400 px-2 py-0.5 rounded-full">Featured</span>
                          )}
                          {product.is_new_arrival && (
                            <span className="text-xs bg-gray-900/50 text-gray-400 px-2 py-0.5 rounded-full">New</span>
                          )}
                          {product.is_out_of_stock && (
                            <span className="text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full">Out of Stock</span>
                          )}
                          {!product.is_published && (
                            <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditProduct(product)}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                            title="Delete"
                          >
                            {deletingId === product.id ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-gray-500">
                        No products yet. Click "Add Product" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
