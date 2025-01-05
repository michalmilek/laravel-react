import { Comment } from '@/types/features';

interface Props extends Readonly<Comment> {
    onEdit: (commentId: number) => void;
}

export function FeatureComment({ comment, created_at, id, onEdit }: Props) {
    return (
        <div className="flex space-x-4 rounded-lg bg-white p-4 shadow">
            {/* <Avatar>
                <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
            </Avatar> */}
            <div className="flex-1">
                <div className="mb-1 flex items-center space-x-2">
                    {/* <span className="font-semibold">{author}</span> */}
                    <span className="text-sm text-gray-500">
                        {new Date(created_at).toLocaleDateString()}
                    </span>
                    <button
                        onClick={() => onEdit(id)}
                        className="text-blue-500"
                    >
                        Edit
                    </button>
                </div>
                <p className="text-gray-700">{comment}</p>
            </div>
        </div>
    );
}
