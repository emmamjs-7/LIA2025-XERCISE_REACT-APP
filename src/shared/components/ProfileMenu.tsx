import LogoutButton from '../../features/auth/LogoutButton'
import { useMsal } from '@azure/msal-react'

type ProfileMenuProps = {
    visible?: boolean
}

export default function ProfileMenu({ visible = false }: ProfileMenuProps) {
    const { accounts } = useMsal()

    if (!visible) return null

    return (
        <>
            <div className="flex justify-between items-center bg-green rounded-b-sm p-4">
                <h1 className="text-xl text-white">
                    {accounts[0]?.name ?? 'User'}
                </h1>
                <LogoutButton />
            </div>
        </>
    )
}
