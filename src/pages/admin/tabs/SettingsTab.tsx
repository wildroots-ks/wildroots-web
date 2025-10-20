import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePublicStore } from '@/store/publicStore';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';
import { Save } from 'lucide-react';

const settingsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email'),
  facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
  usePicktime: z.boolean(),
  picktimeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsTab() {
  const settings = usePublicStore((state) => state.settings);
  const fetchSettings = usePublicStore((state) => state.fetchSettings);
  const token = useAdminStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      usePicktime: false,
    },
  });

  const usePicktime = watch('usePicktime');

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    if (!token) return;

    const response = await api.admin.updateSettings(data, token);
    if (response.success) {
      alert('Settings saved successfully!');
      fetchSettings();
    } else {
      alert('Error saving settings: ' + response.error);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-serif font-bold text-sage-800 mb-6">
          Business Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                {...register('storeName')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.storeName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storeName.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Tagline *
              </label>
              <input
                type="text"
                {...register('tagline')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.tagline && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tagline.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Address *
              </label>
              <input
                type="text"
                {...register('address')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Email *
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                {...register('facebook')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                placeholder="https://facebook.com/..."
              />
              {errors.facebook && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.facebook.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                {...register('instagram')}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                placeholder="https://instagram.com/..."
              />
              {errors.instagram && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.instagram.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-earth-200">
            <h3 className="text-lg font-serif font-bold text-sage-800 mb-4">
              Class Booking Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="usePicktime"
                  {...register('usePicktime')}
                  className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
                />
                <label
                  htmlFor="usePicktime"
                  className="ml-2 text-sm text-sage-800"
                >
                  Use Picktime for class bookings
                </label>
              </div>

              {usePicktime && (
                <div>
                  <label className="block text-sm font-medium text-sage-800 mb-2">
                    Picktime Embed URL
                  </label>
                  <input
                    type="url"
                    {...register('picktimeUrl')}
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                    placeholder="https://..."
                  />
                  {errors.picktimeUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.picktimeUrl.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-sage-600">
                    When enabled, the Classes page will show your Picktime booking
                    widget instead of individual class pages
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}