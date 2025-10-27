import { Helmet } from 'react-helmet-async';
import { Hero, Section } from '@/components';

export default function New() {
  return (
    <>
      <Helmet>
        <title>What's New - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Discover new arrivals, seasonal plants, and the latest additions to our gift shop."
        />
      </Helmet>

      <Hero
        title="What's New"
        subtitle="Fresh arrivals and seasonal favorites"
        imageUrl="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1600&h=900&fit=crop"
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://i.imgur.com/lwMk7ZX.jpeg"
              alt="New plants"
              className="rounded-lg shadow-lg mb-6"
            />
            <h3 className="text-2xl font-serif font-bold text-sage-800 mb-3">
              Seasonal Plants
            </h3>
            <p className="text-sage-600">
              We're constantly updating our inventory with seasonal favorites. From
              spring perennials to fall mums, check in store to see what's fresh and
              available.
            </p>
          </div>

          <div>
            <img
              src="https://i.imgur.com/IFXYuCF.jpeg"
              alt="New gifts"
              className="rounded-lg shadow-lg mb-6"
            />
            <h3 className="text-2xl font-serif font-bold text-sage-800 mb-3">
              Gift Collections
            </h3>
            <p className="text-sage-600">
              Our gift shop features rotating collections of home decor, garden art,
              candles, and unique finds. Perfect for any occasion or treating yourself!
            </p>
          </div>
        </div>

        <div className="mt-12 bg-sage-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-serif font-bold text-sage-800 mb-4">
            Stay Updated
          </h3>
          <p className="text-sage-600 mb-6">
            Follow us on social media to see our latest arrivals and seasonal highlights
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/wildrootsgardenandgifts"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              Instagram
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}