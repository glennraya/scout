import { ReactNode } from "react";

export interface SearchResult {
    current_page: number;
    data: Record
    first_page_url: string;
    from: number;
    last_page: number;
    last_pagePurl: string;
    links: Link[]
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Link {
    active: boolean;
    label: string;
    url: string;
}

export interface Record {
    hits: Movie[]
    hitsPerPage: number;
    page: number;
    processingTimeMs: number;
    query: string;
    totalHits: number;
    totalPages: number;
}

export interface Movie {
    id: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    movieCasts: MovieCast[]
    _formatted: FormattedMovie
}

export interface FormattedMovie {
    id: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    movieCasts: MovieCast[]
}

export interface MovieCast {
    character: string;
    original_name: string;
}
