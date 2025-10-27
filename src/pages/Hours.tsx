import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero, Section, HoursTable } from '@/components';
import { usePublicStore } from '@/store/publicStore';
import { MapPin, Phone } from 'lucide-react';

export default function Hours() {
  const settings = usePublicStore((state) => state.settings);
  const hours = usePublicStore((state) => state.hours);
  const fetchHours = usePublicStore((state) => state.fetchHours);

  useEffect(() => {
    fetchHours();
  }, [fetchHours]);

  return (
    <>
      <Helmet>
        <title>Hours & Location - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Visit Wild Roots Garden & Gifts at 1201 E U.S. 24 Hwy, Goodland, KS. View our hours of operation."
        />
      </Helmet>

      <Hero
        title="Hours & Location"
        subtitle="Come visit us"
        imageUrl="https://i.imgur.com/a4JAeA2.pngw=1600&h=900&fit=crop"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              Store Hours
            </h2>
            {hours.length > 0 ? (
              <HoursTable hours={hours} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sage-600">
                  Please call us for our current hours of operation.
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
              Location & Contact
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-sage-700" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800 mb-2">Address</h3>
                  <address className="not-italic text-sage-600">
                    {settings?.address || '1201 E U.S. 24 Hwy'}
                    <br />
                    Goodland, KS 67735
                  </address>
                  <a
                    href="https://www.google.com/maps/place/1201+E+U.S.+24+Hwy,+Goodland,+KS+67735"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-sage-700" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800 mb-2">Phone</h3>
                  <a
                    href={`tel:${settings?.phone || '(785) 890-2027'}`}
                    className="text-sage-700 hover:text-sage-900 font-medium focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
                  >
                    {settings?.phone || '(785) 890-2027'}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-earth-200">
                <p className="text-sm text-sage-600 mb-4">
                  Have questions? Call us or visit during our business hours. Our
                  friendly staff is here to help!
                </p>
              </div>
            </div>

            <div className="mt-8 aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.8!2d-101.7!3d39.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDIxJzAwLjAiTiAxMDHCsDQyJzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wild Roots Garden & Gifts Location"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}