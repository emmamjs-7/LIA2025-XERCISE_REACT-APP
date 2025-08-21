import { Pie, Cell, PieChart, ResponsiveContainer } from 'recharts'

type StepProgressTrackerProps = {
    steps: number
    goal: number
}

export default function StepProgressTracker({
    steps,
    goal,
}: StepProgressTrackerProps) {
    const maxPercent = 100
    const percentMultiplier = 100
    const percent = Math.min((steps / goal) * percentMultiplier, maxPercent)
    const chartData = [
        { name: 'Progress', value: percent },
        { name: 'Remaining', value: 100 - percent || 0.0001 },
    ]

    return (
        <div className="flex flex-col mb-2 ml-2">
            <h2 className="text-lg font-bold text-left mb-1">Progress</h2>
            <div className="relative w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            innerRadius="70%"
                            outerRadius="100%"
                            stroke="none"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={['#ffb300', '#64666A'][index % 2]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-yellow font-semibold text-sm">
                        {steps}
                    </span>
                </div>
            </div>
        </div>
    )
}
