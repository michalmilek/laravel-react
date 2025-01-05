import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/types/features';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    featureId: number;
    commentId?: number;
    comments: Comment[];
    onCancel: () => void;
}

const commentSchema = z.object({
    comment: z
        .string()
        .min(1, 'Comment is required')
        .max(500, 'Comment must be less than 500 characters'),
});

export function FeatureCommentForm({
    featureId,
    commentId,
    comments,
    onCancel,
}: Readonly<Props>) {
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<{ comment: string }>({
        resolver: zodResolver(commentSchema),
    });

    useEffect(() => {
        if (!commentId) reset();

        const commentToEdit = comments.find(
            (comment) => comment.id === commentId,
        );

        if (commentToEdit) {
            setValue('comment', commentToEdit.comment);
        }
    }, [commentId, setValue, reset, comments]);

    const onSubmit = async (data: { comment: string }) => {
        if (commentId) {
            router.put(
                `/comments/${commentId}`,
                {
                    comment: data.comment,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        toast({
                            title: 'Comment updated',
                            description: 'Your comment has been updated',
                            variant: 'success',
                        });
                        onCancel();
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            description: 'Something went wrong',
                            variant: 'destructive',
                        });
                    },
                    preserveState: true,
                },
            );
        } else {
            router.post(
                `/features/${featureId}/comments`,
                {
                    comment: data.comment,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        toast({
                            title: 'Comment added',
                            description: 'Your comment has been added',
                            variant: 'success',
                        });
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            description: 'Something went wrong',
                            variant: 'destructive',
                        });
                    },
                    preserveState: true,
                },
            );
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
                {...register('comment')}
                placeholder="Add a comment..."
                className="w-full"
                onKeyDown={handleKeyDown}
            />
            {errors.comment && (
                <span className="text-red-500">{errors.comment.message}</span>
            )}
            <Button type="submit">
                {commentId ? 'Update Comment' : 'Post Comment'}
            </Button>
        </form>
    );
}
