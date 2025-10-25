import type { Banner } from '@/types';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface BannerStripProps {
  banners: Banner[];
}

export default function BannerStrip({ banners }: BannerStripProps) {
  const activeBanners = banners.filter((banner) => {
    if (!banner.isActive) return false;

    const now = new Date();
    if (banner.startDate && new Date(banner.startDate) > now) return false;
    if (banner.endDate && new Date(banner.endDate) < now) return false;

    return true;
  });

  if (activeBanners.length === 0) return null;

  return (
    <div className="space-y-3">
      {activeBanners.map((banner) => (
        <div
          key={banner.id}
          className={`rounded-lg p-4 flex items-start gap-3 shadow-md ${
            banner.type === 'warning'
              ? 'bg-amber-50 border-l-4 border-amber-500'
              : banner.type === 'success'
              ? 'bg-emerald-50 border-l-4 border-emerald-500'
              : banner.type === 'seasonal'
              ? 'bg-terracotta-50 border-l-4 border-terracotta-500'
              : 'bg-sage-50 border-l-4 border-sage-500'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {banner.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            ) : banner.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            ) : (
              <Info className="w-5 h-5 text-sage-600" />
            )}
          </div>
          <div className="flex-1">
            <h3
              className={`font-semibold mb-1 ${
                banner.type === 'warning'
                  ? 'text-amber-900'
                  : banner.type === 'success'
                  ? 'text-emerald-900'
                  : banner.type === 'seasonal'
                  ? 'text-terracotta-900'
                  : 'text-sage-900'
              }`}
            >
              {banner.title}
            </h3>
            <p
              className={`text-sm ${
                banner.type === 'warning'
                  ? 'text-amber-800'
                  : banner.type === 'success'
                  ? 'text-emerald-800'
                  : banner.type === 'seasonal'
                  ? 'text-terracotta-800'
                  : 'text-sage-800'
              }`}
            >
              {banner.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}