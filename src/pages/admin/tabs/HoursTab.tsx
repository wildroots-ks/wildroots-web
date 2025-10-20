import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';
import type { Hours } from '@/types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const hoursSchema = z.object({
  dayOfWeek: z.string().min(1, 'Day is required'),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  isClosed: z.boolean(),
  isSpecial: z.boolean().optional(),
  specialDate: z.string().optional(),
  specialNote: z.string().optional(),
});

type HoursFormData = z.infer<typeof hoursSchema>;

export default function HoursTab() {
  const [hours, setHours] = useState<Hours[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const token = useAdminStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<HoursFormData>({
    resolver: zodResolver(hoursSchema),
    defaultValues: {
      isClosed: false,
      isSpecial: false,
    },
  });

  const isClosed = watch('isClosed');
  const isSpecial = watch('isSpecial');

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    if (!token) return;
    const response = await api.admin.getHours(token);
    if (response.success && response.data) {
      setHours(response.data as Hours[]);
    }
  };

  const onSubmit = async (data: HoursFormData) => {
    if (!token) return;

    let response;
    if (editingId) {
      response = await api.admin.updateHours(editingId, data, token);
    } else {
      response = await api.admin.createHours(data, token);
    }

    if (response.success) {
      alert(editingId ? 'Hours updated!' : 'Hours created!');
      fetchHours();
      handleCancel();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleEdit = (hour: Hours) => {
    setEditingId(hour.id);
    reset(hour);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete these hours?')) return;

    const response = await api.admin.deleteHours(id, token);
    if (response.success) {
      alert('Hours deleted!');
      fetchHours();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset({
      dayOfWeek: '',
      openTime: '',
      closeTime: '',
      isClosed: false,
      isSpecial: false,
    });
  };

  const regularHours = hours.filter((h) => !h.isSpecial);
  const specialHours = hours.filter((h) => h.isSpecial);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-sage-800">
          Manage Hours
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
          >
            <Plus className="w-5 h-5" />
            Add Hours
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-sage-800">
              {editingId ? 'Edit Hours' : 'New Hours'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-sage-600 hover:text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-500 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isSpecial')}
                  className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
                />
                <span className="text-sm text-sage-800">Special Hours</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isClosed')}
                  className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
                />
                <span className="text-sm text-sage-800">Closed</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isSpecial ? (
                <div>
                  <label className="block text-sm font-medium text-sage-800 mb-2">
                    Day of Week *
                  </label>
                  <select
                    {...register('dayOfWeek')}
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    <option value="">Select day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  {errors.dayOfWeek && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dayOfWeek.message}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-sage-800 mb-2">
                    Special Date *
                  </label>
                  <input
                    type="date"
                    {...register('specialDate')}
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                </div>
              )}

              {!isClosed && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-sage-800 mb-2">
                      Open Time
                    </label>
                    <input
                      type="time"
                      {...register('openTime')}
                      className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-800 mb-2">
                      Close Time
                    </label>
                    <input
                      type="time"
                      {...register('closeTime')}
                      className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                </>
              )}
            </div>

            {isSpecial && (
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Special Note
                </label>
                <input
                  type="text"
                  {...register('specialNote')}
                  placeholder="e.g., Holiday hours"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
            )}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-sage-800 mb-4">Regular Hours</h3>
          <div className="space-y-2">
            {regularHours.map((hour) => (
              <div
                key={hour.id}
                className="flex items-center justify-between p-3 border border-earth-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sage-800">{hour.dayOfWeek}</p>
                  <p className="text-sm text-sage-600">
                    {hour.isClosed
                      ? 'Closed'
                      : `${hour.openTime} - ${hour.closeTime}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(hour)}
                    className="p-2 text-sage-700 hover:bg-sage-50 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(hour.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {regularHours.length === 0 && (
              <p className="text-sage-600 text-center py-4">No regular hours set</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-sage-800 mb-4">Special Hours</h3>
          <div className="space-y-2">
            {specialHours.map((hour) => (
              <div
                key={hour.id}
                className="flex items-center justify-between p-3 border border-earth-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sage-800">
                    {hour.specialDate &&
                      new Date(hour.specialDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-sage-600">
                    {hour.isClosed
                      ? 'Closed'
                      : `${hour.openTime} - ${hour.closeTime}`}
                  </p>
                  {hour.specialNote && (
                    <p className="text-xs text-sage-500 mt-1">{hour.specialNote}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(hour)}
                    className="p-2 text-sage-700 hover:bg-sage-50 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(hour.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {specialHours.length === 0 && (
              <p className="text-sage-600 text-center py-4">No special hours set</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}