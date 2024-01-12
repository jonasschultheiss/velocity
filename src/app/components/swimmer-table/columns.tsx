'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import type { Swimmer } from 'src/db/schema';
import { urlNameToIdentifier } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type SwimmerColumnType = Pick<
  Swimmer,
  'surname' | 'lastname' | 'club' | 'weight' | 'height' | 'birthdate'
>;

export function generateColumns(
  handleRouteChange: (url: string) => void,
): ColumnDef<SwimmerColumnType>[] {
  return [
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {
        const swimmer = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8 p-0" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  handleRouteChange(
                    `/swimmers/${urlNameToIdentifier(swimmer)}`,
                  );
                }}
              >
                Go to details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleRouteChange(
                    `/comparison?a-swimmer=${urlNameToIdentifier(swimmer)}`,
                  );
                }}
              >
                Use for comparison
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  void navigator.clipboard.writeText(
                    urlNameToIdentifier(swimmer),
                  )
                }
              >
                Copy URL idenfitier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    {
      header: 'Club',
      accessorKey: 'club',
    },
    {
      header: 'Weight',
      accessorKey: 'weight',
      accessorFn: ({ weight }) => {
        return weight ? `${weight} kg` : undefined;
      },
    },
    {
      header: 'Height',
      accessorKey: 'height',
      accessorFn: ({ height }) => {
        return height ? `${height} cm` : undefined;
      },
    },
    {
      header: 'Birthdate',
      accessorKey: 'birthdate',
      accessorFn: ({ birthdate }) => {
        if (birthdate) {
          return `${birthdate.getDate()}.${birthdate.getMonth()}.${birthdate.getFullYear()}`;
        }

        return '';
      },
    },
  ];
}
