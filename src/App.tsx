import { useEffect } from 'react';
// import { Analytics } from '@vercel/analytics/react';
import { useRouter } from './hooks/useRouter';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import { applyRouteSeo } from './lib/seo';

function Router() {
  const { currentPath } = useRouter();

  useEffect(() => {
    applyRouteSeo(currentPath);
  }, [currentPath]);

  const isAdmin = currentPath === '/admin' || currentPath.startsWith('/admin/');

  if (isAdmin) {
    return (
      <>
        <Navbar />
        <Admin />
      </>
    );
  }

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') return <Home />;
    if (currentPath.startsWith('/shop')) return <Shop />;
    if (currentPath.startsWith('/product/')) {
      const id = currentPath.split('/product/')[1]?.split('?')[0] || '';
      return <ProductDetail id={id} />;
    }
    if (currentPath === '/cart') return <Cart />;
    if (currentPath === '/about') return <About />;
    if (currentPath === '/contact') return <Contact />;
    if (currentPath === '/privacy-policy') return <PrivacyPolicy />;
    if (currentPath === '/return-policy') return <ReturnPolicy />;
    return <Home />;
  };

  return (
    <>
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router />
      {/* <Analytics /> */}
    </CartProvider>
  );
}
