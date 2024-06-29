import { ChangeEvent, useEffect, useState } from 'react'
import { MovieCast, SearchResult } from '@/types/SearchResult'
import { format } from 'date-fns'
import TextInput from './TextInput'
import axios from 'axios'
import DOMPurify from 'dompurify'

interface SearchDialogProps {
    className: string
    onClose: () => void
}

const SearchDialog = ({ className = '', onClose }: SearchDialogProps) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const delay = 500
    const [debouncedValue, setDebouncedValue] = useState<string>(searchValue)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue)
        }, delay)

        return () => {
            clearTimeout(handler)
            setDebouncedValue('')
        }
    }, [searchValue, delay])

    // Search results
    const [results, setResults] = useState<SearchResult | null>(null)
    useEffect(() => {
        if (debouncedValue) {
            axios
                .post('/search', {
                    keyword: searchValue
                })
                .then(res => {
                    console.log(res.data)
                    setResults(res.data.result)
                })
        }

        if (searchValue === '') {
            setResults(null)
        }
    }, [debouncedValue])

    // Show the casts of the selected movie.
    const [cast, setCast] = useState<MovieCast[] | null>(null)
    const showCasts = (movieCast: MovieCast[]) => {
        setCast(movieCast)
    }

    // Paginations
    const paginate = (url: string) => {
        axios
            .post(url, {
                keyword: searchValue
            })
            .then(res => {
                console.log('Next Page: ', res.data)
                setResults(res.data.result)
            })
    }

    return (
        <>
            <div className={className} onClick={() => onClose()}></div>
            <div className="absolute left-1/2 top-1/2 z-30 flex w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
                {/* Search input */}
                <div className="flex items-center rounded-lg border-2 border-black/10 bg-gray-200 px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    <TextInput
                        autoFocus
                        className="w-full rounded-none border-none font-mono shadow-none outline-none ring-0 focus:ring-0"
                        placeholder="Type some keywords to search."
                        value={searchValue}
                        onChange={handleChange}
                    />

                    <span
                        className="cursor-pointer rounded-md bg-white px-2 py-1 font-mono text-xs font-bold shadow-sm hover:bg-gray-300"
                        onClick={() => onClose()}
                    >
                        ESC
                    </span>
                </div>

                {/* Search results */}
                <div
                    className={`relative flex max-h-[640px] flex-col gap-4 overflow-y-scroll ${results && results?.data.hits.length > 0 ? 'mt-4' : null}`}
                >
                    {/* Casts list */}
                    {cast && cast.length > 0 && (
                        <div className="fixed left-0 top-0 flex h-full w-full bg-white/75 backdrop-blur-sm">
                            <div className="m-auto flex h-[90%] w-9/12 flex-col rounded-xl bg-gray-200 p-4">
                                <h3 className="mb-1 flex items-center justify-between text-xl font-bold">
                                    <span>Cast</span>
                                    <span
                                        className="cursor-pointer text-xs"
                                        onClick={() => setCast(null)}
                                    >
                                        Close
                                    </span>
                                </h3>
                                <div className="flex overflow-y-scroll">
                                    <ul className="flex flex-col">
                                        {cast?.map(actor => (
                                            <li className="">
                                                <span className="font-medium">
                                                    {actor.original_name}
                                                </span>{' '}
                                                as {actor.character}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {results?.data.hits.map(movie => (
                        <div
                            className="flex cursor-pointer gap-4 rounded-xl p-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm"
                            key={movie.id}
                        >
                            <img
                                src={movie.poster_path}
                                alt={movie.original_title}
                                className="h-36 w-28 rounded-lg object-cover"
                            />
                            <div className="flex flex-col gap-2">
                                <div
                                    className="title gap-2 text-lg font-bold"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            movie._formatted.original_title
                                        )
                                    }}
                                ></div>

                                <span className="text-sm font-bold">
                                    Overview
                                </span>

                                <div
                                    className="overview text-sm text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            movie._formatted.overview
                                        )
                                    }}
                                ></div>

                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Release date:{' '}
                                        {format(
                                            new Date(movie.release_date),
                                            'MMMM d, yyyy'
                                        )}
                                    </span>

                                    <button
                                        className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium shadow-sm hover:bg-gray-300"
                                        onClick={() =>
                                            showCasts(movie.movieCasts)
                                        }
                                    >
                                        View Cast
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {results && results.data.hits.length > 0 && (
                    <>
                        <div className="mt-4 flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-sm font-medium">
                                <span className="text-gray-400">
                                    Total Hits:
                                </span>{' '}
                                {results.data.totalHits} results
                            </span>

                            <span className="text-sm font-medium">
                                <span className="text-gray-400">
                                    Total Pages:
                                </span>{' '}
                                {results.data.page} of {results.data.totalPages}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-700"
                                    onClick={() =>
                                        paginate(results.prev_page_url)
                                    }
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-2 py-1 text-xs text-white hover:bg-gray-700"
                                    onClick={() =>
                                        paginate(results.next_page_url)
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SearchDialog
