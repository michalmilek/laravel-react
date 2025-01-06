import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/features';

interface Props extends Readonly<Comment> {
    onEdit: (commentId: number) => void;
    onDelete: (commentId: number) => void;
}

export function FeatureComment({
    comment,
    created_at,
    id,
    onEdit,
    onDelete,
    user,
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
                <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-sm text-gray-500">
                        {new Date(created_at).toLocaleDateString()}
                    </span>
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
                </div>
                <p className="text-gray-700">{comment}</p>
            </div>
        </div>
    );
}
