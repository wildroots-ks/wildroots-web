import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';

// Schema for page content
const pageContentSchema = z.object({
  page: z.enum(['home', 'about', 'classes', 'hours', 'sales', 'new', 'contact']),
  section: z.string().min(1, 'Section name is required'),
  contentType: z.enum(['text', 'heading', 'image', 'hero']),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  order: z.number().min(0),
});

type PageContentFormData = z.infer<typeof pageContentSchema>;

interface PageContent {
  id?: string;
  _id?: string;
  page: string;
  section: string;
  contentType: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export default function PageContentTab() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const token = useAdminStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<PageContentFormData>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      page: 'home',
      section: '',
      contentType: 'text',
      content: '',
      imageUrl: '',
      order: 0,
    },
  });

  const contentType = watch('contentType');

  useEffect(() => {
    fetchContents();
  }, [selectedPage]);

  const fetchContents = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.admin.getPageContent(selectedPage, token);
      if (response.success && response.data) {
        setContents(response.data as PageContent[]);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PageContentFormData) => {
    if (!token) return;

    try {
      let imageUrl = data.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await api.admin.uploadImage(formData, token);
        if (uploadResponse.success && uploadResponse.data) {
          imageUrl = uploadResponse.data.url;
        }
      }

      const contentData = {
        ...data,
        imageUrl,
      };

      let response;
      if (editingId) {
        response = await api.admin.updatePageContent(editingId, contentData, token);
      } else {
        response = await api.admin.createPageContent(contentData, token);
      }

      if (response.success) {
        alert(editingId ? 'Content updated!' : 'Content created!');
        fetchContents();
        handleCancel();
      }
    } catch (error: any) {
      console.error('Error saving content:', error);
      alert(error.response?.data?.error || 'Failed to save content');
    }
  };

  const handleEdit = (content: PageContent) => {
    setEditingId(content._id || content.id || null);
    reset({
      page: content.page as any,
      section: content.section,
      contentType: content.contentType as any,
      content: content.content,
      imageUrl: content.imageUrl || '',
      order: content.order,
    });
    if (content.imageUrl) {
      setImagePreview(content.imageUrl);
    }
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    if (!token) return;

    try {
      const response = await api.admin.deletePageContent(id, token);
      if (response.success) {
        alert('Content deleted!');
        fetchContents();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview('');
    reset({
      page: selectedPage as any,
      section: '',
      contentType: 'text',
      content: '',
      imageUrl: '',
      order: 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-earth-200">
        <label className="block text-sm font-medium text-sage-800 mb-2">
          Select Page to Edit
        </label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="home">Home</option>
          <option value="about">About</option>
          <option value="classes">Classes</option>
          <option value="hours">Hours</option>
          <option value="sales">Sales</option>
          <option value="new">What's New</option>
          <option value="contact">Contact</option>
        </select>
      </div>

      {/* Add Content Button */}
      {!showForm && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
          >
            <Plus className="w-5 h-5" />
            Add Content Section
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-sage-900">
              {editingId ? 'Edit Content' : 'New Content Section'}
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
                  Section Name *
                </label>
                <input
                  type="text"
                  {...register('section')}
                  placeholder="e.g., Hero, Welcome, Features"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                {errors.section && (
                  <p className="mt-1 text-sm text-red-600">{errors.section.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Content Type *
                </label>
                <select
                  {...register('contentType')}
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  <option value="text">Text/Paragraph</option>
                  <option value="heading">Heading</option>
                  <option value="image">Image</option>
                  <option value="hero">Hero Section</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Display Order *
                </label>
                <input
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  min="0"
                  className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-800 mb-2">
                {contentType === 'heading' ? 'Heading Text *' : 'Content *'}
              </label>
              <textarea
                {...register('content')}
                rows={contentType === 'heading' ? 2 : 6}
                placeholder={
                  contentType === 'heading'
                    ? 'Enter heading text'
                    : 'Enter your content here...'
                }
                className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {/* Image Upload Section */}
            {(contentType === 'image' || contentType === 'hero') && (
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-2">
                  Upload Image
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-earth-100 hover:bg-earth-200 text-sage-700 rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-5 h-5" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imageFile && (
                      <span className="text-sm text-sage-600">{imageFile.name}</span>
                    )}
                  </div>

                  {imagePreview && (
                    <div className="relative w-full max-w-md">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-earth-300"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-sage-800 mb-2">
                      Or enter image URL
                    </label>
                    <input
                      type="url"
                      {...register('imageUrl')}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                </div>
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
                className="px-6 py-2 bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm border border-earth-200">
        <div className="p-4 border-b border-earth-200">
          <h3 className="text-lg font-semibold text-sage-900">
            Current Content - {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page
          </h3>
        </div>

        <div className="p-4">
          {loading ? (
            <p className="text-center text-sage-600 py-8">Loading content...</p>
          ) : contents.length === 0 ? (
            <p className="text-center text-sage-600 py-8">
              No content yet. Click "Add Content Section" to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => (
                <div
                  key={content._id || content.id}
                  className="flex items-start gap-4 p-4 border border-earth-200 rounded-lg hover:border-sage-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-sage-100 text-sage-800">
                        {content.section}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-earth-100 text-earth-800">
                        {content.contentType}
                      </span>
                      <span className="text-xs text-sage-500">Order: {content.order}</span>
                    </div>
                    <p className="text-sage-700 text-sm line-clamp-2">{content.content}</p>
                    {content.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={content.imageUrl}
                          alt={content.section}
                          className="w-32 h-20 object-cover rounded border border-earth-300"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(content)}
                      className="p-2 text-sage-700 hover:bg-sage-50 rounded focus:outline-none focus:ring-2 focus:ring-sage-500"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(content._id || content.id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}