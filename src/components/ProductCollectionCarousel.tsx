import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductCollectionCarousel({ products }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: true, right: true });

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setEdge({
      left: scrollLeft <= 4,
      right: scrollLeft + clientWidth >= scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      ro.disconnect();
    };
  }, [products, updateEdges]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(240, Math.floor(el.clientWidth * 0.72));
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  const showArrows = !(edge.left && edge.right);

  return (
    <div className="relative">
      {showArrows && !edge.left && (
        <button
          type="button"
          aria-label="Scroll products left"
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-gray-50 md:h-11 md:w-11"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {showArrows && !edge.right && (
        <button
          type="button"
          aria-label="Scroll products right"
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1 sm:translate-x-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition hover:bg-gray-50 md:h-11 md:w-11"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map(p => (
          <div
            key={p.id}
            className="w-[calc(50%-0.5rem)] shrink-0 snap-start sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
