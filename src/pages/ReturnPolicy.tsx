import { RotateCcw, Camera, Package, AlertCircle } from 'lucide-react';
import Link from '../components/Link';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../lib/config';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 pt-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900">
            <RotateCcw className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-3 text-3xl font-black text-gray-900 md:text-4xl">Return Policy</h1>
          <p className="text-sm text-gray-600">
            Jersey Fitch — simple rules so you know what to expect if something is not right with your order.
          </p>
          <p className="mt-2 text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 md:p-8">
          <div className="flex gap-3">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <h2 className="font-bold text-gray-900">Photos within 24 hours</h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                If you need a return or exchange, contact us on{' '}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#ff7900] underline hover:text-[#e66d00]"
                >
                  WhatsApp
                </a>{' '}
                or{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[#ff7900] underline hover:text-[#e66d00]">
                  email
                </a>{' '}
                <span className="font-semibold text-gray-900">within 24 hours of receiving your parcel</span>. Please
                send <span className="font-semibold">clear photos</span> of the product, tags, and packaging so we can
                review your case quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 rounded-2xl bg-white p-8 shadow-sm md:p-10">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Package className="h-5 w-5 text-[#ff7900]" />
              When returns or exchanges apply
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              We will help with a return, replacement, or suitable solution when:
            </p>
            <ul className="list-inside list-disc space-y-3 text-sm leading-relaxed text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Wrong size vs what you ordered</span> — the size you
                received does not match the size you ordered (subject to verification against your order confirmation).
              </li>
              <li>
                <span className="font-semibold text-gray-900">Manufacturing defect</span> — clear fault in printing,
                stitching, or fabric that should not be present on a new item (photos required).
              </li>
              <li>
                <span className="font-semibold text-gray-900">Wrong item</span> — you received a different product,
                design, or club/national kit than what you ordered.
              </li>
            </ul>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <AlertCircle className="h-5 w-5 text-[#ff7900]" />
              Return shipping & refunds
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Approved returns may require you to send the item back to us.{' '}
              <span className="font-semibold text-gray-900">
                The cost of return shipping is deducted from your refund
              </span>{' '}
              (or adjusted in the exchange value), so the amount we refund reflects that deduction. We will explain the
              exact numbers on WhatsApp before you ship anything back.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Items must be unused, with tags attached and original packaging where possible, unless the issue is a
              defect that was present on arrival.
            </p>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h2 className="mb-3 text-xl font-bold text-gray-900">How to start a return</h2>
            <ol className="list-inside list-decimal space-y-2 text-sm text-gray-600">
              <li>Message us within 24 hours of delivery with photos and your order details.</li>
              <li>Wait for our team to confirm eligibility and return instructions.</li>
              <li>Ship the item only after we approve — unauthorised returns may not be accepted.</li>
            </ol>
          </section>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link to="/" className="text-[#ff7900] hover:underline">
            Back to home
          </Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link to="/contact" className="text-[#ff7900] hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </div>
  );
}
