import { ConfirmationModal } from '@/Components/ConfirmationModal';
import { FeatureComment } from '@/Components/features/feature-comment';
import { FeatureCommentForm } from '@/Components/features/feature-comment-form';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/types/features/comment';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    comments: Comment[];
    featureId: number;
    userRole: 'admin' | 'moderator' | 'user';
    userId: number;
}

export function FeatureComments({
    comments,
    featureId,
    userRole,
    userId,
}: Readonly<Props>) {
    const { toast } = useToast();
    const [editingCommentId, setEditingCommentId] = useState<number>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const handleEdit = (commentId: number) => {
        setEditingCommentId(commentId);
    };

    const handleCancel = () => {
        setEditingCommentId(undefined);
    };

    const handleDelete = (commentId: number) => {
        setCommentToDelete(commentId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (commentToDelete) {
            router.delete(`/comments/${commentToDelete}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    toast({
                        title: 'Comment deleted',
                        description:
                            'The comment has been successfully deleted.',
                        variant: 'success',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description:
                            'An error occurred while deleting the comment.',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    return (
        <div className="mx-auto mt-8 max-w-2xl">
            <div className="mb-8 space-y-4">
                {comments.length ? (
                    comments.map((comment) => (
                        <FeatureComment
                            key={`comment-${comment.id}`}
                            {...comment}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            userRole={userRole}
                            isAuthor={comment.user.id === userId}
                        />
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <FeatureCommentForm
                featureId={featureId}
                commentId={editingCommentId}
                comments={comments}
                onCancel={handleCancel}
            />
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
