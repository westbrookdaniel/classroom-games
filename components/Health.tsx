import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { useStore } from '../store'
import { HeartIcon } from '@heroicons/react/solid'
import { Tooltip } from './Tooltip'
import { plural } from '../utils/plural'

export default function Health() {
    const [showTooltip, setShowTooltip] = React.useState(false)
    const [health, maxHealth, restart] = useStore((s) => [
        s.health,
        s.maxHealth,
        s.restart,
    ])

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
            // For some reason isDisabled isn't working
            label={health === 0 ? undefined : message}
        >
            <HStack>
                {health === 0 ? (
                    <VStack spacing={4}>
                        <Text fontSize="xl" color="gray.500">
                            {"You're out of lives! Better luck next time"}
                        </Text>
                        <Button colorScheme="green" onClick={restart}>
                            Try Again
                        </Button>
                    </VStack>
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
