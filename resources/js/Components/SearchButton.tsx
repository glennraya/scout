const SearchButton = ({
    className = '',
    onOpen
}: {
    className: string
    onOpen: () => void
}) => {
    return (
        <div className={className}>
            <button
                type="button"
                className="dark:highlight-white/5 z-30 hidden h-12 w-72 items-center space-x-3 rounded-lg bg-white px-4 text-left text-slate-400 shadow-sm ring-1 ring-slate-900/10 transition duration-300 ease-in-out hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:flex dark:bg-black dark:text-slate-300 dark:shadow-[0px_0px_25px_5px_rgba(0,125,255,0.8)] dark:ring-0 dark:hover:bg-gray-900 dark:hover:shadow-blue-800"
                onClick={onOpen}
            >
                <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                >
                    <path d="m19 19-3.5-3.5"></path>
                    <circle cx="11" cy="11" r="6"></circle>
                </svg>
                <span className="flex-auto">Search movies...</span>
                <kbd className="font-sans font-semibold dark:text-slate-500">
                    <abbr
                        title="Command"
                        className="text-slate-300 no-underline dark:text-slate-500"
                    >
                        ⌘
                    </abbr>{' '}
                    K
                </kbd>
            </button>
        </div>
    )
}

export default SearchButton
