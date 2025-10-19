import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { usePublicStore } from '@/store/publicStore';
import { useAdminStore } from '@/store/adminStore';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Classes from '@/pages/Classes';
import ClassDetail from '@/pages/ClassDetail';
import Hours from '@/pages/Hours';
import Sales from '@/pages/Sales';
import New from '@/pages/New';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  const verifyAuth = useAdminStore((state) => state.verifyAuth);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const fetchSettings = usePublicStore((state) => state.fetchSettings);
  const fetchBanners = usePublicStore((state) => state.fetchBanners);

  useEffect(() => {
    fetchSettings();
    fetchBanners();
  }, [fetchSettings, fetchBanners]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/classes"
            element={
              <Layout>
                <Classes />
              </Layout>
            }
          />
          <Route
            path="/classes/:slug"
            element={
              <Layout>
                <ClassDetail />
              </Layout>
            }
          />
          <Route
            path="/hours"
            element={
              <Layout>
                <Hours />
              </Layout>
            }
          />
          <Route
            path="/sales"
            element={
              <Layout>
                <Sales />
              </Layout>
            }
          />
          <Route
            path="/new"
            element={
              <Layout>
                <New />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* Admin routes without main layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                  <h1 className="text-4xl font-serif font-bold text-sage-800 mb-4">
                    404 - Page Not Found
                  </h1>
                  <p className="text-sage-600 mb-8">
                    The page you're looking for doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="inline-block px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;