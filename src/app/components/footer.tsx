import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="relative bottom-0 py-6 md:px-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
          Built by{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://www.linkedin.com/in/lukas-raphael-breiter-741229264/"
            rel="noreferrer"
            target="_blank"
          >
            Lukas Raphael Breiter
          </a>{' '}
          and{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://www.linkedin.com/in/jonasschultheiss"
            rel="noreferrer"
            target="_blank"
          >
            Jonas Raphael Schultheiss.
          </a>
        </p>
        <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
          The source code for the{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/HorusXIV/IDPA-Schwimmen-2023"
            rel="noreferrer"
            target="_blank"
          >
            backend
          </a>{' '}
          and{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/HorusXIV/IDPA-Schwimmen-2023"
            rel="noreferrer"
            target="_blank"
          >
            frontend
          </a>{' '}
          is available on GitHub.
        </p>
      </div>
    </footer>
  );
}
