interface DayCardProps {
    day?: string
    date?: string
    textColor?: string
    bgGradient?: string
}
const WeekViewDay = ({ day, date, textColor, bgGradient }: DayCardProps) => {
    return (
        <>
            <div className={`relative  mb-[0.2rem] ${textColor}`}>
                <div
                    className={`absolute rounded-lg ${bgGradient} opacity-90 inset-0`}
                ></div>
                <div className="relative p-[0.3rem] ml-[1rem] font-bold">
                    <div className="text-left text-2xl">{day}</div>
                    <div className="text-left text-sm">{date}</div>
                </div>
            </div>
        </>
    )
}
export default WeekViewDay
