import { Helmet } from 'react-helmet-async';
import { Hero, Section } from '@/components';
import { usePageContent } from '@/hooks/usePageContent';

export default function About() {
  const { getSectionContent, getSectionImage, loading } = usePageContent('about');

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
        <title>About Us - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Learn about Wild Roots Garden & Gifts, your local garden center serving Goodland, Kansas since [year]."
        />
      </Helmet>

      <Hero
        title={getSectionContent('hero', 'Welcome to Wild Roots')}
        subtitle={getSectionContent('hero-subtitle', 'Growing community, one plant at a time')}
        imageUrl={getSectionImage('hero', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=900&fit=crop')}
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-sage-800 mb-6">
            {getSectionContent('main-title', 'Where Care, Creativity, and Nature Grow Together')}
          </h2>
          <div className="prose prose-lg text-sage-700 space-y-4">
            <p>
              {getSectionContent('main-paragraph-1', "Wild Roots Garden and Gift's was founded by two nurses whose compassion for caring extends beyond the bedside and into the beauty of nature and home. Rooted in our shared love for flowers, gardening, home décor, and breathing new life into forgotten treasures, we've turned our passion into an exciting new adventure.")}
            </p>
            <p>
              {getSectionContent('main-paragraph-2', "At Wild Roots, we believe that nurturing a garden isn't so different from caring for people—it takes patience, attention to detail, and a whole lot of heart. That same philosophy inspires everything we create. From fresh florals and greenery to thoughtfully curated home décor and unique upcycled finds, each piece is chosen or crafted to bring warmth, character, and joy to your space.")}
            </p>
            <p>
              {getSectionContent('main-paragraph-3', "Whether you're here to find the perfect plant, a cozy touch for your home, or a one-of-a-kind vintage piece with a story to tell, our mission is to help you grow beauty in every corner of your life.")}
            </p>
          </div>
          <h2 className="text-3xl font-serif font-bold text-sage-800 mb-6 mt-8">
            {getSectionContent('tagline', "Wild Roots Garden and Gift's — deeply rooted in care, blooming")}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">
                {getSectionContent('stat-1-number', '100+')}
              </div>
              <p className="text-sage-700">
                {getSectionContent('stat-1-label', 'Plant Varieties')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">
                {getSectionContent('stat-2-number', '1000+')}
              </div>
              <p className="text-sage-700">
                {getSectionContent('stat-2-label', 'Happy Customers')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">
                {getSectionContent('stat-3-number', 'Year-Round')}
              </div>
              <p className="text-sage-700">
                {getSectionContent('stat-3-label', 'Support & Classes')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-earth-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={getSectionImage('team-image', 'https://i.imgur.com/sa2iXpz.jpeg')}
            alt="Team at work"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-serif font-bold text-sage-800 mb-4">
              {getSectionContent('team-title', 'Our Team')}
            </h3>
            <p className="text-sage-600 mb-4">
              {getSectionContent('team-paragraph-1', "Our experienced team brings together decades of horticultural knowledge and a genuine love for helping people grow. From selecting the right plants for Kansas weather to troubleshooting garden challenges, we're with you every step of the way.")}
            </p>
            <p className="text-sage-600">
              {getSectionContent('team-paragraph-2', "Stop by anytime to chat with our friendly staff about your gardening projects. We love meeting fellow plant enthusiasts and helping gardens flourish throughout our community.")}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}