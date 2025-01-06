import { User } from '@/types';
import { usePage } from '@inertiajs/react';

export function useCurrentUser(): User | null {
    const { auth } = usePage().props;
    return auth.user || null;
}
