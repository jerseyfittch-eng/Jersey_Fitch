import { ShoppingCart } from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import type { Product } from '../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const gallery = Array.from(
    new Set([product.image, ...(product.images ?? [])].filter((u): u is string => Boolean(u)))
  );
  const primarySrc = gallery[0] ?? product.image;
  const hoverSrc = gallery[2];

  return (
    <div
      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={primarySrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        {hoverSrc && (
          <img
            src={hoverSrc}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-[1.02]"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="mb-3 space-y-2">
          <div className="flex items-baseline justify-start gap-2 w-full min-w-0">
            <span className="text-gray-900 font-bold text-lg min-w-0">
              &#8377;{product.price.toLocaleString('en-IN')}
            </span>
            {product.crossed_out_price && (
              <span className="text-gray-500 text-sm line-through shrink-0">
                &#8377;{product.crossed_out_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <button
            type="button"
            className="w-full py-2 px-3 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
