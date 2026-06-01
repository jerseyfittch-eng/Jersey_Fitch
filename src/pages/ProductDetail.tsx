import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  Tag,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Minus,
  Plus,
} from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import Link from '../components/Link';
import { SITE_CANONICAL } from '../lib/site';

interface Props {
  id: string;
}

const QUANTITY_MAX = 99;

function clampQuantity(n: number) {
  return Math.min(QUANTITY_MAX, Math.max(1, Math.floor(Number.isFinite(n) ? n : 1)));
}

export default function ProductDetail({ id }: Props) {
  const { product, loading, error } = useProduct(id);
  const { products: catalogProducts, loading: catalogLoading } = useProducts();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setDescriptionExpanded(false);
    setQuantity(1);
    setSelectedSize('');
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const stripHtml = (html: string) =>
      html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const plain = stripHtml(product.description || '');
    const description =
      plain.length > 155 ? `${plain.slice(0, 152)}…` : plain ||
        `${product.name} — football jersey in India. Player & fan kits at Jersey Fitch.`;

    const title = `${product.name} | Football Jersey India | Jersey Fitch`;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const setProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setProp('og:title', title);
    setProp('og:description', description);
    setProp('og:url', `${SITE_CANONICAL}/#/product/${id}`);

    const img = product.images?.[0] ?? product.image;
    const ogImage = img?.startsWith('http')
      ? img
      : img
        ? new URL(img.startsWith('/') ? img : `/${img}`, SITE_CANONICAL).href
        : `${SITE_CANONICAL}/og-image.jpg`;
    setProp('og:image', ogImage);
    setProp('og:image:alt', `${product.name} — Jersey Fitch India`);

    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
  }, [product, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">Product not found</p>
        <button
          onClick={() => navigate('/shop')}
          className="text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>
      </div>
    );
  }

  const newArrivalsOthers = catalogProducts
    .filter(p => p.is_new_arrival && p.id !== product.id)
    .slice(0, 4);
  const featuredOthers = catalogProducts
    .filter(p => p.is_featured && p.id !== product.id)
    .slice(0, 4);

  const fullDescription = product.description ?? '';
  const DESCRIPTION_PREVIEW_LINES = 4;
  const DESCRIPTION_PREVIEW_CHARS = 260;
  const { descriptionPreview, descriptionNeedsToggle } = (() => {
    if (!fullDescription.trim()) {
      return { descriptionPreview: '', descriptionNeedsToggle: false };
    }
    const lines = fullDescription.split('\n');
    const overLines = lines.length > DESCRIPTION_PREVIEW_LINES;
    const overChars = fullDescription.length > DESCRIPTION_PREVIEW_CHARS;
    if (!overLines && !overChars) {
      return { descriptionPreview: fullDescription, descriptionNeedsToggle: false };
    }
    if (overLines) {
      let truncated = lines.slice(0, DESCRIPTION_PREVIEW_LINES).join('\n');
      if (truncated.length > DESCRIPTION_PREVIEW_CHARS) {
        truncated = truncated.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd();
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > DESCRIPTION_PREVIEW_CHARS * 0.55) {
          truncated = truncated.slice(0, lastSpace);
        }
        truncated += '…';
      }
      return { descriptionPreview: truncated, descriptionNeedsToggle: true };
    }
    let cut = fullDescription.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd();
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > DESCRIPTION_PREVIEW_CHARS * 0.55) {
      cut = cut.slice(0, lastSpace);
    }
    return { descriptionPreview: `${cut}…`, descriptionNeedsToggle: true };
  })();

  const images: string[] = (() => {
    const maybeImages = (product as unknown as { images?: unknown }).images;
    const extraImages = Array.isArray(maybeImages)
      ? maybeImages.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
      : [];

    return Array.from(new Set([product.image, ...extraImages].filter(Boolean)));
  })();

  const safeActiveIndex = images.length === 0 ? 0 : Math.min(Math.max(activeImageIndex, 0), images.length - 1);
  const activeImage = images[safeActiveIndex] ?? product.image;
  const showSliderControls = images.length > 1;
  const crossedOutPrice = product.crossed_out_price;
  const showCrossedPrice =
    typeof crossedOutPrice === 'number' && crossedOutPrice > 0;

  const flashSizeRequired = () => {
    setSizeError(true);
    setTimeout(() => setSizeError(false), 2500);
  };

  const cartPayload = () => ({
    product_id: product.id,
    product_code: product.product_code,
    name: product.name,
    price: product.price,
    size: selectedSize,
    quantity: clampQuantity(quantity),
    image: product.image,
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      flashSizeRequired();
      return;
    }
    addItem(cartPayload());
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      flashSizeRequired();
      return;
    }
    addItem(cartPayload());
    navigate('/cart');
  };

  const outOfStock = product.stock_status === 'out_of_stock';
  const qty = clampQuantity(quantity);

  const categoryColor: Record<string, string> = {
    International: 'bg-blue-900/60 text-blue-300',
    Club: 'bg-green-900/60 text-green-300',
    Retro: 'bg-orange-900/60 text-orange-300',
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-square relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {showSliderControls && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => setActiveImageIndex(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActiveImageIndex(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {images.length >= 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    aria-label={`View image ${idx + 1}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-16 rounded-xl overflow-hidden border transition-colors flex-shrink-0 ${
                      idx === safeActiveIndex ? 'border-gray-900' : 'border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {showSliderControls && (
              <div className="mt-3 flex items-center justify-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to image ${idx + 1}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === safeActiveIndex ? 'bg-gray-900' : 'bg-gray-700 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            )}

            {product.is_new_arrival && (
              <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                NEW ARRIVAL
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${categoryColor[product.category] || 'bg-gray-700 text-gray-300'}`}>
                <Tag className="w-3 h-3" />
                {product.category}
              </span>
              {product.stock_status === 'low_stock' && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-900/50 text-yellow-400">
                  Low Stock
                </span>
              )}
              {product.stock_status === 'out_of_stock' && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-900/50 text-gray-400">
                  Out of Stock
                </span>
              )}
              {product.is_featured && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-900/50 text-yellow-400">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-col mb-6">
              <div className="flex flex-row flex-wrap items-baseline justify-start gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#000]">
                  &#8377;{product.price.toLocaleString('en-IN')}
                </span>
                {showCrossedPrice && (
                  <span className="text-[#666] text-sm sm:text-base line-through">
                    &#8377;{crossedOutPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

               <div className="mb-4">
                 <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold border border-green-200">
                 ✓ Free Shipping
                 </span>
              </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 text-sm sm:text-base font-semibold">Select Size</span>
                {sizeError && (
                  <span
                    role="alert"
                    className="text-[#ff7900] text-sm font-medium"
                  >
                    Please select a size
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-14 h-14 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-900/30'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-gray-900 text-sm sm:text-base font-semibold mb-3 block">Quantity</span>
              <div
                className={`inline-flex items-stretch rounded-xl border overflow-hidden ${
                  outOfStock ? 'border-gray-200 opacity-60' : 'border-gray-300'
                }`}
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={outOfStock || qty <= 1}
                  onClick={() => setQuantity(q => clampQuantity(q - 1))}
                  className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-gray-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={QUANTITY_MAX}
                  disabled={outOfStock}
                  value={qty}
                  onChange={e => {
                    const raw = e.target.value;
                    if (raw === '') return;
                    const n = parseInt(raw, 10);
                    if (Number.isNaN(n)) return;
                    setQuantity(clampQuantity(n));
                  }}
                  onBlur={() => setQuantity(q => clampQuantity(q))}
                  className="w-14 sm:w-16 h-11 sm:h-12 border-x border-gray-300 text-center text-sm font-bold text-gray-900 bg-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none disabled:bg-gray-50"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={outOfStock || qty >= QUANTITY_MAX}
                  onClick={() => setQuantity(q => clampQuantity(q + 1))}
                  className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-gray-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={`flex-1 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all duration-300 ${
                  added
                    ? 'bg-green-600 scale-95'
                    : outOfStock
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5'
                }`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart</>
                ) : outOfStock ? (
                  <>Out of Stock</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={outOfStock}
                className={`flex-1 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base border transition-all duration-200 ${
                  outOfStock
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 hover:border-gray-400'
                }`}
              >
                Buy Now
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-gray-900 text-sm sm:text-base font-semibold mb-3">Description</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {descriptionNeedsToggle && !descriptionExpanded
                  ? descriptionPreview
                  : fullDescription}
              </p>
              {descriptionNeedsToggle ? (
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded(e => !e)}
                  className="mt-2 flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-800 hover:text-gray-950 transition-colors"
                  aria-expanded={descriptionExpanded}
                >
                  {descriptionExpanded ? 'Show less' : 'Show more'}
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      descriptionExpanded ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, title: 'Fast Delivery', desc: '3–7 business days' },
                { icon: Shield, title: 'Quality Assured', desc: 'This premium fabric' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                  <Icon className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gray-900 text-sm font-medium">{title}</div>
                    <div className="text-gray-500 text-xs">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!catalogLoading && newArrivalsOthers.length > 0 ? (
          <section className="pt-10 pb-6 bg-gray-50 mt-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Just Dropped</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
                </div>
                <Link
                  to="/shop"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors shrink-0"
                >
                  Shop All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newArrivalsOthers.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {!catalogLoading && featuredOthers.length > 0 ? (
          <section className="pt-6 pb-10 mt-0 max-w-7xl mx-auto px-0">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Handpicked</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Featured Jerseys</h2>
              </div>
              <Link
                to="/shop"
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors shrink-0"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredOthers.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
