import {
    useDisclosure,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    useBreakpointValue,
    Box,
    PopoverTrigger,
} from '@chakra-ui/react'
import * as React from 'react'
import { TokenState } from '../store'
import { Modal } from './Modal'
import { TokenForm } from './TokenForm'

type TriggerType = React.ComponentType<{ children: React.ReactNode }>

interface PopoverProps {
    children: (
        disclosure: ReturnType<typeof useDisclosure> & {
            Trigger: TriggerType
        }
    ) => React.ReactNode
    token: TokenState
}

export function TokenFormOverlay({ children, token }: PopoverProps) {
    const disclosure = useDisclosure()
    const { onClose, isOpen } = disclosure
    const initialRef = React.useRef<HTMLInputElement | null>(null)
    const isMobile = useBreakpointValue({ base: true, sm: false })

    if (isMobile) {
        const Trigger: TriggerType = ({ children }) => <>{children}</>
        return (
            <>
                {children({ ...disclosure, Trigger })}
                <Modal
                    body={
                        <Box py={4}>
                            <TokenForm
                                initialRef={initialRef}
                                onCancel={onClose}
                                token={token}
                                onClose={onClose}
                            />
                        </Box>
                    }
                    {...disclosure}
                />
            </>
        )
    }

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
            isLazy={true}
            initialFocusRef={initialRef}
        >
            {children({ ...disclosure, Trigger: PopoverTrigger })}
            <PopoverContent boxShadow="xl" zIndex={999} p={5} w="xs">
                <PopoverArrow />
                <PopoverCloseButton />
                <TokenForm
                    initialRef={initialRef}
                    onCancel={onClose}
                    token={token}
                    onClose={onClose}
                />
            </PopoverContent>
        </Popover>
    )
}
