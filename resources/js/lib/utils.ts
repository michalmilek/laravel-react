import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getAvatarUrl = (avatar?: string | null) => {
    return avatar ? `/storage/${avatar}` : null;
};
