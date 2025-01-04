import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface FeatureVoteProps {
    initialVotes?: number;
    userVoted?: number; // 1 for upvote, 0 for not voted, -1 for downvote
    featureId: string;
}

type VoteType = 'up' | 'down';

export function FeatureVote({
    initialVotes = 0,
    userVoted = 0,
    featureId,
}: Readonly<FeatureVoteProps>) {
    // Convert numeric vote to internal state
    const getInitialVote = (vote: number): VoteType | null => {
        switch (vote) {
            case 1:
                return 'up';
            case -1:
                return 'down';
            default:
                return null;
        }
    };

    const [votes, setVotes] = useState(initialVotes);
    const [userVote, setUserVote] = useState<VoteType | null>(
        getInitialVote(userVoted),
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
