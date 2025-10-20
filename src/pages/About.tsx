import { Helmet } from 'react-helmet-async';
import { Hero, Section } from '@/components';

export default function About() {
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
        title="About Wild Roots"
        subtitle="Growing community, one plant at a time"
        imageUrl="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=900&fit=crop"
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-sage-800 mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg text-sage-700 space-y-4">
            <p>
              Welcome to Wild Roots Garden & Gifts, where passion for plants meets
              exceptional customer service. Located in the heart of Goodland, Kansas,
              we've been serving our community with quality plants, gardening supplies,
              and unique gifts.
            </p>
            <p>
              Our journey began with a simple mission: to help everyone discover the joy
              of gardening and bring natural beauty into their homes and lives. Whether
              you're looking to create a thriving vegetable garden, add some color to
              your landscape, or find the perfect gift, we're here to help.
            </p>
            <p>
              At Wild Roots, we believe in sustainable gardening practices, supporting
              local growers, and fostering a community of plant lovers. Our knowledgeable
              staff is always ready to share tips, answer questions, and help you
              succeed with your gardening projects.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">100+</div>
              <p className="text-sage-700">Plant Varieties</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">1000+</div>
              <p className="text-sage-700">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-terracotta-600 mb-2">Year-Round</div>
              <p className="text-sage-700">Support & Classes</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-earth-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop"
            alt="Team at work"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-serif font-bold text-sage-800 mb-4">
              Our Team
            </h3>
            <p className="text-sage-600 mb-4">
              Our experienced team brings together decades of horticultural knowledge
              and a genuine love for helping people grow. From selecting the right
              plants for Kansas weather to troubleshooting garden challenges, we're
              with you every step of the way.
            </p>
            <p className="text-sage-600">
              Stop by anytime to chat with our friendly staff about your gardening
              projects. We love meeting fellow plant enthusiasts and helping gardens
              flourish throughout our community.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}