import { FolderTabButtonProps } from '../../features/workoutForm/TypeForm'

export default function FolderTab({
    isActive,
    onClick,
    position,
    children,
}: FolderTabButtonProps) {
    const baseTailwind =
        'bg-topogrey w-[65%] rounded-t-[2rem] pb-5 uppercase tracking-wide'
    const activeZ = isActive ? 'z-20' : 'z-10'
    const offset = isActive ? (position === 'left' ? '-mr-6' : '-ml-6') : ''
    const background = position === 'left' ? 'bg-white' : 'bg-green'
    return (
        <button
            onClick={onClick}
            className={`${background} ${
                position === 'left' ? 'left-1' : 'right-1'
            } ${baseTailwind} ${activeZ} ${offset}`}
        >
            {children}
        </button>
    )
}
