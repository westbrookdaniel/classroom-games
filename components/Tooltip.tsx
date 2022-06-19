import * as React from 'react'
import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react'

export type { TooltipProps }

export function Tooltip({ isDisabled, ...props }: TooltipProps) {
    return (
        <ChakraTooltip
            closeOnClick={false}
            minH="1.8em"
            placement="top"
            px={3}
            py={1}
            fontSize="3xl"
            {...props}
        />
    )
}
