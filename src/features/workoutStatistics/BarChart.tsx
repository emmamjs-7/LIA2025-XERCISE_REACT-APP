import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
} from 'recharts'
import { useWorkoutCategoryStats } from './useWorkoutCategoryStats'
import { CATEGORY_COLORS } from './Colors'

type Props = {
    objectId: string
    month: string
}
export default function WorkoutBarChart({ objectId, month }: Props) {
    const { data, loading, error } = useWorkoutCategoryStats(
        objectId,
        month,
        'duration'
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    const barData = data.map((stats) => ({
        category: stats.category,
        minutes: stats.duration ?? 0,
    }))

    return (
        <div className="w-full sm:w-[400px] h-[300px] mx-auto">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={barData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 15 }}
                >
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 11 }}
                        label={{
                            value: 'Minutes per category',
                            position: 'insideBottom',
                            offset: -10,
                        }}
                    />
                    <YAxis />
                    <Bar dataKey="minutes">
                        {barData.map((stats, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={CATEGORY_COLORS[stats.category]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
