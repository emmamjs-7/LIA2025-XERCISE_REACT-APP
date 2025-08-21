import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useDailyWorkoutStats } from './useDailyWorkoutStats'

type Props = {
    objectId: string
    month: string
}

export default function WorkoutLineChart({ objectId, month }: Props) {
    const date = new Date(month)
    const monthName = new Intl.DateTimeFormat('en-GB', {
        month: 'long',
    }).format(date)

    const year = date.getFullYear()
    const monthNum = String(date.getMonth() + 1)
    const trimmedMonth = `${year}-${monthNum}`

    const { data, loading, error } = useDailyWorkoutStats(
        objectId,
        trimmedMonth
    )

    const transformedData = data.map((item, index) => ({
        ...item,
        dayNumber: index + 1,
    }))

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading chart</p>

    return (
        <>
            <h1 className="text-3xl font-bold">Workouts for {monthName}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={transformedData}
                    margin={{ top: 30, right: 30, left: -30, bottom: 40 }}
                >
                    <XAxis
                        dataKey="dayNumber"
                        label={{
                            value: 'Date',
                            position: 'insideBottom',
                            offset: -20,
                        }}
                    />
                    <YAxis allowDecimals={false} />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#ffb300"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
