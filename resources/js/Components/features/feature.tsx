import { FeatureVote } from '@/Components/features/feature-vote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Datum } from '@/types/features';

export const Feature = ({ feature }: { feature: Datum }) => {
    return (
        <div className="container mx-auto p-4">
            <Card className="mx-auto w-full max-w-3xl">
                <CardHeader>
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
                            <div>
                                <p className="font-medium">
                                    {feature.user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {feature.user.email}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            User ID: {feature.user.id}
                        </p>
                        <p className="text-sm text-gray-500">
                            Email Verified:{' '}
                            {new Date(
                                feature.user.email_verified_at,
                            ).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            User Created:{' '}
                            {new Date(feature.user.created_at).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            User Updated:{' '}
                            {new Date(feature.user.updated_at).toLocaleString()}
                        </p>
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
                        {feature.comments.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {feature.comments.map((comment) => (
                                    <li
                                        key={`comment-${comment.id}`}
                                        className="text-gray-600"
                                    >
                                        {comment}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-sm text-gray-500">
                        <p>
                            Created:{' '}
                            {new Date(feature.created_at).toLocaleString()}
                        </p>
                        <p>ID: {feature.id}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
