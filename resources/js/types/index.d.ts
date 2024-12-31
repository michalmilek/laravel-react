import { Permission } from '@/lib/permissions';
import { Role } from '@/lib/roles';
import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: Role[];
    permissions: Permission[];
}

type Nullable<T> = T | null;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Paginated<T> = {
    data: T[];
    links: {
        first: Nullable<string>;
        last: Nullable<string>;
        prev: Nullable<string>;
        next: Nullable<string>;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
};
