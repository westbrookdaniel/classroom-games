import { HStack, Icon, Text } from '@chakra-ui/react'
import * as React from 'react'
import { useStore } from '../store'
import { HeartIcon } from '@heroicons/react/solid'
import { Tooltip } from './Tooltip'

export default function Health() {
    const [showTooltip, setShowTooltip] = React.useState(false)
    const [health, maxHealth] = useStore((s) => [s.health, s.maxHealth])

    const message =
        health === 0 ? "You're out of lives!" : `${health} lives remaining`

    React.useEffect(() => {
        if (health === maxHealth) return
        setShowTooltip(true)
        const timeout = setTimeout(() => setShowTooltip(false), 1500)
        return () => clearTimeout(timeout)
    }, [health, maxHealth])

    return (
        <Tooltip
            closeOnClick={false}
            background="red.500"
            isOpen={showTooltip ? true : undefined}
            label={message}
        >
            <HStack>
                {health === 0 ? <Text>{message}</Text> : null}
                {health > 0
                    ? new Array(health)
                          .fill(null)
                          .map((_, i) => (
                              <Icon
                                  key={i}
                                  fontSize="xl"
                                  color="red.500"
                                  as={HeartIcon}
                              />
                          ))
                    : null}
            </HStack>
        </Tooltip>
    )
}
