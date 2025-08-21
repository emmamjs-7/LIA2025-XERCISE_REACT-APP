import { ChevronDownIcon } from '@heroicons/react/24/solid'

type Options = {
    key: string
    value: number
}
type SelectBoxProps = {
    label: string
    name: string
    value: number
    options: Options[]
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectBoxComponent({
    label,
    name,
    value,
    options,
    placeholder,
    onChange,
}: SelectBoxProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="font-large text-white">
                {label}
            </label>
            <div className="relative flex-1 ">
                <select
                    className="appearance-none p-2 border rounded-2xl w-full"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                >
                    <option value="" hidden>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    className="w-7 h-7 absolute right-3 top-1/2 transform 
                    -translate-y-1/2 pointer-events-none"
                />
            </div>
        </div>
    )
}
