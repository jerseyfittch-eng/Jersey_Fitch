import { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  ChevronDown,
} from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
  BUSINESS_NAME,
  formatWhatsAppNumberForDisplay,
} from '../lib/config';

const contactInfo = [
  { icon: Phone, label: 'Phone / WhatsApp', value: formatWhatsAppNumberForDisplay(WHATSAPP_NUMBER) },
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL },
  { icon: MapPin, label: 'Address', value: CONTACT_ADDRESS },
  { icon: Clock, label: 'Response time', value: 'Typically within 24 hours' },
];

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse the shop, open a product, choose your size and quantity, then use Add to Cart or Buy Now. You can complete your order through WhatsApp — we confirm details, share payment instructions (UPI), and arrange shipping. We do not take card payments on the website.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders ship within a few days and reach you in about 3–7 business days across India, depending on your location and courier load. You will get updates on WhatsApp once your kit is dispatched.',
  },
  {
    q: 'Can I return or exchange a jersey?',
    a: 'Contact us on WhatsApp or email with your order details and photos within 48 hours of delivery if something is wrong (size issue, defect, or wrong item). We handle returns and support case-by-case in line with our policy.',
  },
  {
    q: 'How do I pick the right size?',
    a: 'Each product page lists available sizes. If you are between sizes or ordering for a team, message us on WhatsApp with height/chest measurements and we will suggest the best fit before you pay.',
  },
  {
    q: 'Do you offer player version and fan version jerseys?',
    a: 'Yes. We stock premium fan versions and player-style replicas where available. Product titles and descriptions call out the version — ask on WhatsApp if you want to double-check before ordering.',
  },
  {
    q: 'Is cash on delivery (COD) available?',
    a: 'Currently we confirm orders and payments through WhatsApp (UPI and screenshot verification). COD is not available — this keeps pricing clear and helps us pass savings on to you.',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    shippingAddress: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWhatsApp = () => {
    const lines = [
      'Hi JERSEY FITCH!',
      '',
      `Name: ${form.name}`,
      `Phone / WhatsApp: ${form.phone}`,
      form.email.trim() ? `Email: ${form.email}` : null,
      form.shippingAddress.trim() ? `Shipping address: ${form.shippingAddress}` : null,
      '',
      'Message:',
      form.message,
    ].filter(Boolean) as string[];
    const msg = lines.join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const isValid = form.name.trim() && form.phone.trim() && form.message.trim();

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-14 border-b border-gray-200 pb-14 text-center md:mb-16 md:pb-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Questions?</p>
          <h1 className="mb-5 text-4xl font-black text-gray-900 md:text-5xl">Get In Touch With Us</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            We are always here to help you with any questions or concerns you may have. Whether it is about your order,
            returns, or general inquiries, our team is ready to assist you. Feel free to reach out during business hours,
            and we will handle your queries with clarity and care.
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 px-6 py-6 text-left text-sm text-gray-700 md:px-8 md:py-8">
            <p className="mb-4 border-b border-gray-200 pb-4">
              <span className="font-bold text-gray-900">Business Name:</span>{' '}
              <span className="text-gray-800">{BUSINESS_NAME}</span>
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-900">For sales related inquiries:</span>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff7900] underline hover:text-[#e66d00]">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-900">For returns and support:</span>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff7900] underline hover:text-[#e66d00]">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-900">For general concerns:</span>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#ff7900] underline hover:text-[#e66d00]">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Prefer a fast reply? Use WhatsApp below — we usually respond sooner there.
            </p>
          </div>
        </section>

        <section className="mb-14 md:mb-16">
          <h2 className="mb-2 text-center text-2xl font-black text-gray-900 md:text-3xl">Frequently asked questions</h2>
          <p className="mb-8 text-center text-sm text-gray-500">Tap a question to show or hide the answer.</p>
          <div className="mx-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <div className="border-t border-gray-100 bg-gray-50/80 px-5 py-4 text-sm leading-relaxed text-gray-600">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Contact</p>
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Send us a message</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
            Details you share are used only to help with your request, as described in our Privacy Policy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="flex flex-col gap-5 lg:col-span-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#ff7900]/20 bg-[#ff7900]/10">
                  <Icon className="h-5 w-5 text-[#ff7900]" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
                  <p className="break-words text-sm font-medium text-gray-900">{value}</p>
                </div>
              </div>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I have a question about jerseys.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-bold text-white transition-all duration-200 hover:bg-green-500 hover:shadow-lg hover:shadow-green-600/30"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 lg:col-span-3">
            <h3 className="mb-2 text-xl font-bold text-gray-900">Message form</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              We may collect what you voluntarily share: your{' '}
              <span className="font-medium text-gray-700">name</span>,{' '}
              <span className="font-medium text-gray-700">phone number</span>,{' '}
              <span className="font-medium text-gray-700">email address</span>, optional{' '}
              <span className="font-medium text-gray-700">shipping address</span>, and your{' '}
              <span className="font-medium text-gray-700">message</span>.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#ff7900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#ff7900] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder={CONTACT_EMAIL}
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#ff7900] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Shipping address</label>
                <textarea
                  rows={3}
                  value={form.shippingAddress}
                  onChange={e => setForm(f => ({ ...f, shippingAddress: e.target.value }))}
                  placeholder="Optional — for delivery or order shipment questions."
                  autoComplete="street-address"
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#ff7900] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">Message / order details *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Sizing, bulk order, custom design, order ID, or anything else we should know."
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#ff7900] focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={!isValid}
                className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-4 font-bold transition-all duration-300 ${
                  sent
                    ? 'bg-green-600 text-white'
                    : isValid
                    ? 'bg-[#ff7900] text-white shadow-lg shadow-[#ff7900]/30 hover:-translate-y-0.5 hover:bg-[#e66d00] hover:shadow-lg'
                    : 'cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-500'
                }`}
              >
                {sent ? (
                  <>
                    <Check className="h-5 w-5" /> Opened WhatsApp!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send via WhatsApp
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-600">
                Your message opens in WhatsApp. We do not store payment credentials; confirmation is completed there as
                in our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
