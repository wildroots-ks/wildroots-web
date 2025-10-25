import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Class, Hours } from '@/types';

export { default as BannerStrip } from './BannerStrip';
// Hero Component
interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({ title, subtitle, imageUrl, ctaText, ctaLink }: HeroProps) {
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sage-900/70 to-sage-900/30" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-sage-100 mb-6">{subtitle}</p>
          )}
          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className="inline-block px-8 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Section Component
interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-sage-800 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-sage-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}



// ClassCard Component
interface ClassCardProps {
  classItem: Class;
}

export function ClassCard({ classItem }: ClassCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <Link to={`/classes/${classItem.slug}`} className="block">
        <div className="aspect-video overflow-hidden bg-sage-100">
          <img
            src={classItem.imageUrl}
            alt={classItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold text-sage-800 mb-2 group-hover:text-sage-900">
            {classItem.title}
          </h3>
          <p className="text-sage-600 text-sm mb-4 line-clamp-2">
            {classItem.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-sage-700 font-medium">
                {new Date(classItem.date).toLocaleDateString()}
              </p>
              <p className="text-sage-600">{classItem.time}</p>
            </div>
            <div className="text-right">
              <p className="text-terracotta-600 font-bold text-lg">
                ${classItem.price}
              </p>
              <p className="text-sage-600">{classItem.availableSeats} seats left</p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

// HoursTable Component
interface HoursTableProps {
  hours: Hours[];
}

export function HoursTable({ hours }: HoursTableProps) {
  const regularHours = hours.filter((h) => !h.isSpecial);
  const specialHours = hours.filter((h) => h.isSpecial);

  const daysOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const sortedRegularHours = [...regularHours].sort(
    (a, b) => daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek)
  );

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-sage-800 text-white px-6 py-4">
          <h3 className="text-xl font-serif font-bold">Regular Hours</h3>
        </div>
        <div className="divide-y divide-earth-200">
          {sortedRegularHours.map((hour) => (
            <div
              key={hour.id}
              className="px-6 py-4 flex justify-between items-center"
            >
              <span className="font-medium text-sage-800">{hour.dayOfWeek}</span>
              <span className="text-sage-600">
                {hour.isClosed
                  ? 'Closed'
                  : `${hour.openTime} - ${hour.closeTime}`}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {specialHours.length > 0 && (
        <Card className="overflow-hidden">
          <div className="bg-terracotta-600 text-white px-6 py-4">
            <h3 className="text-xl font-serif font-bold">Special Hours</h3>
          </div>
          <div className="divide-y divide-earth-200">
            {specialHours.map((hour) => (
              <div key={hour.id} className="px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sage-800">
                    {hour.specialDate &&
                      new Date(hour.specialDate).toLocaleDateString()}
                  </span>
                  <span className="text-sage-600">
                    {hour.isClosed
                      ? 'Closed'
                      : `${hour.openTime} - ${hour.closeTime}`}
                  </span>
                </div>
                {hour.specialNote && (
                  <p className="text-sm text-sage-600">{hour.specialNote}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ContactForm Component
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      console.log('Spam detected');
      return;
    }

    // Submit to API
    try {
      // await api.public.submitContact(data);
      alert('Thank you for your message! We will get back to you soon.');
      reset();
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <Card className="p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register('honeypot')}
          className="absolute -left-[9999px]"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-sage-800 mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-sage-800 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-sage-800 mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-sage-800 mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              {...register('subject')}
              className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-sage-800 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </Card>
  );
}