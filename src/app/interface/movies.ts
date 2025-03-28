export interface Movies {
    id: number;
    adult: boolean | null;
}

export interface Moviesapi {
    results: Movies[];
    page: number;
    total_pages: number;
    total_results: number;
} 
