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
import { format } from 'date-fns';
import { Loader2, Search } from 'lucide-react';
import * as React from 'react';

export const FeatureSearch = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const { data, isLoading, error } = useGetSearchFeatures({ query: value });
    const { toast } = useToast();

    // Extract all tags from the search query
    const tags = value
        .split(' ')
        .filter((word) => word.startsWith('#'))
        .map((tag) => tag.slice(1));

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

    // Add redirect to tag page
    const redirectToTag = (tag: string) => {
        router.visit(route('tags.show', tag));
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
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search..."
                            value={value}
                            onValueChange={handleSearch}
                        />
                        {value && (
                            <CommandList className="max-h-[500px] overflow-y-auto">
                                <CommandEmpty>
                                    {isLoading
                                        ? 'Searching...'
                                        : 'No results found.'}
                                </CommandEmpty>
                                {/* Show tag results if any tags are found */}
                                {tags.length > 0 && (
                                    <CommandGroup heading="Tags">
                                        {tags.map((tag, index) => (
                                            <CommandItem
                                                key={`tag-search-${index}-${tag}`}
                                                onSelect={() => {
                                                    redirectToTag(tag);
                                                    setOpen(false);
                                                }}
                                                className="flex flex-col items-start gap-1"
                                            >
                                                <div className="font-medium">
                                                    Search for tag: #{tag}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Click to view all features
                                                    with this tag
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {/* Show feature results */}
                                <CommandGroup heading="Features">
                                    {data?.map((item) => (
                                        <CommandItem
                                            key={`feature-search-${item.id}-${item.name}`}
                                            onSelect={() => {
                                                redirectToFeature(item.id);
                                                setOpen(false);
                                            }}
                                            className="flex flex-col items-start gap-1"
                                        >
                                            <div className="font-medium">
                                                {item.name}
                                            </div>
                                            <div className="line-clamp-1 break-all text-xs text-muted-foreground">
                                                {item.description?.substring(
                                                    0,
                                                    100,
                                                ) +
                                                    (item.description?.length >
                                                    100
                                                        ? '...'
                                                        : '')}
                                            </div>
                                            <div className="flex gap-2 text-xs text-muted-foreground">
                                                <span
                                                    className={
                                                        item.upvotes_count > 0
                                                            ? 'text-green-500'
                                                            : item.upvotes_count <
                                                                0
                                                              ? 'text-red-500'
                                                              : ''
                                                    }
                                                >
                                                    ↑ {item.upvotes_count}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    💬 {item.comments_count}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    Last activity:{' '}
                                                    {format(
                                                        new Date(
                                                            item.updated_at,
                                                        ),
                                                        'MMM d, yyyy',
                                                    )}
                                                </span>
                                            </div>
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
