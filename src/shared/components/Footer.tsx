import {
    CalendarDateRangeIcon,
    ChartBarIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 flex flex-row w-full bg-white shadow-md z-50 h-fit justify-evenly">
            <a href="/" aria-label="Home page">
                <HomeIcon className="text-black size-16 p-2"></HomeIcon>
            </a>
            <a href="/history" aria-label="Statistics">
                <ChartBarIcon className="text-black size-16 p-2"></ChartBarIcon>
            </a>
            <a href="/workout" aria-label="Log workout">
                <PlusIcon className="text-gray-600 size-16 p-2"></PlusIcon>
            </a>
            <a href="/calendar" aria-label="Workout calendar">
                <CalendarDateRangeIcon className="text-black size-16 p-2"></CalendarDateRangeIcon>
            </a>
            <a href="/search" aria-label="Explore page">
                <MagnifyingGlassIcon className="text-black size-16 p-2"></MagnifyingGlassIcon>
            </a>
        </footer>
    )
}
