
import DatePicker from 'react-datepicker';
import { ChevronDownIcon } from '@heroicons/react/24/solid';


type DatePickerProps = {
    label: string;
    name: string;
    value: Date | null;
    onChange: (name: string, date: Date | null) => void;


}

export default function DatePickerInput({
    label,
    name,
    value,
    onChange
}: DatePickerProps) {
    const handleDateChange = (date: Date | null) => {
        onChange(name, date)
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="font-large text-white">{label}</label>
            <div className="relative">
                <DatePicker
                    className="p-2 rounded-2xl w-full placeholder-black"
                    id={name}
                    selected={value}
                    onChange={handleDateChange}
                    dateFormat="P"
                    required
                    placeholderText="xx/xx/xxxx"

                />
                <ChevronDownIcon className="w-7 h-7 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
    )
}