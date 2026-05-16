import { Shield, Truck, Star, Users, Zap, Award, Instagram } from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import { WHATSAPP_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/config';

const values = [
  { icon: Shield, title: 'Premium Quality Only', desc: 'Player version replicas (exactly what players wear) and high-quality fan versions. No low-quality prints - only premium heat pressed printing on superior fabric.' },
  { icon: Zap, title: 'WhatsApp GST Savings', desc: 'Order via WhatsApp and save on GST charges! Unlike online payment gateways (Razorpay, Stripe) that include GST in pricing, WhatsApp orders help reduce your total cost.' },
  { icon: Users, title: 'Team Orders Welcome', desc: 'From a single custom jersey to a full team kit of 50, we handle team orders with dedicated support and attention to detail.' },
  { icon: Award, title: 'International & Clubs', desc: 'Premium national team jerseys, top football club replicas, and retro classics. All with authentic designs and superior craftsmanship.' },
  { icon: Truck, title: 'FREE Shipping', desc: 'Absolutely FREE shipping anywhere in India. No hidden charges, no extra costs - just the price you see, delivered to your doorstep.' },
  { icon: Star, title: 'Cricket Coming Soon', desc: 'Premium cricket jerseys launching soon! Same quality and attention to detail as our football collection.' },
];

/** 2×2 collage — shown above each story heading */
const collageImages = [
  'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function CollageFour({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${className}`}>
      {collageImages.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="aspect-square overflow-hidden rounded-[10px] border border-gray-200 bg-gray-100 shadow-md"
        >
          <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1200)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Our Story</p>
          <p className="mb-4 text-sm font-semibold text-gray-600">Welcome to Jersey Fitch</p>
          <h1 className="mb-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            Fueled by Sport.
            <br />
            Crafted with Passion.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
            Jersey Fitch was started with a simple idea: give football fans across India a trusted place to buy jerseys
            they can wear with pride. Too often we saw supporters overcharged, let down by random sellers, or stuck with
            flimsy prints that did not match the passion they feel for the game. We stepped in — not as a faceless
            marketplace, but as people who love the sport and wanted a better experience for the community.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Block 1 — collage above heading */}
        <section className="mb-20">
          <div className="mx-auto mb-8 max-w-xl sm:max-w-2xl">
            <CollageFour />
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-3xl font-black text-gray-900">Who we are</h2>
            <p className="leading-relaxed text-gray-600">
              Based in <span className="font-semibold text-gray-800">Malappuram, Kerala</span>, we serve fans and teams
              all over India. Our store is built around trust: clear communication on WhatsApp, honest pricing, and kits
              that look and feel the part — whether you want a player-version replica or a solid fan jersey for everyday
              wear.
            </p>
            <p className="leading-relaxed text-gray-600">
              We are still growing, but our mission has not changed: make premium football jerseys easier to access for
              every supporter who wants to rep their club or country without compromise.
            </p>
          </div>
        </section>

        {/* Block 2 — collage above heading */}
        <section className="mb-20">
          <div className="mx-auto mb-8 max-w-xl sm:max-w-2xl">
            <CollageFour />
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Our focus</p>
            <h2 className="text-3xl font-black text-gray-900">Quality above everything</h2>
            <p className="leading-relaxed text-gray-600">
              Our focus is quality first. Every jersey we source is checked for fabric, stitching, and finish — heat
              pressed where it matters — so what you receive feels close to the real deal. A jersey is more than fabric:
              it is pride in your colours, memories of big nights, and identity on the pitch or in the stands.
            </p>
            <p className="leading-relaxed text-gray-600">
              We would rather say no to a batch than ship something we would not wear ourselves. That standard is what
              we want Jersey Fitch to stand for.
            </p>
          </div>
        </section>

        {/* Block 3 — collage above heading */}
        <section className="mb-24">
          <div className="mx-auto mb-8 max-w-xl sm:max-w-2xl">
            <CollageFour />
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Community</p>
            <h2 className="text-3xl font-black text-gray-900">More than just customers</h2>
            <p className="leading-relaxed text-gray-600">
              We do not see you as a one-off order. You are part of a wider community of fans, players, and kit lovers
              who care about how they show up for their team. Every message and every order carries trust — and we take
              that seriously, from sizing help to tracking your delivery.
            </p>
            <p className="leading-relaxed text-gray-600">
              Whether you are ordering one shirt or outfitting a squad, we are here to make the process straightforward,
              human, and worth coming back for.
            </p>
          </div>
        </section>

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Why Choose Us</p>
          <h2 className="text-3xl font-black text-gray-900">What Makes Us Different</h2>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-[#ff7900]/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#ff7900]/20 bg-[#ff7900]/10">
                <Icon className="h-6 w-6 text-[#ff7900]" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20 rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-10 md:p-16">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-green-600/20 bg-green-600/10">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-4 text-3xl font-black text-gray-900">Save Money with WhatsApp Orders</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Why do we recommend WhatsApp ordering? It is simple — you save money.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-[#ff7900]">Online Payment Gateways</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#ff7900]">•</span>
                  <span>Include GST charges in total price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#ff7900]">•</span>
                  <span>Payment processing fees (2–3%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#ff7900]">•</span>
                  <span>Higher total cost for customers</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-green-600">WhatsApp Orders</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Reduced GST charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>No payment processing fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Lower total cost for you</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm italic text-gray-600">
              By ordering through WhatsApp, we can pass on the GST savings directly to you, making premium jerseys more
              affordable.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-black p-10 text-center md:p-16">
          <h2 className="mb-4 text-3xl font-black text-white">Ready to Get Your Jersey?</h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-300">
            Browse our collection or design your own custom kit. Order in minutes via WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="rounded-xl bg-white px-8 py-4 font-bold text-black transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20"
            >
              Browse Jerseys
            </button>
            <button
              type="button"
              onClick={() => {
                const message = `*Wholesale Inquiry - JERSEY FITCH* 🏆

📊 *Interested in Wholesale Pricing*

I would like to inquire about wholesale jersey orders for:
• [Team/Club/Business Name]
• [Quantity Required]
• [Specific Categories: International/Clubs/Retros]
• [Contact Information]

Please provide wholesale pricing and bulk order details.

---
*Sent via JERSEY FITCH About Page*`;

                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
              }}
              className="rounded-xl border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-white hover:text-black hover:shadow-lg"
            >
              Wholesale Inquiries
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="rounded-xl border border-gray-500 bg-gray-950 px-8 py-4 font-bold text-white transition-all duration-200 hover:border-gray-400 hover:bg-gray-900"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Instagram — page bottom */}
        <section className="mt-16 mb-16 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-10 md:p-14">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex justify-center md:justify-start">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
                <Instagram className="h-14 w-14 text-[#ff7900]" aria-hidden />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#ff7900]">Find us on Instagram</p>
              <h2 className="mb-1 text-2xl font-black text-gray-900 md:text-3xl">Jersey Fitch</h2>
              <p className="mb-4 font-semibold text-gray-800">@{INSTAGRAM_HANDLE}</p>
              <p className="text-gray-600 leading-relaxed">
                Your go-to destination for premium football kits and jerseys — new drops, behind-the-scenes, and how
                fans wear the colours. Stay in the game, look the part.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-10 flex max-w-5xl justify-center border-t border-gray-200 pt-8 md:mt-12 md:pt-10">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-md items-center justify-center rounded-xl bg-[#ff7900] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ff7900]/25 transition hover:bg-[#e66d00] sm:w-auto"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow us on Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
