import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface FeatureVoteProps {
    initialVotes?: number;
    userVoted?: boolean;
    featureId: string;
    isUpvote?: boolean;
    isDownvote?: boolean;
}

type VoteType = 'up' | 'down';

export function FeatureVote({
    initialVotes = 0,
    userVoted = false,
    featureId,
    isUpvote = false,
    isDownvote = false,
}: Readonly<FeatureVoteProps>) {
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
                `/features/${featureId}/vote`,
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
                `/features/${featureId}/vote`,
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
                <ThumbsUp className="mr-2 h-5 w-5" />
                Upvote
            </Button>
            <span className="text-xl font-bold" aria-live="polite">
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
                <ThumbsDown className="mr-2 h-5 w-5" />
                Downvote
            </Button>
        </div>
    );
}
