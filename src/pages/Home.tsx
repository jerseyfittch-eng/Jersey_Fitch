import { ArrowRight, Zap, Shield, Truck, X } from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import Link from '../components/Link';
import { useProducts } from '../hooks/useProducts';
import ProductCollectionCarousel from '../components/ProductCollectionCarousel';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '../lib/config';

const categories = [
  {
    name: 'International',
    desc: 'Premium national team jerseys - player & fan versions',
    image: '/nation j.png',
    color: 'from-blue-900/80',
  },
  {
    name: 'Club',
    desc: 'Top football club replicas with premium quality',
    image: '/club j.png',
    color: 'from-green-900/80',
  },
  {
    name: 'Retro',
    desc: 'Vintage and classic jersey designs',
    image: '/retro j.png',
    color: 'from-orange-900/80',
  },
];

const features = [
  { icon: Shield, title: 'Premium Quality', desc: 'Player & fan versions with heat pressed printing' },
  { icon: Truck, title: 'FREE Shipping', desc: 'Pan-India delivery at no extra cost' },
  { icon: Zap, title: 'GST Savings', desc: 'Save on GST when ordering via WhatsApp' },
  // { icon: Star, title: 'Trusted by 5000+', desc: 'Happy customers across India' },
];

const heroSlides = [
  {
    id: 1,
    badge: 'WORLD CUP 2026',
    title: ['Premium Football', 'Jerseys'],
    description:
      'Premium player and fan version jerseys inspired by World Cup 2026.',
    stats: [
      { value: '100%', label: 'Premium Quality' },
      { value: '2026', label: 'World Cup Edition' },
    ],
  },
  {
    id: 2,
    badge: 'CLUBS & NATIONAL TEAMS',
    title: ['Latest Kits &', 'Retro Classics'],
    description:
      'Shop latest club kits, national team jerseys, and retro classics.',
    stats: [
      { value: 'Player', label: 'Version Available' },
      { value: 'Retro', label: 'Classic Collection' },
    ],
  },
  {
    id: 3,
    badge: 'FREE SHIPPING INDIA',
    title: ['Order Your', 'Favorite Jersey'],
    description:
      'Free shipping all over India with easy WhatsApp ordering.',
    stats: [
      { value: 'FREE', label: 'Shipping Nationwide' },
      { value: 'Easy', label: 'WhatsApp Orders' },
    ],
  },
];
function NewArrivalsSection() {
  const { products, loading } = useProducts();
  const newArrivals = products.filter(p => p.is_new_arrival).slice(0, 16);

  if (loading) return null;

  return (
    <section className="pt-4 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">World Cup</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-700 font-medium text-xs sm:text-sm transition-colors">
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCollectionCarousel products={newArrivals} />
      </div>
    </section>
  );
} 
  function FeaturedSection() {
  const { products, loading } = useProducts();
  const featured = products.filter(p => p.is_featured).slice(0, 16);

  if (loading) return <div className="py-10 flex justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <section className="pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Handpicked</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Featured Jerseys</h2>
        </div>
        <Link to="/shop" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-700 font-medium text-xs sm:text-sm transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <ProductCollectionCarousel products={featured} />
    </section>
  );
}


function CustomOrderForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    quantity: '',
    teamName: '',
    designRequired: 'yes',
    customizations: '',
    deliveryDate: '',
    contactNumber: '',
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Custom Jersey Order Request* 🏆

📊 *Order Details:*
• Quantity: ${formData.quantity} jerseys
• Team Name: ${formData.teamName}
• Design Required: ${formData.designRequired}
• Customizations: ${formData.customizations || 'None'}
• Delivery Date: ${formData.deliveryDate || 'ASAP'}

📞 *Contact Information:*
• Phone: ${formData.contactNumber}

📝 *Additional Notes:*
${formData.additionalNotes || 'None'}

---
*Please review and confirm the order details. Thank you!*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Custom Jersey Order</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Number of jerseys"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team/Club Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Your team name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Required *
            </label>
            <select
              name="designRequired"
              value={formData.designRequired}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7900] focus:border-transparent"
            >
              <option value="yes">Yes - I need design help</option>
              <option value="no">No - I have my own design</option>
              <option value="maybe">Maybe - Need consultation</option>
            </select>
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Delivery Date
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Your WhatsApp number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7900] focus:border-transparent"
              placeholder="Any other requirements or questions..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
            >
              Send to WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  const handleCustomOrderClick = () => {
    setIsCustomOrderOpen(true);
  };

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
*Sent via JERSEY FITCH Homepage*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/nation j.png"
        >
          <source src="/hero vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
              <span className="text-gray-900 text-xs sm:text-sm font-medium">{heroSlides[currentSlide].badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {heroSlides[currentSlide].title[0]}
              <span className="block text-gray-200">{heroSlides[currentSlide].title[1]}</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {heroSlides[currentSlide].stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {/* <button
          onClick={goToPreviousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button> */}

              </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Browse by Sport</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => navigate(`/shop?category=${cat.name}`)}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-black text-xl sm:text-2xl mb-1">{cat.name}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-gray-600 text-sm font-medium">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      
      <NewArrivalsSection />
      <FeaturedSection />



      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-gray-300 transition-colors w-full sm:w-[calc(33.333%-1rem)]">
              <div className="w-12 h-12 bg-gray-900/10 border border-gray-900/20 rounded-xl align-middle flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-10 pb-5 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-900/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900/5 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-3">Design Your Own</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Create a Custom Jersey
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Add your name, number, club logo & sponsor patches. Single pieces or bulk team orders — all welcome.
              </p>
              <button
                onClick={handleCustomOrderClick}
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Start Customizing <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-900/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900/5 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-3">Bulk Orders</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Wholesale Pricing Available
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Looking for bulk jersey orders for your team, club, or business? Get special wholesale pricing on all our premium jerseys.
              </p>
              <button
                onClick={handleWholesaleClick}
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Get Wholesale Quote <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CustomOrderForm 
        isOpen={isCustomOrderOpen} 
        onClose={() => setIsCustomOrderOpen(false)} 
      />
    </div>
  );
}
