import { useState } from 'react'
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import ProfileMenu from './ProfileMenu'
import { useIsAuthenticated } from '@azure/msal-react'

export default function Header() {
    const [showLogoutMenu, setShowLogoutMenu] = useState(false)
    const isAuthenticated = useIsAuthenticated()

    const toggleMenu = () => setShowLogoutMenu((prev) => !prev)
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-20 z-50">
                <div className="flex justify-between items-center h-full px-4 bg-green bg-topogrey">
                    <a href="/" aria-label="Home page">
                        <div className="font-medium text-[25px] text-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                            <span className="pl-1.5 text-yellow drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                                X
                            </span>
                            ERCISE
                        </div>
                    </a>
                    <div className="flex items-center gap-4 pr-2">
                        {isAuthenticated && (
                            <>
                                <button
                                    onClick={toggleMenu}
                                    aria-label="Profile menu"
                                >
                                    <UserIcon className="w-8 h-8 drop-shadow-md" />
                                </button>

                                <a href="/settings" aria-label="Settings">
                                    <Cog6ToothIcon className="w-8 h-8 drop-shadow-md" />
                                </a>
                            </>
                        )}
                    </div>
                </div>
                <ProfileMenu visible={showLogoutMenu} />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-white"></div>{' '}
                {/* White line under the header */}
            </header>
        </>
    )
}
