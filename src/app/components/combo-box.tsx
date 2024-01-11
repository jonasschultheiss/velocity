/* eslint-disable no-nested-ternary -- time restriction*/
'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CompoBoxProperties {
  optionType: string;
  options: Option[];
  initialValue?: string | null;
}

export function ComboBox({
  options,
  optionType,
  initialValue,
}: Readonly<CompoBoxProperties>): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[220px] justify-between"
          role="combobox"
          variant="outline"
        >
          {initialValue
            ? typeof initialValue === 'string'
              ? initialValue
              : options.find((option) => option.value === initialValue)?.label
            : `Select ${optionType}...`}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${optionType}...`} />
          <CommandEmpty>No {optionType} found.</CommandEmpty>
          <CommandList>
            {options.map((option) => (
              <CommandItem
                className={cn(
                  option.value.includes('remove') &&
                    'aria-selected:bg-destructive aria-selected:text-destructive-foreground text-destructive',
                )}
                disabled={option.disabled}
                key={option.value}
                onSelect={() => {
                  if (option.onClick) {
                    option.onClick();
                    setOpen(false);
                  }
                }}
                value={option.value}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    initialValue === option.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {option.label}
                {option.disabled ? (
                  <Badge className="ml-2" variant="destructive">
                    N/A
                  </Badge>
                ) : null}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
