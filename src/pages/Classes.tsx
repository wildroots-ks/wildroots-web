import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero, Section, ClassCard } from '@/components';
import { usePublicStore } from '@/store/publicStore';
import { usePageContent } from '@/hooks/usePageContent';

export default function Classes() {
  const settings = usePublicStore((state) => state.settings);
  const classes = usePublicStore((state) => state.classes);
  const fetchClasses = usePublicStore((state) => state.fetchClasses);
  const { getSectionContent, getSectionImage, loading } = usePageContent('classes');

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const activeClasses = classes.filter((c) => c.isActive);

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
        <title>Classes & Workshops - Wild Roots Garden & Gifts</title>
        <meta
          name="description"
          content="Join our hands-on gardening classes and workshops. Learn from experienced instructors in Goodland, Kansas."
        />
      </Helmet>

      <Hero
        title={getSectionContent('hero', 'Classes & Workshops')}
        subtitle={getSectionContent('hero-subtitle', 'Learn, grow, and connect with fellow plant lovers')}
        imageUrl={getSectionImage('hero', 'https://i.imgur.com/YtITNBR.jpegw=1600&h=900&fit=crop')}
      />

      <Section>
        {settings?.usePicktime && settings.picktimeUrl ? (
          <div>
            <div className="text-center mb-8">
              <p className="text-lg text-sage-600 max-w-3xl mx-auto">
                {getSectionContent('picktime-intro', 'Browse our upcoming classes and register online. Select a class below to see details and reserve your spot.')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src={settings.picktimeUrl}
                title="Class Bookings"
                className="w-full min-h-[800px] border-0"
                style={{ minHeight: '800px' }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-12">
              <p className="text-lg text-sage-600 max-w-3xl mx-auto">
                {getSectionContent('regular-intro', 'Join us for hands-on learning experiences led by expert instructors. All skill levels welcome!')}
              </p>
            </div>

            {activeClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeClasses.map((classItem) => (
                  <ClassCard key={classItem._id || classItem.slug} classItem={classItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sage-600 mb-4">
                  {getSectionContent('no-classes-text-1', 'No classes are currently scheduled. Check back soon for upcoming workshops!')}
                </p>
                <p className="text-sage-600">
                  {getSectionContent('no-classes-text-2', 'Follow us on social media to be the first to know when new classes are announced.')}
                </p>
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}