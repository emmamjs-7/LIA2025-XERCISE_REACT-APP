import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }
    return (
        <button
            onClick={handleClick}
            aria-label="Go back"
            className="rounded hover:bg-gray-100 mt-4"
        >
            <ArrowLeftCircleIcon className="size-10" />
        </button>
    )
}
