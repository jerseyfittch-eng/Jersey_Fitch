/** WhatsApp / wa.me (country code + number, no +) */
export const WHATSAPP_NUMBER = '919961050521';

/** Shown on Contact + Privacy Policy — keep in sync */
export const BUSINESS_NAME = 'Jersey Fitch';
export const CONTACT_EMAIL = 'jerseryfittch@gmail.com';
export const CONTACT_ADDRESS = ' Kerala, India';

/** Instagram — profile link */
export const INSTAGRAM_HANDLE = 'jerseyfitch';
export const INSTAGRAM_URL = 'https://www.instagram.com/jerseyfitch?igsh=ZmVvb3ZuZXg2aWk=';

/** Facebook — page / share link */
export const FACEBOOK_URL = 'https://www.facebook.com/share/1CqrdDwAmQ/?mibextid=wwXIfr';

/** Human-readable India mobile for UI (from WHATSAPP_NUMBER) */
export function formatWhatsAppNumberForDisplay(digits: string) {
  const d = digits.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) {
    const rest = d.slice(2);
    return `+91 ${rest.slice(0, 5)} ${rest.slice(5)}`.trim();
  }
  if (d.length === 10) return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
  return digits.startsWith('+') ? digits : `+${d}`;
}

export const CATEGORIES = ['International', 'Club', 'Retro'] as const;
export type Category = (typeof CATEGORIES)[number];

export const SIZES = ['S', 'M', 'L', 'XL'] as const;
