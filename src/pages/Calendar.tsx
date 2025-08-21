//import components
import Folder from '../shared/components/Folder'
import CurrentPage from '../shared/components/CurrentPage'
import WeekView from '../features/calendar/WeekView'
import WorkoutCalendar from '../features/calendar/WorkoutCalendar'

export function CalendarPage() {
    return (
        <>
            <CurrentPage title="Calendar" />
            <Folder
                rightTitle="Month"
                leftTitle="Week"
                rightContent={<WorkoutCalendar />}
                leftContent={<WeekView />}
            />
        </>
    )
}
