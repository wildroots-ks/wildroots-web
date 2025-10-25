import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { api } from '@/lib/api';
import type { Registration } from '@/types';
import { CheckCircle, XCircle, Clock, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export default function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAdminStore((state) => state.token);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    if (!token) return;
    setLoading(true);
    const response = await api.admin.getRegistrations(token);
    if (response.success && response.data) {
      setRegistrations(response.data as Registration[]);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!token) return;

    const response = await api.admin.updateRegistrationStatus(id, status, token);
    if (response.success) {
      alert('Status updated!');
      fetchRegistrations();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this registration?')) return;

    const response = await api.admin.deleteRegistration(id, token);
    if (response.success) {
      alert('Registration deleted!');
      fetchRegistrations();
    } else {
      alert('Error: ' + response.error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-sage-600">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-sage-800">
          Class Registrations
        </h2>
        <div className="text-sm text-sage-600">
          {registrations.length} total registration{registrations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-sage-600">No registrations yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div
              key={registration.id || registration._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-serif font-bold text-sage-800">
                      {registration.className}
                    </h3>
                    <span
                      className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        registration.status
                      )}`}
                    >
                      {getStatusIcon(registration.status)}
                      {registration.status.charAt(0).toUpperCase() +
                        registration.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sage-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(registration.classDate).toLocaleDateString()} at{' '}
                    {new Date(registration.classDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-sage-800 mb-1">
                    Student Information
                  </div>
                  <div className="text-sm text-sage-600 space-y-1">
                    <div className="font-medium">{registration.name}</div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      
                    <a href={`mailto:${registration.email}`}
                        className="hover:text-sage-800 transition-colors"
                      >
                        {registration.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      
                       <a href={`tel:${registration.phone}`}
                        className="hover:text-sage-800 transition-colors"
                      >
                        {registration.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-sage-800 mb-1">
                    Registration Details
                  </div>
                  <div className="text-sm text-sage-600 space-y-1">
                    <div>
                      <span className="font-medium">Seats:</span> {registration.seats}
                    </div>
                    <div>
                      <span className="font-medium">Registered:</span>{' '}
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </div>
                    {registration.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>{' '}
                        {registration.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-earth-200">
                {registration.status === 'pending' && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          registration.id || registration._id!,
                          'confirmed'
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          registration.id || registration._id!,
                          'cancelled'
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
                {registration.status === 'confirmed' && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        registration.id || registration._id!,
                        'cancelled'
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Registration
                  </button>
                )}
                {registration.status === 'cancelled' && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        registration.id || registration._id!,
                        'confirmed'
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Reconfirm
                  </button>
                )}
                <button
                  onClick={() => handleDelete(registration.id || registration._id!)}
                  className="flex items-center gap-2 px-4 py-2 border border-earth-300 text-sage-700 hover:bg-earth-50 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}