import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeaturesPaginated } from '@/types/features';
import clsx from 'clsx';
import { format } from 'date-fns';
import { MessageSquare, ThumbsUp } from 'lucide-react';

interface UserFeaturesProps {
    features: FeaturesPaginated;
    isFullWidth?: boolean;
}

export function UserFeatures({
    features,
    isFullWidth = false,
}: UserFeaturesProps) {
    return (
        <Card
            className={clsx(
                'container mx-auto mt-12 w-full',
                !isFullWidth && 'max-w-md',
                isFullWidth && 'max-w-7xl',
            )}
        >
            <CardHeader>
                <CardTitle>User's Features</CardTitle>
            </CardHeader>
            <CardContent>
                {features.data.length === 0 ? (
                    <p className="text-muted-foreground">
                        No articles created yet.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {features.data.map((feature) => (
                            <li key={feature.id}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            {feature.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <p className="text-sm text-muted-foreground">
                                            Created{' '}
                                            {format(feature.created_at, 'PPP')}
                                        </p>
                                        <p className="flex gap-4 text-sm text-muted-foreground">
                                            <Badge className="text-md inline-flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4" />
                                                {feature.comments_count}
                                            </Badge>
                                            <Badge
                                                className={clsx(
                                                    'text-md inline-flex items-center gap-2',
                                                    feature.upvotes_count -
                                                        feature.downvotes_count >
                                                        0 && 'bg-green-500',
                                                    feature.upvotes_count -
                                                        feature.downvotes_count <
                                                        0 && 'bg-red-500',
                                                )}
                                            >
                                                <ThumbsUp className="h-4 w-4" />
                                                {feature.upvotes_count -
                                                    feature.downvotes_count}
                                            </Badge>
                                        </p>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
