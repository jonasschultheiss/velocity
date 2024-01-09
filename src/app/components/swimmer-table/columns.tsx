'use client';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import type { Swimmer } from 'src/db/schema';
import { NAME_SPLIT } from '@/lib/utils';
import { Button } from '../ui/button';

export type SwimmerColumnType = Pick<
  Swimmer,
  'surname' | 'lastname' | 'club' | 'weight' | 'height' | 'birthdate'
>;

export const swimmerColumns: ColumnDef<SwimmerColumnType>[] = [
  {
    header: 'Link',
    accessorKey: 'id',
    cell: ({ row }) => {
      const { surname, lastname } = row.original;
      return (
        <Button asChild variant="link">
          <Link
            href={`/swimmers/${surname.toLocaleLowerCase()}${NAME_SPLIT}${lastname.toLocaleLowerCase()}`}
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
        </Button>
      );
    },
  },
  {
    header: 'Lastname',
    accessorKey: 'lastname',
  },
  {
    header: 'Surname',
    accessorKey: 'surname',
  },
  // {
  //   header: 'Club',
  //   accessorKey: 'club',
  // },
  // {
  //   header: 'Weight',
  //   accessorKey: 'weight',
  //   accessorFn: ({ height }) => {
  //     return `${height} kg`;
  //   },
  // },
  // {
  //   header: 'Height',
  //   accessorKey: 'height',
  //   accessorFn: ({ height }) => {
  //     return `${height} cm`;
  //   },
  // },
  // {
  //   header: 'Birthdate',
  //   accessorKey: 'birthdate',
  //   accessorFn: ({ birthdate }) => {
  //     if (birthdate) {
  //       return `${birthdate.getDate()}.${birthdate.getMonth()}.${birthdate.getFullYear()}`;
  //     }

  //     return <div>N/A</div>;
  //   },
  // },
];
