import {
    useDisclosure,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import * as React from 'react'
import { TokenState } from '../store'
import { TokenForm } from './TokenForm'

interface PopoverProps {
    children: (disclosure: ReturnType<typeof useDisclosure>) => React.ReactNode
    token: TokenState
}

export function TokenFormPopover({ children, token }: PopoverProps) {
    const disclosure = useDisclosure()
    const { onClose, isOpen } = disclosure
    const initialRef = React.useRef<HTMLInputElement | null>(null)

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
            isLazy={true}
            initialFocusRef={initialRef}
        >
            {children(disclosure)}
            <PopoverContent boxShadow="xl" zIndex={999} p={5}>
                <PopoverArrow />
                <PopoverCloseButton />
                <TokenForm
                    initialRef={initialRef}
                    onCancel={onClose}
                    token={token}
                    onSuccess={onClose}
                />
            </PopoverContent>
        </Popover>
    )
}
