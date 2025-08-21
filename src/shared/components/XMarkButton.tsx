import { XMarkIcon } from '@heroicons/react/24/solid'
type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function XMarkButton({ onClick }: ButtonProps) {
    return (
        <button type="button" onClick={onClick}>
            <XMarkIcon className="text-black size-8"></XMarkIcon>
        </button>
    )
}
