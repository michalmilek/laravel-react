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
    comments: any[];
    created_at: string;
}

export interface User {
    id: number;
    name: Name;
    email: Email;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
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
