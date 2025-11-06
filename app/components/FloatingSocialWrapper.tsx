import { getCompanySettings } from '@/lib/db/settings';
import FloatingSocial from './FloatingSocial';

export default async function FloatingSocialWrapper() {
  const settings = await getCompanySettings();

  return (
    <FloatingSocial
      whatsappNumber={settings?.whatsappNumber || '+971567888640'}
      instagramUrl={settings?.instagramUrl || 'https://www.instagram.com/kitchen_core_uae'}
    />
  );
}
