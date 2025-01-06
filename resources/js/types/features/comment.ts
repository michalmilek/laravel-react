export interface Comment {
    id: number;
    comment: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
}
