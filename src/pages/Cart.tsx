import { useEffect, useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle, X } from 'lucide-react';
import { navigate } from '../hooks/useRouter';
import Link from '../components/Link';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../lib/config';
import type { CartItem } from '../types';
import { supabase } from '../lib/supabase';

interface CheckoutRegistration {
  fullName: string;
  houseFlat: string;
  streetLocality: string;
  cityTown: string;
  state: string;
  pinCode: string;
  contactPrimary: string;
  contactAlternate: string;
  whatsapp: string;
}

const emptyRegistration: CheckoutRegistration = {
  fullName: '',
  houseFlat: '',
  streetLocality: '',
  cityTown: '',
  state: '',
  pinCode: '',
  contactPrimary: '',
  contactAlternate: '',
  whatsapp: '',
};

function trim(s: string) {
  return s.trim();
}

function isValidIndianPin(pin: string) {
  return /^\d{6}$/.test(pin.replace(/\s/g, ''));
}

function hasPhoneDigits(s: string, minLen: number) {
  const d = s.replace(/\D/g, '');
  return d.length >= minLen;
}

function validateRegistration(r: CheckoutRegistration): string | null {
  if (!trim(r.fullName)) return 'Please enter your full name.';
  if (!trim(r.houseFlat)) return 'Please enter house / flat number.';
  if (!trim(r.streetLocality)) return 'Please enter street / locality.';
  if (!trim(r.cityTown)) return 'Please enter city / town.';
  if (!trim(r.state)) return 'Please enter state.';
  const pin = trim(r.pinCode).replace(/\s/g, '');
  if (!isValidIndianPin(pin)) return 'Please enter a valid 6-digit PIN code.';

  const primaryEmpty = !trim(r.contactPrimary);
  const waEmpty = !trim(r.whatsapp);
  if (primaryEmpty && waEmpty) {
    return 'Please enter both numbers: contact number and WhatsApp.';
  }
  if (primaryEmpty) return 'Please enter your contact number.';
  if (waEmpty) return 'Please enter your WhatsApp number.';
  if (!hasPhoneDigits(r.contactPrimary, 10)) {
    return 'Contact number: this number needs at least 10 digits.';
  }
  if (!hasPhoneDigits(r.whatsapp, 10)) {
    return 'WhatsApp number: this number needs at least 10 digits.';
  }
  if (trim(r.contactAlternate) && !hasPhoneDigits(r.contactAlternate, 10)) {
    return 'Alternate contact: this number needs at least 10 digits, or leave it blank.';
  }
  return null;
}

function buildWhatsAppMessage(items: CartItem[], total: number, reg: CheckoutRegistration): string {
  const lines = ['Hello, I want to order the following jerseys:\n'];
  items.forEach((item, i) => {
    lines.push(`${i + 1}. Product: ${item.name}`);
    lines.push(`   Size: ${item.size}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`);
  });
  lines.push(`*Total Amount: ₹${total.toLocaleString('en-IN')}*`);
  lines.push('');
  lines.push('---');
  lines.push('*Delivery & contact (for shipping & payment on WhatsApp)*');
  lines.push(`1. *Full Name:* ${trim(reg.fullName)}`);
  lines.push('2. *Delivery Address:*');
  lines.push(`House/Flat No.: ${trim(reg.houseFlat)}`);
  lines.push(`Street/Locality: ${trim(reg.streetLocality)}`);
  lines.push(`City/Town: ${trim(reg.cityTown)}`);
  lines.push(`State: ${trim(reg.state)}`);
  lines.push(`PIN Code: ${trim(reg.pinCode).replace(/\s/g, '')}`);
  const alt = trim(reg.contactAlternate);
  lines.push(
    alt
      ? `3. *Contact Number:* ${trim(reg.contactPrimary)} / ${alt}`
      : `3. *Contact Number:* ${trim(reg.contactPrimary)}`
  );
  lines.push(`4. *WhatsApp Number:* ${trim(reg.whatsapp)}`);
  lines.push('Please confirm the order and share UPI / payment details on WhatsApp. Thank you!');
  return lines.join('\n');
}

