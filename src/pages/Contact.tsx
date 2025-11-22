import { Helmet } from 'react-helmet-async';
import { Hero, Section, ContactForm } from '@/components';
import { usePublicStore } from '@/store/publicStore';
import { usePageContent } from '@/hooks/usePageContent';

export default function Contact() {
  const settings = usePublicStore((state) => state.settings);
  const { getSectionContent, getSectionImage, loading } = usePageContent('contact');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sage-600">Loading...</div>
      </div>
    );
  }

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
        title={getSectionContent('hero', 'Get In Touch')}
        subtitle={getSectionContent('hero-subtitle', 'We would love to hear from you')}
        imageUrl={getSectionImage('hero', 'https://i.imgur.com/vpZDyeI.pngw=1600&h=900&fit=crop')}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              {getSectionContent('form-title', 'Send Us a Message')}
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              {getSectionContent('other-ways-title', 'Other Ways to Reach Us')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">
                  {getSectionContent('visit-store-title', 'Visit Our Store')}
                </h3>
                <address className="not-italic text-sage-600 mb-2">
                  {settings?.address || '1201 E U.S. 24 Hwy'}
                  <br />
                  Goodland, KS 67735
                </address>
                <a
                  href="/hours"
                  className="text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                >
                  {getSectionContent('visit-store-link-text', 'View Hours')}
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">
                  {getSectionContent('call-us-title', 'Call Us')}
                </h3>
                <a
                  href={`tel:${settings?.phone || '(785) 890-2027'}`}
                  className="text-lg text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                >
                  {settings?.phone || '(785) 890-2027'}
                </a>
                <p className="text-sm text-sage-600 mt-2">
                  {getSectionContent('call-us-subtitle', 'Our team is available during business hours')}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-sage-800 mb-3">
                  {getSectionContent('follow-us-title', 'Follow Us')}
                </h3>
                <p className="text-sage-600 mb-4">
                  {getSectionContent('follow-us-text', 'Stay connected for updates, tips, and special offers')}
                </p>
                <div className="flex gap-3">
                  <a
                    href={settings?.facebook || 'https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    {getSectionContent('facebook-button-text', 'Facebook')}
                  </a>
                  <a
                    href={settings?.instagram || 'https://www.instagram.com/wildrootsgardenandgifts'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    {getSectionContent('instagram-button-text', 'Instagram')}
                  </a>
                </div>
              </div>

              <div className="bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-sage-800 mb-3">
                  {getSectionContent('faq-title', 'Frequently Asked Questions')}
                </h3>
                <p className="text-sage-600 mb-3">
                  {getSectionContent('faq-text-1', 'Have a question about plants, gardening, or our classes? Our staff has the expertise to help you succeed.')}
                </p>
                <p className="text-sm text-sage-600">
                  {getSectionContent('faq-text-2', 'Drop by the store or give us a call - we are always happy to share our knowledge!')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}