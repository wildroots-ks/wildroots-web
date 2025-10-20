import { Helmet } from 'react-helmet-async';
import { Hero, Section, ContactForm } from '@/components';
import { usePublicStore } from '@/store/publicStore';

export default function Contact() {
  const settings = usePublicStore((state) => state.settings);

  return (
    <>
      <Helmet>
        <title>Contact Us - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Get in touch with Wild Roots Garden & Gifts. We're here to answer your questions about plants, classes, and more."
        />
      </Helmet>

      <Hero
        title="Get In Touch"
        subtitle="We'd love to hear from you"
        imageUrl="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=900&fit=crop"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              Other Ways to Reach Us
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">Visit Our Store</h3>
                <address className="not-italic text-sage-600 mb-2">
                  {settings?.address || '1201 E U.S. 24 Hwy'}
                  <br />
                  Goodland, KS 67735
                </address>
                <a
                  href="/hours"
                  className="text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                >
                  View Hours →
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">Call Us</h3>
                <a
                  href={`tel:${settings?.phone || '(785) 890-2027'}`}
                  className="text-lg text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                >
                  {settings?.phone || '(785) 890-2027'}
                </a>
                <p className="text-sm text-sage-600 mt-2">
                  Our team is available during business hours
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">Follow Us</h3>
                <p className="text-sage-600 mb-4">
                  Stay connected for updates, tips, and special offers
                </p>
                <div className="flex gap-3">
                  <a
                    href={
                      settings?.facebook ||
                      'https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    Facebook
                  </a>
                  <a
                    href={
                      settings?.instagram ||
                      'https://www.instagram.com/wildrootsgardenandgifts'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className="bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-sage-800 mb-3">
                  Frequently Asked Questions
                </h3>
                <p className="text-sage-600 mb-3">
                  Have a question about plants, gardening, or our classes? Our staff
                  has the expertise to help you succeed.
                </p>
                <p className="text-sm text-sage-600">
                  Drop by the store or give us a call - we're always happy to share
                  our knowledge!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}