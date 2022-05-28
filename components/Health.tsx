import { HStack } from '@chakra-ui/react'
import * as React from 'react'
import { useStore } from '../store'

export default function Health() {
    const health = useStore((s) => s.health)

    return (
        <HStack>
            {health === 0 ? <p>{"You're out of lives!"}</p> : null}
            {health > 0
                ? new Array(health)
                      .fill(null)
                      .map((_, i) => <p key={i}>{'<3'}</p>)
                : null}
        </HStack>
    )
}
