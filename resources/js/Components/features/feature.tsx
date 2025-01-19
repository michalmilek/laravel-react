import { FeatureComments } from '@/Components/features/feature-comments';
import { FeatureVote } from '@/Components/features/feature-vote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Datum } from '@/types/features';
import { Link } from '@inertiajs/react';
import { useCallback } from 'react';

export const Feature = ({ feature }: { feature: Datum }) => {
    console.log('🚀 ~ Feature ~ feature:', feature);
    const user = useCurrentUser();

    const getUserRole = useCallback(() => {
        if (user?.roles.includes('admin')) {
            return 'admin';
        } else if (user?.roles.includes('moderator')) {
            return 'moderator';
        } else {
            return 'user';
        }
    }, [user]);

    const userRole = getUserRole();

    return (
        <div className="container mx-auto p-4">
            <Card className="mx-auto w-full max-w-3xl">
                <CardHeader>
                    <div className="flex justify-between text-sm text-gray-500">
                        <p>
                            Created:{' '}
                            {new Date(feature.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">
                            {feature.name}
                        </CardTitle>
                        <Badge
                            variant={feature.status ? 'default' : 'secondary'}
                        >
                            {feature.status || 'No Status'}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold">User</h3>
                        <div className="flex items-center">
                            <Avatar className="mr-2 h-10 w-10">
                                <AvatarImage
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${feature.user.name}`}
                                />
                                <AvatarFallback>
                                    {feature.user.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <Link
                                    href={route('user.profile', {
                                        id: feature.user.id,
                                    })}
                                    className="font-medium"
                                >
                                    {feature.user.name}
                                </Link>
                                <a
                                    href={`mailto:${feature.user.email}`}
                                    className="text-sm text-gray-500"
                                >
                                    {feature.user.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Upvotes</h3>
                        <FeatureVote
                            userVoted={feature.user_voted}
                            initialVotes={feature.upvotes_count}
                            featureId={feature.id.toString()}
                        />
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold">Comments</h3>
                        <FeatureComments
                            comments={feature.comments}
                            featureId={feature.id}
                            userRole={userRole}
                            userId={user?.id ?? 0}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
