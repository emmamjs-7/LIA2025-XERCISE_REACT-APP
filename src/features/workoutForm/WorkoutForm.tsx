import { useLocation } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { useWorkoutForm } from './useWorkoutForm'
import { useCategories } from './useCategories'
import { useIntensities } from './useIntensities'
import TextInput from './FormInputs/TextInput'
import SelectBoxComponent from './FormInputs/SelectBox'
import RadioButtonComponent from './FormInputs/RadioButtons'
import DatePickerInput from './FormInputs/DateTimePicker'
import RoundedButton from '../../shared/components/RoundedButton'
import { GenerateDurationOption } from '../../shared/utils/duration-utils'

export default function WorkoutForm() {
    const { accounts } = useMsal()
    const location = useLocation()
    const prefillDate = location.state?.date
        ? new Date(location.state.date)
        : null
    const userObjectId = accounts[0]?.idTokenClaims?.oid

    const { formData, setField, submit, error } = useWorkoutForm(
        prefillDate,
        userObjectId
    )

    const { categories, categoryLoading, categoryError } = useCategories()
    const { intensities, intensityLoading, intensityError } = useIntensities()

    if (categoryLoading) return <div>Loading categories...</div>
    if (intensityLoading) return <div>Loading intensities...</div>

    if (categoryError) return <div>Failed to load categories...</div>
    if (intensityError) return <div>Failed to load intensities...</div>

    const maxNumber = 1000
    const minNumber = 5
    const stepSize = 5

    const durationOptions = GenerateDurationOption(
        minNumber,
        maxNumber,
        stepSize
    )

    return (
        <>
            <form
                className="flex flex-col gap-4 w-full max-w-md mx-auto px-5 text-black text-left"
                onSubmit={(e) => {
                    e.preventDefault()
                    submit()
                }}
            >
                <TextInput
                    label="Title"
                    name="title"
                    value={formData.title}
                    placeholder="Add Title"
                    onChange={(e) => setField('title', e.target.value)}
                />
                <SelectBoxComponent
                    label="Category"
                    name="categoryId"
                    value={formData.categoryId}
                    options={categories}
                    placeholder="Edit Category"
                    onChange={(e) =>
                        setField('categoryId', Number(e.target.value))
                    }
                />
                <TextInput
                    label="Activity"
                    name="activity"
                    value={formData.activity}
                    placeholder="Add Activity"
                    onChange={(e) => setField('activity', e.target.value)}
                />

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <SelectBoxComponent
                            label="Duration"
                            name="duration"
                            value={formData.duration}
                            options={durationOptions}
                            placeholder="Amount"
                            onChange={(e) =>
                                setField('duration', Number(e.target.value))
                            }
                        />
                    </div>
                    <div className="w-1/2">
                        <DatePickerInput
                            label="Date"
                            name="date"
                            value={formData.date}
                            onChange={(name, date) =>
                                setField(name as keyof typeof formData, date)
                            }
                        />
                    </div>
                </div>
                <RadioButtonComponent
                    label="Intensity"
                    name="intensityId"
                    value={formData.intensityId}
                    options={intensities}
                    onChange={(e) =>
                        setField('intensityId', Number(e.target.value))
                    }
                />
                <div className="flex justify-center mt-4">
                    <RoundedButton
                        label="Save Log"
                        size="medium"
                        type="submit"
                    />
                </div>
                {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
        </>
    )
}
