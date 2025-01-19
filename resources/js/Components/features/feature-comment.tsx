import { FeatureCommentVote } from '@/Components/features/feature-comment-vote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/features';

interface Props extends Readonly<Comment> {
    onEdit: (commentId: number) => void;
    onDelete: (commentId: number) => void;
    userRole: 'admin' | 'moderator' | 'user';
    isAuthor: boolean;
}

export function FeatureComment({
    comment,
    created_at,
    id,
    onEdit,
    onDelete,
    user,
    userRole,
    isAuthor,
    is_upvote,
    is_downvote,
    upvotes_count,
    user_voted,
}: Props) {
    const name2 = user.name
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase();

    return (
        <div className="flex space-x-4 rounded-lg bg-white p-4 shadow">
            <Avatar>
                <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                />
                <AvatarFallback>{name2}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="mb-1 flex items-center justify-between space-x-2">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-sm text-gray-500">
                            {new Date(created_at).toLocaleDateString()}
                        </span>
                        {userRole === 'admin' ||
                        userRole === 'moderator' ||
                        isAuthor ? (
                            <>
                                <button
                                    onClick={() => onEdit(id)}
                                    className="text-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </>
                        ) : null}
                    </div>
                    <FeatureCommentVote
                        commentId={id.toString()}
                        isUpvote={is_upvote}
                        isDownvote={is_downvote}
                        initialVotes={upvotes_count}
                        userVoted={user_voted}
                    />
                </div>
                <p className="text-gray-700">{comment}</p>
            </div>
        </div>
    );
}
