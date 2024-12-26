import { formatDistanceToNow, parseISO } from 'date-fns';

export const getTimeAgo = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
        console.error('Error parsing date:', error);
        return '';
    }
};
