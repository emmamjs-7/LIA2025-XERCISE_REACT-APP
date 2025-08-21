import Calendar from 'react-calendar'
import {
    ArrowRightCircleIcon,
    ArrowLeftCircleIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import './WorkoutCalendar.css'
import { useGetAllWorkouts } from './useWorkoutsForCalendar'

export default function WorkoutCalendar() {
    const { tileClassName } = useGetAllWorkouts()
    const navigate = useNavigate()

    const handleClickDay = (date: Date) => {
        const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
        const formattedDate = date.toLocaleDateString('sv-SE')
        navigate(`/Day/${weekday}/${formattedDate}`)
    }
    return (
        <>
            <Calendar
                showNavigation={true}
                nextLabel={
                    <span aria-label="Next month">
                        <ArrowRightCircleIcon className="size-8" />
                    </span>
                }
                prevLabel={
                    <span aria-label="Previous month">
                        <ArrowLeftCircleIcon className="size-8" />
                    </span>
                }
                onClickDay={handleClickDay}
                view={'month'}
                locale={'en-GB'}
                tileClassName={tileClassName}
                formatShortWeekday={(locale, date) =>
                    date
                        .toLocaleDateString(locale, { weekday: 'short' })
                        .slice(0, 2)
                }
            />
        </>
    )
}
