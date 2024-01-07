'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  onClick: () => void;
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
          className="w-[200px] justify-between"
          role="combobox"
          variant="outline"
        >
          {initialValue
            ? options.find((option) => option.value === initialValue)?.label
            : `Select ${optionType}...`}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${optionType}...`} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  option.onClick();
                  setOpen(false);
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
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
