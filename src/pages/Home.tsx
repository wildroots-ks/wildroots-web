import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Hero, Section, BannerStrip, ClassCard } from '@/components';
import { usePublicStore } from '@/store/publicStore';
import { Sprout, Gift, Calendar, MapPin } from 'lucide-react';

export default function Home() {
  const settings = usePublicStore((state) => state.settings);
  const banners = usePublicStore((state) => state.banners);
  const classes = usePublicStore((state) => state.classes);
  const fetchBanners = usePublicStore((state) => state.fetchBanners);
  const fetchClasses = usePublicStore((state) => state.fetchClasses);

  useEffect(() => {
    fetchBanners();
    fetchClasses();
  }, [fetchBanners, fetchClasses]);

  const featuredClasses = classes.filter((c) => c.isFeatured && c.isActive).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{settings?.storeName || 'Wild Roots Garden & Gifts'} - Home</title>
        <meta
          name="description"
          content="Your local garden center and gift shop in Goodland, Kansas. Plants, gardening supplies, gifts, and expert advice."
        />
      </Helmet>

      <Hero
        title="Welcome to Wild Roots"
        subtitle="Where your garden dreams take root"
        imageUrl="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&h=900&fit=crop"
        ctaText="Explore Our Classes"
        ctaLink="/classes"
      />

      {banners.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <BannerStrip banners={banners} />
        </div>
      )}

      <Section
        title="Why Choose Wild Roots?"
        subtitle="Your premier destination for plants, gardening supplies, and unique gifts"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
              <Sprout className="w-8 h-8 text-sage-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-2">
              Quality Plants
            </h3>
            <p className="text-sage-600">
              Carefully selected plants and trees for Kansas climate
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
              <Gift className="w-8 h-8 text-sage-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-2">
              Unique Gifts
            </h3>
            <p className="text-sage-600">
              Curated selection of home and garden decor
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-sage-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-2">
              Expert Classes
            </h3>
            <p className="text-sage-600">
              Learn from experienced gardeners and designers
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-sage-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-2">
              Local & Trusted
            </h3>
            <p className="text-sage-600">
              Serving Goodland and surrounding communities
            </p>
          </div>
        </div>
      </Section>

      {featuredClasses.length > 0 && (
        <Section
          title="Featured Classes"
          subtitle="Join us for hands-on learning experiences"
          className="bg-earth-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClasses.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/classes"
              className="inline-block px-8 py-3 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              View All Classes
            </Link>
          </div>
        </Section>
      )}

      <Section title="Visit Us Today">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
              alt="Garden center interior"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-sage-800 mb-4">
              Come See Us
            </h3>
            <p className="text-sage-600 mb-6">
              Whether you're a seasoned gardener or just starting out, our friendly
              staff is here to help you succeed. Visit us to browse our selection of
              plants, supplies, and gifts.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sage-800 mb-1">Location</h4>
                <p className="text-sage-600">
                  {settings?.address || '1201 E U.S. 24 Hwy'}
                  <br />
                  Goodland, KS 67735
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sage-800 mb-1">Phone</h4>
                
                  href={`tel:${settings?.phone || '(785) 890-2027'}`}
                  className="text-sage-600 hover:text-sage-800 transition-colors"
                >
                  {settings?.phone || '(785) 890-2027'}
                </a>
              </div>
              <div className="pt-4">
                <Link
                  to="/hours"
                  className="inline-block px-6 py-2 border-2 border-sage-700 text-sage-700 hover:bg-sage-700 hover:text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                >
                  View Hours
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}