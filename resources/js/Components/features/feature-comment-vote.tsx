import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface FeatureCommentVoteProps {
    initialVotes?: number;
    userVoted?: boolean;
    commentId: string;
    isUpvote?: boolean;
    isDownvote?: boolean;
}

type VoteType = 'up' | 'down';

export function FeatureCommentVote({
    initialVotes = 0,
    userVoted = false,
    commentId,
    isUpvote = false,
    isDownvote = false,
}: Readonly<FeatureCommentVoteProps>) {
    const getInitialVote = (
        userVoted: boolean,
        isUpvote: boolean,
        isDownvote: boolean,
    ): VoteType | null => {
        if (!userVoted) {
            return null;
        }

        if (isUpvote) {
            return 'up';
        }

        if (isDownvote) {
            return 'down';
        }

        return null;
    };

    const [votes, setVotes] = useState(initialVotes);
    const [userVote, setUserVote] = useState<VoteType | null>(
        getInitialVote(userVoted, isUpvote, isDownvote),
    );

    const handleVote = (voteType: VoteType) => {
        if (userVote === voteType) {
            // User is un-voting
            router.post(
                `/comments/${commentId}/vote`,
                { is_upvote: voteType === 'up' },
                {
                    onSuccess: () => {
                        setVotes(
                            (prevVotes) =>
                                prevVotes + (voteType === 'up' ? -1 : 1),
                        );
                        setUserVote(null);
                    },
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        } else {
            // Calculate vote delta based on previous state
            const getVoteDelta = (
                newVote: VoteType,
                prevVote: VoteType | null,
            ): number => {
                if (!prevVote) return newVote === 'up' ? 1 : -1;
                return newVote === 'up' ? 2 : -2; // Switching from down to up or vice versa
            };

            router.post(
                `/comments/${commentId}/vote`,
                { is_upvote: voteType === 'up' },
                {
                    onSuccess: () => {
                        setVotes(
                            (prevVotes) =>
                                prevVotes + getVoteDelta(voteType, userVote),
                        );
                        setUserVote(voteType);
                    },
                    onError: (error) => {
                        console.error('Vote failed', error);
                    },
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                aria-label="Upvote"
                aria-pressed={userVote === 'up'}
                className={`${
                    userVote === 'up' ? 'text-green-500' : 'text-gray-500'
                } transition-colors hover:text-green-700`}
            >
                <ThumbsUp className="h-3 w-3" />
            </Button>
            <span className="text-md font-bold" aria-live="polite">
                {votes}
            </span>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                aria-label="Downvote"
                aria-pressed={userVote === 'down'}
                className={`${
                    userVote === 'down' ? 'text-red-500' : 'text-gray-500'
                } transition-colors hover:text-red-700`}
            >
                <ThumbsDown className="h-3 w-3" />
            </Button>
        </div>
    );
}
