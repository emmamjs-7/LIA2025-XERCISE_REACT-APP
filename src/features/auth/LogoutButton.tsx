import { useMsal } from '@azure/msal-react'
import RoundedButton from '../../shared/components/RoundedButton'

export default function LogoutButton() {
    const { instance } = useMsal()

    const handleLogout = async () => {
        await instance.logoutRedirect()
    }

    return <RoundedButton label="Logout" size="small" onClick={handleLogout} />
}
