/* eslint-disable @typescript-eslint/no-non-null-assertion -- i know that the array has items*/
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- weird case*/
'use client';

import type { SortingState, VisibilityState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { nameToUrlIdentifier, preambleList } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { SwimmerColumnType } from './columns';
import { generateColumns } from './columns';

interface DataTableProps {
  data: SwimmerColumnType[];
}

export function DataTable({ data }: DataTableProps): ReactNode {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();
  function handleRouteChange(path: string): void {
    router.push(path);
  }

  const columns = generateColumns(handleRouteChange);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      sorting,
      rowSelection,
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
  });

  const amountOfSelected = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-start gap-2 pt-8 pb-4 md:gap-4">
        <Input
          className="max-w-sm"
          onChange={(event) => {
            setGlobalFilter(event.target.value);
          }}
          placeholder="Filter swimmers..."
          value={globalFilter.toString() ?? ''}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    className="capitalize"
                    key={column.id}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(Boolean(value));
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {sorting.length > 0 ? (
          <Button
            onClick={() => {
              setSorting([]);
            }}
            variant="ghost"
          >
            Reset sorting
          </Button>
        ) : null}
        {amountOfSelected >= 2 && amountOfSelected <= 8 ? (
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href={`/comparison?${table
              .getFilteredSelectedRowModel()
              .rows.map(
                ({ original }, index) =>
                  `${preambleList[index]!}swimmer=${nameToUrlIdentifier(
                    original,
                  )}${index + 1 !== amountOfSelected ? '&' : ''}`,
              )
              .join('')}`}
          >
            Compare selected swimmers
          </Link>
        ) : null}
        {amountOfSelected > 0 ? (
          <div className="my-auto text-sm justify-self-end text-muted-foreground">
            {amountOfSelected} of {table.getFilteredRowModel().rows.length}{' '}
            swimmer(s) selected.
          </div>
        ) : null}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
