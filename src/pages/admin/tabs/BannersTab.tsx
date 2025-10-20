import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';
import type { Banner } from '@/types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['info', 'warning', 'success', 'seasonal']),
  isActive: z.boolean(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  order: z.number().min(0),
});

type BannerFormData = z.infer<typeof bannerSchema>;

export default function BannersTab() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const token = useAdminStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      type: 'info',
      isActive: true,
      order: 0,
    },
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    if (!token) return;
    const response = await api.admin.getBanners(token);
    if (response.success && response.data) {
      setBanners(response.data as Banner[]);
    }
  };

  const onSubmit = async (data: BannerFormData) => {
    if (!token) return;

    let response;
    if (editingId) {
      response = await api.admin.updateBanner(editingId, data, token);
    } else {
      response = await api.admin.createBanner(data, token);
    }

    if (response.success) {
      alert(editingId ? 'Banner updated!' : 'Banner created!');
      fetchBanners();
      handleCancel();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    reset(banner);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this banner?')) return;

    const response = await api.admin.deleteBanner(id, token);
    if (response.success) {
      alert('Banner deleted!');
      fetchBanners();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset({
      title: '',
      message: '',
      type: 'info',
      isActive: true,
      order: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-sage-800">
          Manage Banners
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-sage-800">
              {editingId ? 'Edit Banner' : 'New Banner'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-sage-600 hover:text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Type *
                </label>
                <select
                  {...register('type')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="seasonal">Seasonal</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Message *
              </label>
              <textarea
                {...register('message')}
                rows={3}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.order && (
                  <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  {...register('endDate')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                {...register('isActive')}
                className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-sage-800">
                Active (visible on website)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-earth-300 text-sage-700 hover:bg-earth-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="divide-y divide-earth-200">
          {banners.length === 0 ? (
            <p className="text-sage-600 text-center py-8">No banners created yet</p>
          ) : (
            banners
              .sort((a, b) => a.order - b.order)
              .map((banner) => (
                <div key={banner.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-sage-800">
                          {banner.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            banner.type === 'warning'
                              ? 'bg-amber-100 text-amber-800'
                              : banner.type === 'success'
                              ? 'bg-emerald-100 text-emerald-800'
                              : banner.type === 'seasonal'
                              ? 'bg-terracotta-100 text-terracotta-800'
                              : 'bg-sage-100 text-sage-800'
                          }`}
                        >
                          {banner.type}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            banner.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sage-600 text-sm mb-2">{banner.message}</p>
                      <div className="flex gap-4 text-xs text-sage-500">
                        {banner.startDate && (
                          <span>
                            Start: {new Date(banner.startDate).toLocaleDateString()}
                          </span>
                        )}
                        {banner.endDate && (
                          <span>
                            End: {new Date(banner.endDate).toLocaleDateString()}
                          </span>
                        )}
                        <span>Order: {banner.order}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-2 text-sage-700 hover:bg-sage-50 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}