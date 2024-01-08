import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested swimmer.</p>
      <Link
        className="px-4 py-2 mt-4 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400"
        href="/swimmers"
      >
        Go Back
      </Link>
    </main>
  );
}
