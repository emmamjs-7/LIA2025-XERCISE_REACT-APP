type ButtonProps = {
    label: string
    size: ButtonSize
    bgcolor?: string
    textcolor?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit' | 'reset'
}

export type ButtonSize = 'small' | 'medium' | 'large'

export const buttonSizeClasses: Record<ButtonSize, string> = {
    small: 'w-[100px]',
    medium: 'w-[150px]',
    large: 'w-[200px]',
}

export default function RoundedButton({
    label,
    size,
    bgcolor = 'bg-darkgreen',
    textcolor = 'text-white',
    onClick,
    type = 'button',
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-lg px-3 py-2 ${size} ${bgcolor} ${textcolor}`}
        >
            {label}
        </button>
    )
}
