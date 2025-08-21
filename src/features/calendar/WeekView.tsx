import WeekViewDay from './WeekViewDay'
import { GetCurrentWeek } from './GetCurrentWeek'
import { useNavigate } from 'react-router-dom'

const WeekView = () => {
    const week = GetCurrentWeek()

    const navigate = useNavigate()
    const handleClickDay = (day: string, date: Date) => {
        const formattedDate = date.toLocaleDateString('sv-SE')
        navigate(`/Day/${day}/${formattedDate}`)
    }

    return (
        <>
            {week.map(({ day, date, status }) => {
                const bgGradient =
                    status === 'today'
                        ? 'bg-gradientdarkgreen'
                        : status === 'past'
                        ? 'bg-gradientgrey'
                        : 'bg-gradientlightgreen'
                const textColor =
                    status === 'past' || status === 'today'
                        ? 'text-white'
                        : 'text-black'
                return (
                    <button
                        key={day}
                        className="m-[0.3rem]"
                        onClick={() => handleClickDay(day, date)}
                    >
                        <WeekViewDay
                            day={day}
                            date={date.toLocaleDateString('sv-SE', {
                                day: 'numeric',
                                month: 'numeric',
                            })}
                            textColor={textColor}
                            bgGradient={bgGradient}
                        />
                    </button>
                )
            })}
        </>
    )
}

export default WeekView
