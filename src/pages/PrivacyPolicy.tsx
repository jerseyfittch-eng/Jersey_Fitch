import { Shield, Lock, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_ADDRESS, WHATSAPP_NUMBER, formatWhatsAppNumberForDisplay } from '../lib/config';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy outlines how Jersey Fitch collects, uses, and protects your information.
          </p>
          <p className="text-gray-500 text-sm mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Jersey Fitch is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or place an order. We are a premium football jersey online store based in Malappuram, Kerala, India, specializing in player version and fan version jerseys.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Place an order through our website</li>
              <li>Contact us via WhatsApp or email for customer support</li>
              <li>Subscribe to receive updates about new arrivals and promotions</li>
              <li>Provide shipping details for order delivery</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              The information we collect may include your name, phone number, email address, shipping address, and order details.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Communicate about your orders via WhatsApp</li>
              <li>Send promotional offers, new arrivals, and updates (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          {/* Order & Payment Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Order & Payment Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our order process is designed with your security in mind:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Orders are placed through our website checkout system</li>
              <li>Order confirmation is completed through WhatsApp</li>
              <li>Payments are made via UPI (Unified Payments Interface)</li>
              <li>Customers send payment screenshots through WhatsApp for approval</li>
              <li>We do not store any payment credentials or financial information</li>
              <li>Cash on Delivery (COD) is currently not available</li>
            </ul>
          </section>

          {/* WhatsApp Communication */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. WhatsApp Communication</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use WhatsApp as our primary communication channel for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Order confirmations and updates</li>
              <li>Payment verification through screenshot approval</li>
              <li>Shipping notifications and tracking information</li>
              <li>Customer support and inquiries</li>
              <li>Promotional offers and product updates (optional)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Your WhatsApp number is used solely for order-related communication and will never be shared with third parties.
            </p>
          </section>

          {/* Marketing & Promotions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Marketing & Promotions</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may send you promotional content through:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>WhatsApp messages about new arrivals, special offers, and discounts</li>
              <li>Email newsletters with product updates and exclusive deals</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can opt out of marketing communications at any time by contacting us via WhatsApp or email.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and is never sold to third parties.
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Customer Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Customer Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise these rights, please contact us via WhatsApp or email using the contact information below.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. The updated policy will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-900 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">10. Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Jersey Fitch</p>
                  <p className="text-gray-300">{CONTACT_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {formatWhatsAppNumberForDisplay(WHATSAPP_NUMBER)} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-300 hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              For any privacy-related questions or concerns, please reach out to us via WhatsApp or email. We typically respond within 24 hours.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>This policy applies only to Jersey Fitch website and services within India.</p>
        </div>
      </div>
    </div>
  );
}
