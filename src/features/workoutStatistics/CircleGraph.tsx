import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useWorkoutCategoryStats } from './useWorkoutCategoryStats'
import { CATEGORY_COLORS } from './Colors'

type Props = {
    objectId: string
    month: string
}

export default function CircleGraph({ objectId, month }: Props) {
    const { data, loading, error } = useWorkoutCategoryStats(
        objectId,
        month,
        'count'
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    const pieData = data.map((stats) => ({
        name: stats.workoutCategory,
        value: stats.count ?? 0,
    }))

    return (
        <>
            <h1 className="text-3xl font-bold">Workouts per category</h1>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                    >
                        {pieData.map((stats, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={CATEGORY_COLORS[stats.name]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}