function CartItemRow({ item, isOutOfStock }: { item: CartItem; isOutOfStock: boolean }) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className={`flex gap-4 p-4 bg-white border rounded-xl group transition-colors ${
      isOutOfStock ? 'border-red-200 bg-red-50/10' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div
        className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => navigate(`/product/${item.product_id}`)}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className="text-gray-900 font-semibold text-sm leading-snug mb-1 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
              onClick={() => navigate(`/product/${item.product_id}`)}
            >
              {item.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-block text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5">
                Size: {item.size}
              </span>
              {isOutOfStock && (
                <span className="inline-block text-xs font-bold text-red-600 bg-red-100 rounded px-2 py-0.5 border border-red-200 uppercase tracking-wide">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => removeItem(item.product_id, item.size)}
            className="text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-gray-900 font-semibold text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
              disabled={isOutOfStock}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-gray-900 font-bold">
            &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [reg, setReg] = useState<CheckoutRegistration>(emptyRegistration);
  const [formError, setFormError] = useState<string | null>(null);
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);

  useEffect(() => {
    if (items.length === 0) return;
    const fetchStockStatus = async () => {
      const ids = items.map(item => item.product_id);
      const { data, error } = await supabase
        .from('products')
        .select('id, is_out_of_stock')
        .in('id', ids);
      if (data && !error) {
        const oos = data
          .filter((p: any) => p.is_out_of_stock)
          .map((p: any) => p.id);
        setOutOfStockIds(oos);
      }
    };
    fetchStockStatus();
  }, [items]);

  const hasOutOfStock = items.some(item => outOfStockIds.includes(item.product_id));

  useEffect(() => {
    if (!checkoutOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCheckout();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [checkoutOpen]);

  const setField = (field: keyof CheckoutRegistration, value: string) => {
    setReg(prev => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setFormError(null);
  };

  const openCheckout = () => {
    if (hasOutOfStock) return;
    setFormError(null);
    setCheckoutOpen(true);
  };

  const handleConfirmWhatsApp = () => {
    if (hasOutOfStock) {
      setFormError('Cannot checkout with out-of-stock items.');
      return;
    }
    const err = validateRegistration(reg);
    if (err) {
      setFormError(err);
      return;
    }
    const msg = buildWhatsAppMessage(items, total, reg);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    closeCheckout();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Looks like you haven't added any jerseys yet. Browse our collection and find your perfect kit!
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/30"
        >
          Browse Jerseys
        </button>
      </div>
    );
  }

  const shipping = 99;
  const orderTotal = total;

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Your Cart</h1>
            <p className="text-gray-400 text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map(item => (
              <CartItemRow
                key={`${item.product_id}-${item.size}`}
                item={item}
                isOutOfStock={outOfStockIds.includes(item.product_id)}
              />
            ))}

            <Link
              to="/shop"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mt-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
              <h2 className="text-gray-900 font-bold text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                {items.map(item => (
                  <div key={`${item.product_id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-gray-400 line-clamp-1 flex-1 mr-2">
                      {item.name} ({item.size}) x{item.quantity}
                    </span>
                    <span className="text-gray-300 flex-shrink-0">
                      &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-300">&#8377;{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 line-through">&#8377;{shipping}</span>
                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-gray-900 font-bold text-lg">
                    &#8377;{orderTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={openCheckout}
                disabled={hasOutOfStock}
                className={`mt-2 w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 ${
                  hasOutOfStock
                    ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800 text-white hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {hasOutOfStock ? 'Contains Out of Stock Items' : 'Proceed to payment'}
              </button>

              {hasOutOfStock && (
                <p className="mt-3 text-red-600 text-xs font-semibold text-center bg-red-50 border border-red-200 rounded-lg p-2">
                  Please remove out-of-stock items from your cart before proceeding.
                </p>
              )}

              <p className="text-gray-600 text-xs text-center mt-3 leading-relaxed">
                Opens a short registration form, then WhatsApp with your order and delivery details for UPI payment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {checkoutOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close checkout"
            onClick={closeCheckout}
          />
          <div className="relative z-[101] flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl border border-gray-200 bg-white shadow-2xl sm:rounded-2xl">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
              <div>
                <h2 id="checkout-modal-title" className="text-lg font-bold text-gray-900">
                  Checkout — delivery &amp; contact
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Order total{' '}
                  <span className="font-semibold text-gray-800">&#8377;{orderTotal.toLocaleString('en-IN')}</span>
                  {' · '}
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4">
              <p className="text-xs text-gray-600">
                We attach this information below your jersey list in WhatsApp so you can pay (UPI) and we can ship.
              </p>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">1. Full name *</label>
                <input
                  type="text"
                  value={reg.fullName}
                  onChange={e => setField('fullName', e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff7900] focus:outline-none"
                  placeholder="As on ID / for delivery"
                />
              </div>

              <p className="text-xs font-semibold text-gray-700">2. Delivery address *</p>
              <div>
                <label className="mb-1 block text-xs text-gray-500">House / flat no.</label>
                <input
                  type="text"
                  value={reg.houseFlat}
                  onChange={e => setField('houseFlat', e.target.value)}
                  autoComplete="address-line1"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#ff7900] focus:outline-none"
                  placeholder="e.g. 12B, Green Valley Apartments"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Street / locality</label>
                <input
                  type="text"
                  value={reg.streetLocality}
                  onChange={e => setField('streetLocality', e.target.value)}
                  autoComplete="address-line2"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#ff7900] focus:outline-none"
                  placeholder="Road name, area, landmark"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">City / town</label>
                  <input
                    type="text"
                    value={reg.cityTown}
                    onChange={e => setField('cityTown', e.target.value)}
                    autoComplete="address-level2"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">State</label>
                  <input
                    type="text"
                    value={reg.state}
                    onChange={e => setField('state', e.target.value)}
                    autoComplete="address-level1"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">PIN code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={reg.pinCode}
                  onChange={e => setField('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  autoComplete="postal-code"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  placeholder="6-digit PIN"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">3. Contact number (primary) *</label>
                <input
                  type="tel"
                  value={reg.contactPrimary}
                  onChange={e => setField('contactPrimary', e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  placeholder="Mobile for courier calls (10+ digits)"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Contact number (alternate, optional)</label>
                <input
                  type="tel"
                  value={reg.contactAlternate}
                  onChange={e => setField('contactAlternate', e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  placeholder="Second number if any"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">4. WhatsApp number *</label>
                <input
                  type="tel"
                  value={reg.whatsapp}
                  onChange={e => setField('whatsapp', e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff7900] focus:outline-none"
                  placeholder="Number for payment & order updates (10+ digits)"
                />
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:rounded-b-2xl">
              {formError && (
                <div
                  className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 shadow-sm"
                  role="alert"
                >
                  <p className="text-center text-sm font-semibold text-red-800">{formError}</p>
                </div>
              )}
              <button
                type="button"
                onClick={handleConfirmWhatsApp}
                className="w-full py-3.5 bg-[#ff7900] hover:bg-[#e66d00] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#ff7900]/25 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Open WhatsApp with order
              </button>
              <button
                type="button"
                onClick={closeCheckout}
                className="mt-2 w-full py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
