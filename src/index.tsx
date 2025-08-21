import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '../src/shared/css/index.css'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './App'

//MSAL imports
import { msalConfig } from './shared/utils/AuthConfig'
import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult,
} from '@azure/msal-browser'
import { AuthProvider } from './features/auth/AuthProvider'
import { MsalProvider } from '@azure/msal-react'

const msalInstance = new PublicClientApplication(msalConfig)

async function main() {
    await msalInstance.initialize()

    const response = await msalInstance.handleRedirectPromise()

    if (response) {
        msalInstance.setActiveAccount(response.account)
    } else {
        const accounts = msalInstance.getAllAccounts()
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0])
        }
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult
            msalInstance.setActiveAccount(payload.account)
        }

        if (event.eventType === EventType.LOGIN_FAILURE && event.error) {
            import('react-hot-toast').then(({ toast }) => {
                toast.error('Login failed. Please try again.')
            })
        }

        if (
            event.eventType === EventType.ACQUIRE_TOKEN_FAILURE &&
            event.error
        ) {
            import('react-hot-toast').then(({ toast }) => {
                toast.error('Token request failed. Please reload the page.')
            })
        }
    })

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    )
    root.render(
        <React.StrictMode>
            <MsalProvider instance={msalInstance}>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </MsalProvider>
        </React.StrictMode>
    )
    serviceWorkerRegistration.register()
}
main()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
