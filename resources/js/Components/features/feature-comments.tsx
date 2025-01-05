import { FeatureComment } from '@/Components/features/feature-comment';
import { FeatureCommentForm } from '@/Components/features/feature-comment-form';
import { Comment } from '@/types/features/comment';
import { useState } from 'react';

interface Props {
    comments: Comment[];
    featureId: number;
}

export function FeatureComments({ comments, featureId }: Readonly<Props>) {
    const [editingCommentId, setEditingCommentId] = useState<number>();

    const handleEdit = (commentId: number) => {
        setEditingCommentId(commentId);
    };

    const handleCancel = () => {
        setEditingCommentId(undefined);
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
        </div>
    );
}
