import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

interface TagInputProps {
    tags: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
}

export function TagInput({ tags, addTag, removeTag }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleAddTag = () => {
        const trimmedInput = input.trim();
        if (trimmedInput && !tags.includes(trimmedInput)) {
            addTag(trimmedInput);
            setInput('');
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge variant={'secondary'} key={`tag-${tag}`}>
                        #{tag}
                        <Button
                            onClick={() => removeTag(tag)}
                            aria-label={`Remove ${tag} tag`}
                            type="button"
                            size={'icon'}
                            variant={'ghost'}
                        >
                            <X size={14} />
                        </Button>
                    </Badge>
                ))}
            </div>
            <div className="relative">
                <Input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Add tags..."
                    aria-label="Add a tag"
                />
                <Button
                    onClick={handleAddTag}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    size={'sm'}
                    aria-label="Add tag"
                    type="button"
                >
                    <Plus size={14} />
                    Add
                </Button>
            </div>
        </div>
    );
}
