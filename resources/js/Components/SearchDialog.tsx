import { ChangeEvent, useEffect, useState } from 'react'
import { SearchResult } from '@/types/SearchResult'
import TextInput from './TextInput'
import axios from 'axios'
import DOMPurify from 'dompurify'

interface SearchDialogProps {
    className: string
    onClose: () => void
}

const SearchDialog = ({ className = '', onClose }: SearchDialogProps) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [debouncedValue, setDebouncedValue] = useState<string>(searchValue)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const delay = 500
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
    const [results, setResults] = useState<SearchResult>()
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
    }, [debouncedValue])

    return (
        <>
            <div className={className} onClick={() => onClose()}></div>
            <div className="absolute left-1/2 top-1/2 z-30 flex w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white p-4 shadow-xl">
                <TextInput
                    autoFocus
                    className="w-full border-none font-mono shadow-none outline-none ring-0 focus:ring-0"
                    placeholder="Type some keywords to search."
                    value={searchValue}
                    onChange={handleChange}
                />
                <div className="flex flex-col gap-2">
                    {results?.data.hits.map(movie => (
                        <div className="flex" key={movie.id}>
                            <div
                                className="title gap-2"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        movie._formatted.original_title
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchDialog
