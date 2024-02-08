'use client';

import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import type { ReactElement } from 'react';
import type { Swimmer } from 'src/db/schema';
import { nameToUrlIdentifier } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Checkbox } from '../ui/checkbox';

export type SwimmerColumnType = Pick<
  Swimmer,
  'surname' | 'lastname' | 'club' | 'weight' | 'height' | 'birthdate'
>;

function makeSortable(
  label: string,
  column: Column<SwimmerColumnType>,
): ReactElement {
  return (
    <Button
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === 'asc');
      }}
      variant="ghost"
    >
      {label}
      <ArrowUpDown className="w-4 h-4 ml-2" />
    </Button>
  );
}

export function generateColumns(
  handleRouteChange: (url: string) => void,
): ColumnDef<SwimmerColumnType>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(Boolean(value));
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(Boolean(value));
          }}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: 'Actions',
      id: 'actions',
      enableSorting: false,
      enableHiding: false,
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
                    `/swimmers/${nameToUrlIdentifier(swimmer)}`,
                  );
                }}
              >
                Go to details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleRouteChange(
                    `/comparison?a-swimmer=${nameToUrlIdentifier(swimmer)}`,
                  );
                }}
              >
                Use for comparison
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  void navigator.clipboard.writeText(
                    nameToUrlIdentifier(swimmer),
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
      header: ({ column }) => makeSortable('Lastname', column),
      accessorKey: 'lastname',
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => makeSortable('Surname', column),
      accessorKey: 'surname',
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => makeSortable('Club', column),
      accessorKey: 'club',
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => makeSortable('Weight', column),
      accessorKey: 'weight',
      enableGlobalFilter: true,
      accessorFn: ({ weight }) => {
        return weight ? `${weight} kg` : undefined;
      },
    },
    {
      header: ({ column }) => makeSortable('Height', column),
      accessorKey: 'height',
      accessorFn: ({ height }) => {
        return height ? `${height} cm` : undefined;
      },
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => makeSortable('Birthdate', column),
      accessorKey: 'birthdate',
      enableGlobalFilter: true,
      accessorFn: ({ birthdate }) => {
        if (birthdate) {
          return `${birthdate.getFullYear()}.${birthdate.getMonth()}.${birthdate.getDate()}`;
        }

        return '';
      },
    },
  ];
}
