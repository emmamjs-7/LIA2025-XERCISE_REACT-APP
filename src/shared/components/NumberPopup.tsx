import { useState } from 'react'
import RoundedButton from './RoundedButton'

interface NumberPopupProps {
    onSave: (value: number) => void
    onCancel: () => void
    title?: string
}

export default function NumberPopup({
    onSave,
    onCancel,
    title = 'New Step Goal:',
}: NumberPopupProps) {
    const [inputValue, setInputValue] = useState('')
    const [popupError, setPopupError] = useState('')

    const handleSaveClick = () => {
        const number = Number(inputValue)
        if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
            setPopupError('Please enter a whole number that is greater than 0.')
            return
        }
        onSave(number)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-green bg-topogrey rounded-2xl p-6 shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        setPopupError('')
                    }}
                    className="w-full p-2 text-black border rounded mb-2"
                    placeholder="Enter value"
                    min="1"
                    step="1"
                />
                {popupError && (
                    <p className="text-red-600 text-sm mb-2">{popupError}</p>
                )}
                <div className="flex justify-end gap-4 mt-4">
                    <RoundedButton
                        label="Cancel"
                        size="small"
                        onClick={onCancel}
                        bgcolor="bg-grey"
                    />
                    <RoundedButton
                        label="Save"
                        size="small"
                        onClick={handleSaveClick}
                        bgcolor={'bg-darkgreen'}
                    />
                </div>
            </div>
        </div>
    )
}
