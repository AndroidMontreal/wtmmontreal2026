'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/app/globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} bg-slate-950 text-white min-h-screen flex items-center justify-center p-6`}>
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-black text-[#00D9C0] mb-6">Oops!</h1>
          <h2 className="text-2xl font-bold mb-4">Something went wrong at the root level.</h2>
          <p className="text-slate-400 mb-8">
            We apologize for the inconvenience. Our team has been notified.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-[#00D9C0] text-slate-950 font-bold rounded-xl hover:bg-[#00bfab] transition-all active:scale-95 shadow-lg shadow-teal-500/20"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
