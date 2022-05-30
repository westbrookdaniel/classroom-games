import { HStack, Icon, Text } from '@chakra-ui/react'
import * as React from 'react'
import { useStore } from '../store'
import { HeartIcon } from '@heroicons/react/solid'
import { Tooltip } from './Tooltip'
import { plural } from '../utils/plural'

export default function Health() {
    const [showTooltip, setShowTooltip] = React.useState(false)
    const [health, maxHealth] = useStore((s) => [s.health, s.maxHealth])

    const message = `${health} ${plural(health, 'life', 'lives')} remaining`

    React.useEffect(() => {
        if (health === maxHealth || health === 0) return
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 1500)
    }, [health, maxHealth])

    return (
        <Tooltip
            fontSize="2xl"
            background="red.500"
            isOpen={showTooltip ? true : undefined}
            label={message}
        >
            <HStack>
                {health === 0 ? (
                    <Text fontSize="2xl" color="red.500">
                        {"You're out of lives! Better luck next time"}
                    </Text>
                ) : null}
                {health > 0
                    ? new Array(health)
                          .fill(null)
                          .map((_, i) => (
                              <Icon
                                  key={i}
                                  fontSize="3xl"
                                  color="red.500"
                                  as={HeartIcon}
                              />
                          ))
                    : null}
            </HStack>
        </Tooltip>
    )
}
