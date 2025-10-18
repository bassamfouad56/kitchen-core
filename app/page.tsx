import { redirect } from 'next/navigation';

// This is the root page that redirects to the default locale
export default function RootPage() {
  redirect('/en');
}
