import { useState, useMemo } from 'react'
import CurrentPage from '../shared/components/CurrentPage'
import NumberPopup from '../shared/components/NumberPopup'
import RoundedButton from '../shared/components/RoundedButton'
import { useMsal } from '@azure/msal-react'
import toast from 'react-hot-toast'
import { useStepTracker } from '../features/stepTracker/useStepTracker'

export function Settings() {
    const [showPopup, setShowPopup] = useState(false)
    const { accounts } = useMsal()
    const userObjectId = accounts[0]?.idTokenClaims?.oid
    const today = useMemo(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }, [])
    const { saveGoal } = useStepTracker(userObjectId, today)

    const handleSave = (newGoal: number) => {
        saveGoal(newGoal)
        setShowPopup(false)
    }

    const notImplementedError = () => {
        toast.error('This function is not yet implemented.', { duration: 1000 })
    }

    return (
        <>
            <CurrentPage title="Settings" />
            <div className="flex flex-col p-8 gap-4">
                <RoundedButton
                    label="Change Step Goal"
                    onClick={() => setShowPopup(true)}
                    size="large"
                />
                <RoundedButton
                    label="Change Theme"
                    onClick={() => notImplementedError()}
                    size="large"
                />
                <RoundedButton
                    label="Delete Account"
                    onClick={() => notImplementedError()}
                    size="large"
                />
                <RoundedButton
                    label="Privacy policy"
                    onClick={() => notImplementedError()}
                    size="large"
                />

                <RoundedButton
                    label="Help"
                    onClick={() => notImplementedError()}
                    size="large"
                />
            </div>

            {showPopup && (
                <NumberPopup
                    onSave={handleSave}
                    onCancel={() => setShowPopup(false)}
                    title="New Step Goal:"
                />
            )}
        </>
    )
}
