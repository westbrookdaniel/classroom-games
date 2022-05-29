import { TokenState } from '../store'

export function createTokensFromParagraph(paragraph: string) {
    const tokens = paragraph.split(/([ .,?:;!'])/)
    const tokenMap: Record<string, TokenState> = {}
    tokens.forEach((value, id) => {
        if (value.includes('{')) {
            const wrongValue = value.slice(0, value.indexOf('{'))
            const answer = value.slice(
                value.indexOf('{') + 1,
                value.indexOf('}')
            )
            tokenMap[id] = {
                id,
                value: wrongValue,
                answer,
                guess: [],
                isCorrect: false,
                hasSelected: false,
            }
        } else {
            tokenMap[id] = {
                id,
                value,
                guess: [],
                isCorrect: false,
                hasSelected: false,
            }
        }
    })
    return tokenMap
}
