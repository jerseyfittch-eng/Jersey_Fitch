import { Shirt, Instagram, MessageCircle, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Link from './Link';
import { WHATSAPP_NUMBER, CONTACT_EMAIL, CONTACT_ADDRESS, formatWhatsAppNumberForDisplay, INSTAGRAM_URL, FACEBOOK_URL } from '../lib/config';

export default function Footer() {
  const handleWholesaleClick = () => {
    const message = `*Wholesale Inquiry - JERSEY FITCH* 🏆

📊 *Interested in Wholesale Pricing*

I would like to inquire about wholesale jersey orders for:
• [Team/Club/Business Name]
• [Quantity Required]
• [Specific Categories: International/Clubs/Retros]
• [Contact Information]

Please provide wholesale pricing and bulk order details.

---
*Sent via JERSEY FITCH Website*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
               <img src="/favicon.png" alt="Jersey Fitch" className="h-[60px] w-auto self-center" />               
            </Link>
            {/* <span className="text-gray-900 font-bold text-xl tracking-tight">
              JERSEY <span className="text-[#ff7900]">FITCH</span>
            </span> */}
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop destination for premium football, cricket, and custom jerseys.
              Quality you can feel, style you can wear.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-[#ff7900] hover:text-white transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi JERSEY FITCH! I have a question.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop All', to: '/shop' },
                { label: 'International', to: '/shop?category=International' },
                { label: 'Clubs', to: '/shop?category=Clubs' },
                { label: 'Retros', to: '/shop?category=Retros' },
                { label: 'Wholesale Orders', to: '#', onClick: handleWholesaleClick },
              ].map(link => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-gray-600 text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Cart', to: '/cart' },
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Return Policy', to: '/return-policy' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[#ff7900] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-900 flex-shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#ff7900] text-sm transition-colors"
                >
                  {formatWhatsAppNumberForDisplay(WHATSAPP_NUMBER)} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-900 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-400 hover:text-[#ff7900] text-sm transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JERSEY FITCH. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-600 sm:text-right">
            Orders via WhatsApp &mdash; No online payment required
          </p>
        </div>
      </div>
    </footer>
  );
}
