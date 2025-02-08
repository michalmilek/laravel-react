import { Datum, Link } from '@/types/features/feature';

export interface DatumWithCommentsCount extends Datum {
    comments_count: number;
    downvotes_count: number;
}

export interface FeaturesPaginated {
    current_page: number;
    data: DatumWithCommentsCount[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}
