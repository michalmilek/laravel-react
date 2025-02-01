import { Comment } from '@/types/features/comment';

export interface Feature {
    data: Datum[];
    links: Links;
    meta: Meta;
}

export interface Datum {
    id: number;
    name: string;
    description: string;
    status: null;
    user: User;
    upvotes: any[];
    comments: Comment[];
    created_at: string;
    upvotes_count: number;
    user_voted: boolean;
    is_upvote: boolean;
    is_downvote: boolean;
}

export interface User {
    id: number;
    name: Name;
    email: Email;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    avatar?: string | null;
}

export enum Email {
    AdminExampleCOM = 'admin@example.com',
}

export enum Name {
    TestAdmin = 'Test Admin',
}

export interface Links {
    first: string;
    last: string;
    prev: null;
    next: null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface FeatureData {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
}
