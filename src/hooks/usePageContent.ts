import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface PageContent {
  id: string;
  page: string;
  section: string;
  contentType: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export function usePageContent(pageName: string) {
  const [content, setContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.public.getPageContent(pageName);
        setContent(data);
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  const getSection = (section: string) => {
    return content.find((c) => c.section === section);
  };

  const getSectionContent = (section: string, fallback: string = '') => {
    return getSection(section)?.content || fallback;
  };

  const getSectionImage = (section: string, fallback: string = '') => {
    return getSection(section)?.imageUrl || fallback;
  };

  return {
    content,
    loading,
    getSection,
    getSectionContent,
    getSectionImage,
  };
}