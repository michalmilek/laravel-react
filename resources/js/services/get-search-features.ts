import useFetch from '@/hooks/use-fetch';

interface FeatureSearchResult {
    id: number;
    name: string;
    description: string;
}

export const useGetSearchFeatures = ({ query }: { query: string }) => {
    const response = useFetch<FeatureSearchResult[]>('/features/search/json', {
        enabled: !!query, // This will prevent the request from being sent
        params: { q: query },
        debounce: 500,
    });

    return response;
};
