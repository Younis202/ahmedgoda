"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span>{currentLocale === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
}
