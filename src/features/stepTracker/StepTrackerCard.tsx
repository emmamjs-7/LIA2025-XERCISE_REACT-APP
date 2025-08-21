import { useMemo, useState } from 'react'
import StepProgressTracker from './StepProgressTracker'
import NumberPopup from '../../shared/components/NumberPopup'
import RoundedButton from '../../shared/components/RoundedButton'
import { useMsal } from '@azure/msal-react'
import { useStepTracker } from './useStepTracker'

export default function StepTrackerCard() {
    const [showPopup, setShowPopup] = useState(false)
    const [popupTitle, setPopupTitle] = useState('New Step Goal:')
    const [logType, setLogType] = useState<'goal' | 'steps'>('goal')

    const { accounts } = useMsal()
    const userObjectId = accounts[0]?.idTokenClaims?.oid

    const today = useMemo(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }, [])

    const { steps, goal, saveSteps, clearSteps, saveGoal } = useStepTracker(
        userObjectId,
        today
    )

    const handleSave = async (value: number) => {
        if (logType === 'goal') {
            await saveGoal(value)
        } else if (logType === 'steps') {
            await saveSteps(value)
        }
        setShowPopup(false)
    }

    return (
        <>
            <div className="w-screen">
                <h1 className="text-2xl font-bold pb-2">Step Tracker</h1>
                <div className="bg-white h-fit text-black p-3 rounded-xl mx-[2.5rem]">
                    <div className="flex justify-between font-bold border-b mb-3 border-black">
                        <h2 className="mb-1">Daily goal:</h2>
                        <h3>{goal} steps</h3>
                    </div>

                    <div className="flex flex-row justify-between">
                        <StepProgressTracker steps={steps} goal={goal} />
                        <div className="flex flex-col gap-2">
                            <RoundedButton
                                bgcolor="bg-grey"
                                label="Log Steps"
                                size="medium"
                                onClick={() => {
                                    setPopupTitle('Log Steps:')
                                    setLogType('steps')
                                    setShowPopup(true)
                                }}
                            />
                            <RoundedButton
                                bgcolor="bg-grey"
                                label="Clear Steps"
                                size="medium"
                                onClick={async () => {
                                    await clearSteps()
                                }}
                            />
                            <RoundedButton
                                bgcolor="bg-grey"
                                label="Set New Goal"
                                size="medium"
                                onClick={() => {
                                    setPopupTitle('New Step Goal:')
                                    setLogType('goal')
                                    setShowPopup(true)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <NumberPopup
                    onSave={handleSave}
                    onCancel={() => setShowPopup(false)}
                    title={popupTitle}
                />
            )}
        </>
    )
}
