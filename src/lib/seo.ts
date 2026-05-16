import { SITE_CANONICAL } from './site';

function ensureMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const brand = 'Jersey Fitch';

const PAGE_SEO: Record<
  string,
  { title: string; description: string; robots?: string }
> = {
  '/': {
    title: `${brand} — Buy Football Jerseys Online India | Player & Fan Kits | Free Delivery`,
    description:
      'Shop premium football jerseys in India at Jersey Fitch. Player version & fan version kits, international & club jerseys, retro classics. WhatsApp ordering, free pan-India shipping, Malappuram Kerala based trusted store.',
  },
  '/shop': {
    title: `Football Jerseys Online India | International, Club & Retro | ${brand}`,
    description:
      'Browse football jerseys online in India: international kits, club replicas, retro jerseys. Premium quality, sizes S–XL+, WhatsApp checkout and delivery across all states.',
  },
  '/about': {
    title: `About Us | Premium Football Jerseys India | ${brand}`,
    description:
      'Learn about Jersey Fitch — India’s trusted football jersey store. Quality-first kits, WhatsApp orders, free shipping, team & bulk orders from Malappuram, Kerala.',
  },
  '/contact': {
    title: `Contact & Support | WhatsApp & Email | ${brand} India`,
    description:
      'Contact Jersey Fitch for orders, sizing, returns, and bulk jerseys. WhatsApp & email support, fast replies, shipping across India.',
  },
  '/cart': {
    title: `Shopping Cart | Checkout via WhatsApp | ${brand}`,
    description:
      'Review your Jersey Fitch cart and send your order on WhatsApp. Secure UPI payment guidance, delivery all over India.',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${brand} India`,
    description:
      'How Jersey Fitch collects and uses your data for orders, WhatsApp, and delivery in India. No payment card storage on our site.',
  },
  '/return-policy': {
    title: `Return & Exchange Policy | ${brand} India`,
    description:
      'Jersey Fitch return policy: wrong size, defects, wrong item. Send photos within 24 hours of delivery. Return shipping may be deducted from refund.',
  },
};

const DEFAULT = PAGE_SEO['/']!;

function matchPage(path: string) {
  if (path === '/' || path === '') return PAGE_SEO['/']!;
  if (path.startsWith('/admin')) return null;
  if (path.startsWith('/product/')) {
    return {
      title: `Football Jersey | Shop Online India | ${brand}`,
      description:
        'View this premium football jersey at Jersey Fitch — player or fan version, sizes and price for India delivery. Order on WhatsApp.',
    };
  }
  const hit = PAGE_SEO[path];
  if (hit) return hit;
  return DEFAULT;
}

/** Sync document title and core meta tags for the current hash route (helps crawlers that run JS). */
export function applyRouteSeo(path: string) {
  const seo = matchPage(path);
  if (!seo) {
    document.title = `Admin | ${brand}`;
    ensureMeta('robots', 'noindex, nofollow');
    ensureCanonical(SITE_CANONICAL);
    const defaultOg = `${SITE_CANONICAL}/og-image.jpg`;
    ensureMetaProperty('og:image', defaultOg);
    ensureMeta('twitter:image', defaultOg);
    return;
  }

  document.title = seo.title;
  ensureMeta('description', seo.description);
  ensureMeta('robots', seo.robots ?? 'index, follow');
  ensureCanonical(SITE_CANONICAL);

  ensureMetaProperty('og:title', seo.title);
  ensureMetaProperty('og:description', seo.description);
  ensureMetaProperty('og:url', SITE_CANONICAL);
  ensureMetaProperty('og:type', 'website');
  const defaultOg = `${SITE_CANONICAL}/og-image.jpg`;
  ensureMetaProperty('og:image', defaultOg);
  ensureMetaProperty('og:image:alt', `${brand} — football jerseys India`);

  ensureMeta('twitter:title', seo.title);
  ensureMeta('twitter:description', seo.description);
  ensureMeta('twitter:image', defaultOg);
}
