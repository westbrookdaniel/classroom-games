import * as React from 'react'
import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    UseDisclosureProps,
} from '@chakra-ui/react'

type ChildrenFn = (
    disclosure: ReturnType<typeof useDisclosure>
) => React.ReactNode

interface Props extends UseDisclosureProps {
    children?: ChildrenFn | React.ReactNode
    body?: ChildrenFn | React.ReactNode
    header?: ChildrenFn | React.ReactNode
    footer?: ChildrenFn | React.ReactNode
    openWhen?: boolean
}

function render(
    children: ChildrenFn | React.ReactNode,
    disclosure: ReturnType<typeof useDisclosure>
) {
    return typeof children === 'function' ? children(disclosure) : children
}

export function Modal({
    header,
    body,
    footer,
    children,
    openWhen,
    ...disclosureProps
}: Props) {
    const disclosure = useDisclosure(disclosureProps)
    const { isOpen, onOpen, onClose } = disclosure

    React.useEffect(() => {
        if (openWhen) onOpen()
    }, [onOpen, openWhen])

    return (
        <>
            {typeof children === 'function' ? children(disclosure) : children}
            <ChakraModal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {header ? (
                        <ModalHeader>{render(header, disclosure)}</ModalHeader>
                    ) : null}
                    <ModalCloseButton />
                    {body ? (
                        <ModalBody>{render(body, disclosure)}</ModalBody>
                    ) : null}
                    {footer ? (
                        <ModalFooter>{render(footer, disclosure)}</ModalFooter>
                    ) : null}
                </ModalContent>
            </ChakraModal>
        </>
    )
}
