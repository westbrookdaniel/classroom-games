import { HStack, Icon } from '@chakra-ui/react'
import * as React from 'react'
import { useStore } from '../store'
import { HeartIcon } from '@heroicons/react/solid'

export default function Health() {
    const health = useStore((s) => s.health)

    return (
        <HStack>
            {health === 0 ? <p>{"You're out of lives!"}</p> : null}
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
    )
}
