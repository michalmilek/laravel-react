import { useEffect, useRef, useState } from 'react';

interface UseFetchOptions extends RequestInit {
    enabled?: boolean;
    params?: Record<string, string | number | boolean>;
    debounce?: number;
}

function useFetch<T = unknown>(url: string, options: UseFetchOptions = {}) {
    const { enabled = true, params, debounce = 0, ...fetchOptions } = options;
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const stringifiedFetchOptions = JSON.stringify(fetchOptions);
    const stringifiedParams = JSON.stringify(params);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Construct URL with query parameters
    const constructUrl = (
        baseUrl: string,
        params?: Record<string, string | number | boolean>,
    ) => {
        if (!params) return baseUrl;

        const url = new URL(baseUrl, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });
        return url.toString();
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fullUrl = constructUrl(url, params);
                const response = await fetch(fullUrl, fetchOptions);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = (await response.json()) as T;
                setData(json);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout with debounce
        timeoutRef.current = setTimeout(() => {
            fetchData();
        }, debounce);

        // Cleanup function to clear timeout
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [url, enabled, stringifiedFetchOptions, stringifiedParams, debounce]);

    return { data, error, isLoading };
}

export default useFetch;
