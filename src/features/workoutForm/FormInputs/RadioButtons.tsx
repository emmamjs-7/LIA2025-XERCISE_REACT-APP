import React from 'react'

type Options = {
    key: string
    value: string | number
}

type RadioButtonProps = {
    label: string
    name: string
    value: string | number
    options: Options[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RadioButtonComponent({
    label,
    name,
    value,
    options,
    onChange,
}: RadioButtonProps) {
    return (
        <fieldset className="flex gap-2 space-y-2">
            <legend className="font-large text-white">{label}</legend>
            <div className="bg-white w-full p-2 rounded-xl">
                <div className="flex gap-4">
                    {options.map((option) => {
                        const isSelected = value === option.value

                        return (
                            <label
                                key={option.value}
                                className={`
                                    cursor-pointer px-2 py-5 rounded-xl w-1/3 text-center
                                    ${isSelected ? 'bg-[#A3B6B4] ' : 'bg-white'}
                                    transition-colors duration-200
                                `}
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={isSelected}
                                    onChange={onChange}
                                    required
                                    className="sr-only"
                                />
                                {option.key}
                            </label>
                        )
                    })}
                </div>
            </div>
        </fieldset>
    )
}
