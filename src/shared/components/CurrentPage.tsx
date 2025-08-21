import BackButton from './BackButton'

type CurrentPageProps = {
    title: string
}

export default function CurrentPage({ title }: CurrentPageProps) {
    return (
        <span className="pb-14">
            <div className="flex items-center justify-between pt-20 px-8 py-4 border-b border-gray-200 absolute top-0 left-0 w-full">
                <h1 className="text-3xl font-semibold pt-5">{title}</h1>
                <BackButton />
            </div>
        </span>
    )
}
