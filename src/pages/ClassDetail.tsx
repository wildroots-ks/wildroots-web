import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { Section, Card } from '@/components';
import { usePublicStore } from '@/store/publicStore';
import { api } from '@/lib/api';
import type { Class } from '@/types';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  seats: z.number().min(1, 'Must register for at least 1 seat').max(10),
  notes: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function ClassDetail() {
  const { slug } = useParams<{ slug: string }>();
  const settings = usePublicStore((state) => state.settings);
  const fetchClass = usePublicStore((state) => state.fetchClass);
  const [classData, setClassData] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      seats: 1,
    },
  });

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      fetchClass(slug).then((data) => {
        setClassData(data);
        setIsLoading(false);
      });
    }
  }, [slug, fetchClass]);

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await api.public.registerForClass({ 
        ...data, 
       classId: classData?._id || classData?.id
      });
      alert('Registration successful! We will contact you to confirm your spot.');
      reset();
    } catch (error) {
      console.error('Registration error:', error);
      alert('There was an error with your registration. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Section>
        <div className="text-center py-12">
          <p className="text-sage-600">Loading class details...</p>
        </div>
      </Section>
    );
  }

  if (!classData) {
    return (
      <>
        <Helmet>
          <title>Class Not Found - Wild Roots Garden & Gifts</title>
        </Helmet>
        <Section>
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-bold text-sage-800 mb-4">
              Class Not Found
            </h2>
            <p className="text-sage-600 mb-8">
              Sorry, we couldn't find the class you're looking for.
            </p>
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Classes
            </Link>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{classData.title} - Wild Roots Garden & Gifts</title>
        <meta name="description" content={classData.description} />
      </Helmet>

      <Section>
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-900 font-medium mb-8 focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Classes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={classData.imageUrl}
              alt={classData.title}
              className="w-full aspect-video object-cover rounded-lg shadow-lg mb-8"
            />

            <h1 className="text-4xl font-serif font-bold text-sage-800 mb-4">
              {classData.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-8 text-sage-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(classData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{classData.time} ({classData.duration})</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{classData.availableSeats} seats available</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-bold">${classData.price}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-sage-700 mb-8">
              <p className="text-xl mb-6">{classData.description}</p>
              {classData.longDescription && (
                <div className="space-y-4">
                  {classData.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            {classData.materials && classData.materials.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-serif font-bold text-sage-800 mb-3">
                  Materials Provided
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sage-700">
                  {classData.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            )}

            {classData.prerequisites && (
              <div className="mb-8">
                <h3 className="text-xl font-serif font-bold text-sage-800 mb-3">
                  Prerequisites
                </h3>
                <p className="text-sage-700">{classData.prerequisites}</p>
              </div>
            )}

            <div className="bg-sage-50 rounded-lg p-6">
              <h3 className="font-semibold text-sage-800 mb-2">
                About Your Instructor
              </h3>
              <p className="text-sage-700">{classData.instructor}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            {!settings?.usePicktime && (
              <Card className="sticky top-24">
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-sage-800 mb-6">
                    Register for This Class
                  </h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-sage-800 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
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
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-sage-800 mb-2"
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="seats"
                        className="block text-sm font-medium text-sage-800 mb-2"
                      >
                        Number of Seats *
                      </label>
                      <input
                        type="number"
                        id="seats"
                        min="1"
                        max={classData.availableSeats}
                        {...register('seats', { valueAsNumber: true })}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                      />
                      {errors.seats && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.seats.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-sage-800 mb-2"
                      >
                        Special Requests or Questions
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        {...register('notes')}
                        className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || classData.availableSeats === 0}
                      className="w-full px-6 py-3 bg-terracotta-600 hover:bg-terracotta-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2"
                    >
                      {isSubmitting
                        ? 'Registering...'
                        : classData.availableSeats === 0
                        ? 'Class Full'
                        : 'Register Now'}
                    </button>
                  </form>

                  <p className="text-xs text-sage-600 mt-4 text-center">
                    We'll contact you to confirm your registration
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}