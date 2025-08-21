import { PencilIcon } from '@heroicons/react/24/solid'

type TextInputProps = {
    label: string
    name: string
    value: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
    label,
    name,
    value,
    placeholder,
    onChange,
}: TextInputProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="font-large text-white">
                {label}
            </label>

            <div className="relative">
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    required
                    minLength={2}
                    maxLength={50}
                    onChange={onChange}
                    className=" p-2 border rounded-2xl w-full placeholder-black"
                    placeholder={placeholder}
                />
                <PencilIcon
                    className="absolute right-3 top-1/2 transform 
                    -translate-y-1/2 w-6 h-6 pointer-events-none"
                />
            </div>
        </div>
    )
}
