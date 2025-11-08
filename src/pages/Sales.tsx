import { Helmet } from 'react-helmet-async';
import { Hero, Section } from '@/components';

export default function Sales() {
  return (
    <>
      <Helmet>
        <title>Sales & Specials - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Check out our current sales, seasonal promotions, and special offers on plants, supplies, and gifts."
        />
      </Helmet>

      <Hero
        title="Sales & Specials"
        subtitle="Great deals on plants, supplies, and more"
        imageUrl="https://i.imgur.com/1pnqMuE.jpegw=1600&h=900&fit=crop"
      />

      <Section>
        <div className="text-center mb-12">
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Check back regularly for seasonal sales, clearance items, and special
            promotions. Sign up for our newsletter or follow us on social media to be
            the first to know about upcoming deals!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-terracotta-500">
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-3">
              Spring Trees & Shrubs
            </h3>
            <p className="text-sage-600 mb-4">
              We're starting a list of requests for trees and shrubs
              Call us at 785-890-2027
            </p>
            <p className="text-sm text-sage-500"></p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-sage-500">
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-3">
              Gift Shop Specials
            </h3>
            <p className="text-sage-600 mb-4">
              Browse our curated selection of home decor, candles, and garden-themed
              gifts at special prices.
            </p>
            <p className="text-sm text-sage-500">Ongoing</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-earth-500">
            <h3 className="text-xl font-serif font-bold text-sage-800 mb-3">
              Loyalty Program
            </h3>
            <p className="text-sage-600 mb-4">
              Join our rewards program and earn points on every purchase toward future
              savings.
            </p>
            <p className="text-sm text-sage-500">Ask in store</p>
          </div>
        </div>
      </Section>
    </>
  );
}