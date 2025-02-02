import useFetch from '@/hooks/use-fetch';

interface FeatureSearchResult {
    id: number;
    name: string;
    description: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    comments_count: number;
    upvotes_count: number;
    downvotes_count: number;
}

export const useGetSearchFeatures = ({ query }: { query: string }) => {
    const response = useFetch<FeatureSearchResult[]>('/features/search/json', {
        enabled: !!query, // This will prevent the request from being sent
        params: { q: query },
        debounce: 500,
    });

    return response;
};
