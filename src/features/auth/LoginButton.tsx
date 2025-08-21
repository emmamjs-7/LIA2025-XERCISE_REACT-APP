import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../shared/utils/AuthConfig'
import RoundedButton from '../../shared/components/RoundedButton'

export default function LoginButton() {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Login redirect failed:', e)
            }
        })
    }

    return (
        <RoundedButton
            label="Sign in with X-account"
            size="large"
            onClick={handleLogin}
        />
    )
}
