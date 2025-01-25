export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    avatar?: string | null;
    features_count?: number;
    comments_count?: number;
}
