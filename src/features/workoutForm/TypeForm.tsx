import { ReactNode } from 'react'

export interface FolderTabButtonProps {
    isActive: boolean
    onClick: () => void
    position: 'left' | 'right'
    children: ReactNode
}

export interface FolderProps {
    rightTitle: string
    leftTitle: string
    rightContent: ReactNode
    leftContent: ReactNode
}

export enum Tab {
    Left = 'left-tab',
    Right = 'right-tab',
}
