'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAvatarUrl } from '@/lib/utils';
import { Comment } from '@/types/features';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { format } from 'date-fns';

interface UserCommentsProps {
    comments: Comment[];
    isFullWidth?: boolean;
    featureId: number;
    featureName: string;
}

export const UserComments = ({
    comments,
    isFullWidth = false,
    featureId,
    featureName,
}: Readonly<UserCommentsProps>) => {
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'PPpp');
    };

    return (
        <Card
            className={clsx(
                'container mx-auto mt-12 w-full',
                !isFullWidth && 'max-w-md',
                isFullWidth && 'max-w-7xl',
            )}
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/features/${featureId}`}
                        className="hover:underline"
                    >
                        <h2 className="text-xl font-bold">{featureName}</h2>
                    </Link>
                    <span className="text-sm text-gray-500">
                        {formatDate(comments[0].created_at)}
                    </span>
                </div>
                <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
                {comments.length === 0 ? (
                    <p className="text-center text-gray-500">No comments yet</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex space-x-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            getAvatarUrl(comment.user.avatar) ||
                                            ''
                                        }
                                        alt={comment.user.name}
                                    />
                                    <AvatarFallback>
                                        {comment.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="mb-1 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">
                                                {comment.user.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(comment.created_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">
                                                {comment.upvotes_count} votes
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
