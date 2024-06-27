import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { useEffect, useState } from 'react'
import Navigation from '@/Components/Navigation'
import SearchDialog from '@/Components/SearchDialog'
import SearchButton from '@/Components/SearchButton'

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(open => !open)
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (
                (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
                e.key === 'Escape' ||
                e.key === '/'
            ) {
                e.preventDefault()
                setOpen(open => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <>
            <Head title="Welcome" />
            <Navigation />

            {open && (
                <SearchDialog
                    onClose={handleToggle}
                    className="fixed left-0 top-0 z-30 flex h-screen w-full bg-black/75 backdrop-blur-sm"
                />
            )}

            <div className="gradient flex h-screen flex-col items-center justify-center gap-4">
                <div className="absolute left-0 top-0 z-0 h-screen w-full bg-hero bg-cover bg-no-repeat opacity-15"></div>
                <header className="flex w-full flex-col gap-4 text-white">
                    <h1 className="z-10 flex flex-col text-center font-extrabold leading-[.7]">
                        <span className="text-2xl font-black uppercase">
                            The
                        </span>
                        <span className="font-honk text-[160px]">
                            Movie Universe
                        </span>
                    </h1>
                    <p className="text-center font-mono text-xl">
                        The biggest movie collection in the cosmos!
                    </p>
                </header>
                <SearchButton className="z-20" onOpen={handleToggle} />
            </div>
        </>
    )
}
