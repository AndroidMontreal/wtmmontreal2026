import { redirect } from 'next/navigation';

// Root Redirect for Static Export compatibility
// When a user hits '/', we send them to '/fr'
export default function RootPage() {
  redirect('/fr');
}
