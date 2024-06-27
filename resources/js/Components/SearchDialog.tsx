import React, { ChangeEvent, useEffect, useState } from 'react'
import TextInput from './TextInput'

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
    const [results, setResults] = useState([])
    useEffect(() => {
        if (debouncedValue) {
            console.log('Search: ', debouncedValue)
            // Perform any actions you need here, like API calls
        }
    }, [debouncedValue])

    return (
        <>
            <div className={className} onClick={() => onClose()}></div>
            <div className="absolute left-1/2 top-32 z-30 flex w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-4 shadow-xl">
                <TextInput
                    autoFocus
                    className="w-full border-none font-mono shadow-none outline-none ring-0 focus:ring-0"
                    placeholder="Type some keywords..."
                    value={searchValue}
                    onChange={handleChange}
                />
                <div className="flex">
                    {searchValue}
                    {/* <div className="w-full text-center">
                        The search yields no result.
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default SearchDialog
