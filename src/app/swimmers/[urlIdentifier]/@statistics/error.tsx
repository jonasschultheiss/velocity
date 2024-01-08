'use client';

import { type ReactElement } from 'react';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="px-4 py-2 mt-4 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => {
            reset();
          }
        }
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
