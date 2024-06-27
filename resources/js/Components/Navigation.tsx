import { Link } from '@inertiajs/react'

const Navigation = () => {
    return (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-32">
            <div className="container mx-auto flex flex-col justify-between font-mono text-white">
                <header className="font-honk p-4 text-6xl font-bold">MU</header>
                <nav className="flex flex-col">
                    <Link
                        href={`#`}
                        className="px-6 py-4 transition duration-200 ease-in-out hover:scale-110"
                    >
                        Home
                    </Link>
                    <Link
                        href={`#`}
                        className="px-6 py-4 transition duration-200 ease-in-out hover:scale-110"
                    >
                        Store
                    </Link>
                    <Link
                        href={`#`}
                        className="px-6 py-4 transition duration-200 ease-in-out hover:scale-110"
                    >
                        Movies
                    </Link>
                    <Link
                        href={`#`}
                        className="px-6 py-4 transition duration-200 ease-in-out hover:scale-110"
                    >
                        Integrations
                    </Link>
                    <Link
                        href={`#`}
                        className="px-6 py-4 transition duration-200 ease-in-out hover:scale-110"
                    >
                        API
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Navigation
