export interface Comment {
    id: number;
    comment: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        avatar?: string | null;
    };
    is_downvote: boolean;
    is_upvote: boolean;
    upvotes_count: number;
    user_voted: boolean;
}
