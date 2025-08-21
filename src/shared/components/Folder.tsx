import { useState } from 'react'
import FolderTabButton from './FolderTabButton'
import { FolderProps } from '../../features/workoutForm/TypeForm'
import { Tab } from '../../features/workoutForm/TypeForm'

export default function Folder({
    rightTitle,
    leftTitle,
    rightContent,
    leftContent,
}: FolderProps) {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Right)
    return (
        <>
            <div className="flex-col-1 m-5 text-black">
                <div className="z-0 flex flex-row relative -mb-10 h-[5rem] font-extrabold text-2xl ">
                    <FolderTabButton
                        onClick={() => setActiveTab(Tab.Left)}
                        isActive={activeTab === Tab.Left}
                        position="left"
                    >
                        {leftTitle}
                    </FolderTabButton>
                    <FolderTabButton
                        onClick={() => setActiveTab(Tab.Right)}
                        isActive={activeTab === Tab.Right}
                        position="right"
                    >
                        {rightTitle}
                    </FolderTabButton>
                </div>

                <div className="mt-3 z-[1] rounded-b-2xl">
                    <div
                        className={`flex-col-1 rounded-[2rem] bg-topogrey p-[0.8rem] pt-[1.2rem] ${
                            activeTab === Tab.Left ? 'bg-white' : 'bg-green'
                        }`}
                    >
                        {activeTab === Tab.Left ? leftContent : rightContent}
                    </div>
                </div>
            </div>
        </>
    )
}
