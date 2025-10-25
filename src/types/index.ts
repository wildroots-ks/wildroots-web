// Public Content Types
export interface Settings {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  usePicktime: boolean;
  picktimeUrl?: string;
}

export interface Hours {
  id: string;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  isSpecial?: boolean;
  specialDate?: string;
  specialNote?: string;
}

export interface Banner {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'seasonal';
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
}

export interface Class {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  instructor: string;
  imageUrl: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  maxSeats: number;
  availableSeats: number;
  isFeatured: boolean;
  isActive: boolean;
  materials?: string[];
  prerequisites?: string;
}
export interface Registration {
  id: string;
  _id?: string;
  classId: string;
  className: string;
  classDate: string;
  name: string;
  email: string;
  phone: string;
  seats: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
export interface ClassRegistration {
  classId: string;
  name: string;
  email: string;
  phone: string;
  seats: number;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AdminUser;
  token: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}