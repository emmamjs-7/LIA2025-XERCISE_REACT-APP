import { useState, useEffect } from 'react'
import {
    Battery50Icon,
    ClockIcon,
    CubeTransparentIcon,
} from '@heroicons/react/24/outline'

import XMarkButton from '../../shared/components/XMarkButton'
import { useDeleteWorkout } from '../workouts/useDeleteWorkout'
import { WorkoutData } from '../../shared/types/TypeWorkout'

type Background = 'bg-green bg-topogrey' | 'bg-white bg-topolight'

export enum CardSize {
    Small,
    Large,
}

type DetailCardProps = {
    size: CardSize
    background: Background
    workouts: WorkoutData[]
}

export default function WorkoutDetailCard({
    size,
    background,
    workouts,
}: DetailCardProps) {
    const [workout, setWorkout] = useState<WorkoutData[]>([])
    const { deleteWorkout } = useDeleteWorkout()
    const handleDelete = async (id: number) => {
        await deleteWorkout(id)
        setWorkout((prev) => prev.filter((w) => w.id !== id))
    }

    useEffect(() => {
        setWorkout(workouts)
    }, [workouts])

    const cardStyles = {
        [CardSize.Small]: {
            cardHeight: 'h-24',
            borderRadius: 'rounded-xl',
            boldText: 'font-bold',
        },
        [CardSize.Large]: {
            cardHeight: 'h-32',
            borderRadius: 'rounded-2xl',
            boldText: '',
        },
    }

    const { cardHeight, borderRadius, boldText } = cardStyles[size]
    console.log('Incoming workouts:', workouts)
    return (
        <div className="flex flex-col ml-[2.5rem] mr-[2.5rem] overflow-auto">
            {workout.map((workoutItem) => (
                <div key={workoutItem.id} className="mb-2">
                    <div
                        className={`${background} ${cardHeight} ${borderRadius} text-black px-4 py-1`}
                    >
                        {size === CardSize.Large && (
                            <div className="font-bold text-xl pt-1 flex justify-between">
                                {workoutItem.title}
                                <XMarkButton
                                    onClick={() => handleDelete(workoutItem.id)}
                                />
                            </div>
                        )}

                        <div
                            className={`flex justify-between my-1 ${boldText}`}
                        >
                            <span>{workoutItem.activity}</span>
                            {size === CardSize.Small && (
                                <span>
                                    {new Date(
                                        workoutItem.date
                                    ).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                    })}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between text-sm p-3 px-1">
                            <span className="flex gap-1">
                                <ClockIcon className="w-5 h-5" />
                                {workoutItem.duration} min
                            </span>
                            <span className="flex gap-1">
                                <CubeTransparentIcon className="w-5 h-5" />
                                {workoutItem.category}
                            </span>
                            <span className="flex gap-1">
                                <Battery50Icon className="w-5 h-5" />
                                {workoutItem.intensity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
