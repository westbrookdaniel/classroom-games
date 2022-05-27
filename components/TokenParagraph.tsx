import { Text } from '@chakra-ui/react'
import Token from './Token'

const paragraph = 'This is a very nomal looking paragraph, or so I believe.'

export default function TokenParagraph() {
    const stringTokens = paragraph.split(/([ .,?:;!'])/)
    const tokens = stringTokens.map((t, i) => <Token key={i} text={t} />)
    return <Text fontSize="xl">{tokens}</Text>
}
