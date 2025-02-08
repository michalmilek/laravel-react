import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';

interface TagDisplayProps {
    tags: Tag[];
}

interface Tag {
    name: string;
    slug: string;
    id: number;
}

export const TagDisplay = ({ tags }: TagDisplayProps) => {
    return (
        <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Badge
                    onClick={() => router.visit(`/tags/${tag.slug}`)}
                    variant={'secondary'}
                    key={`tag-${tag.id}`}
                    className="cursor-pointer"
                >
                    #{tag.name}
                </Badge>
            ))}
        </div>
    );
};
