import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';
import type { Class } from '@/types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const classSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  instructor: z.string().min(1, 'Instructor is required'),
  imageUrl: z.string().url('Invalid URL'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0),
  maxSeats: z.number().min(1),
  availableSeats: z.number().min(0),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  materials: z.string().optional(),
  prerequisites: z.string().optional(),
});

type ClassFormData = z.infer<typeof classSchema>;

export default function ClassesTab() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const token = useAdminStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      isFeatured: false,
      isActive: true,
      price: 0,
      maxSeats: 10,
      availableSeats: 10,
    },
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    if (!token) return;
    const response = await api.admin.getClasses(token);
    if (response.success && response.data) {
      setClasses(response.data as Class[]);
    }
  };

  const onSubmit = async (data: ClassFormData) => {
    if (!token) return;

    // Convert materials string to array
    const formattedData = {
      ...data,
      materials: data.materials
        ? data.materials.split(',').map((m) => m.trim())
        : [],
    };

    let response;
    if (editingId) {
      response = await api.admin.updateClass(editingId, formattedData, token);
    } else {
      response = await api.admin.createClass(formattedData, token);
    }

    if (response.success) {
      alert(editingId ? 'Class updated!' : 'Class created!');
      fetchClasses();
      handleCancel();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleEdit = (classItem: Class) => {
    setEditingId(classItem.id);
    reset({
      ...classItem,
      materials: classItem.materials?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this class?')) return;

    const response = await api.admin.deleteClass(id, token);
    if (response.success) {
      alert('Class deleted!');
      fetchClasses();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset({
      slug: '',
      title: '',
      description: '',
      longDescription: '',
      instructor: '',
      imageUrl: '',
      date: '',
      time: '',
      duration: '',
      price: 0,
      maxSeats: 10,
      availableSeats: 10,
      isFeatured: false,
      isActive: true,
      materials: '',
      prerequisites: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-sage-800">
          Manage Classes
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
          >
            <Plus className="w-5 h-5" />
            Add Class
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-sage-800">
              {editingId ? 'Edit Class' : 'New Class'}
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
                  Slug *
                </label>
                <input
                  type="text"
                  {...register('slug')}
                  placeholder="e.g., container-gardening-101"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Short Description *
              </label>
              <textarea
                {...register('description')}
                rows={2}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Long Description
              </label>
              <textarea
                {...register('longDescription')}
                rows={4}
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  {...register('instructor')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.instructor && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instructor.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  {...register('imageUrl')}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  {...register('time')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  {...register('duration')}
                  placeholder="e.g., 2 hours"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Max Seats *
                </label>
                <input
                  type="number"
                  {...register('maxSeats', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.maxSeats && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.maxSeats.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Available Seats *
                </label>
                <input
                  type="number"
                  {...register('availableSeats', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.availableSeats && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.availableSeats.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Materials (comma-separated)
              </label>
              <input
                type="text"
                {...register('materials')}
                placeholder="e.g., Potting soil, Seeds, Containers"
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                Prerequisites
              </label>
              <input
                type="text"
                {...register('prerequisites')}
                placeholder="e.g., None or Basic gardening knowledge"
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
                />
                <span className="text-sm text-sage-800">Featured on homepage</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 text-sage-700 border-earth-300 rounded focus:ring-sage-500"
                />
                <span className="text-sm text-sage-800">Active (visible on website)</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.length === 0 ? (
          <p className="text-sage-600 col-span-full text-center py-8">
            No classes created yet
          </p>
        ) : (
          classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={classItem.imageUrl}
                alt={classItem.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  {classItem.isFeatured && (
                    <span className="px-2 py-1 text-xs bg-terracotta-100 text-terracotta-800 rounded">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      classItem.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {classItem.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sage-800 mb-2">
                  {classItem.title}
                </h3>
                <p className="text-sm text-sage-600 mb-3 line-clamp-2">
                  {classItem.description}
                </p>
                <div className="flex justify-between text-sm text-sage-700 mb-3">
                  <span>{new Date(classItem.date).toLocaleDateString()}</span>
                  <span>${classItem.price}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(classItem)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sage-700 border border-sage-700 hover:bg-sage-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classItem.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}