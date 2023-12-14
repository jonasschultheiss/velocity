'use client';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Swimmer } from 'src/db/schema';
import { Button } from '../ui/button';

export type SwimmerColumnType = Pick<
  Swimmer,
  'id' | 'surname' | 'lastname' | 'club' | 'weight' | 'height' | 'birthdate'
>;

export const swimmerColumns: ColumnDef<SwimmerColumnType>[] = [
  {
    header: 'Link',
    accessorKey: 'id',
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link href={`/swimmers/${row.original.id}`}>
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>
      </Button>
    ),
  },
  {
    header: 'Surname',
    accessorKey: 'surname',
  },
  {
    header: 'Lastname',
    accessorKey: 'lastname',
  },
  {
    header: 'Club',
    accessorKey: 'club',
  },
  {
    header: 'Weight',
    accessorKey: 'weight',
    accessorFn: ({ height }) => {
      return `${height} kg`;
    },
  },
  {
    header: 'Height',
    accessorKey: 'height',
    accessorFn: ({ height }) => {
      return `${height} cm`;
    },
  },
  {
    header: 'Birthdate',
    accessorKey: 'birthdate',
    accessorFn: ({ birthdate }) => {
      return `${birthdate.getDate()}.${birthdate.getMonth()}.${birthdate.getFullYear()}`;
    },
  },
];
