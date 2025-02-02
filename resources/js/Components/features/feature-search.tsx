import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useGetSearchFeatures } from '@/services/get-search-features';
import { router } from '@inertiajs/react';
import { Loader2, Search } from 'lucide-react';
import * as React from 'react';

export const FeatureSearch = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const { data, isLoading, error } = useGetSearchFeatures({ query: value });
    const { toast } = useToast();

    const handleSearch = (currentValue: string) => {
        setValue(currentValue);
    };

    React.useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    }, [error, toast]);

    const redirectToFeature = (id: number) => {
        router.visit(route('features.show', id));
    };

    return (
        <div className="w-[300px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value || 'Search...'}
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            value={value}
                            onValueChange={handleSearch}
                        />
                        {value && (
                            <CommandList>
                                <CommandEmpty>
                                    {isLoading
                                        ? 'Searching...'
                                        : 'No results found.'}
                                </CommandEmpty>
                                <CommandGroup>
                                    {data?.map((item) => (
                                        <CommandItem
                                            key={`feature-search-${item.id}`}
                                            onSelect={() => {
                                                redirectToFeature(item.id);
                                                setOpen(false);
                                            }}
                                        >
                                            {item.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            {isLoading && (
                <div className="mt-2 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2 text-sm text-muted-foreground">
                        Searching...
                    </span>
                </div>
            )}
        </div>
    );
};
