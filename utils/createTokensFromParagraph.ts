import { TokenState } from '../store'

const defaultState: Omit<TokenState, 'value' | 'id' | 'type'> = {
    guess: [],
    isCorrect: false,
    hasSelected: false,
}

export function createTokensFromParagraph(paragraph: string) {
    if (paragraph === '') return []

    const tokens = paragraph.split(/( )/)
    const tokenMap: Record<string, TokenState> = {}

    tokens.forEach((value, id) => {
        if (value.includes('[')) {
            const wrongValue = value.slice(0, value.indexOf('['))
            const answer =
                wrongValue.slice(0, -1) +
                value.slice(value.indexOf('[') + 1, value.indexOf(']'))
            const punct = {
                value: wrongValue.charAt(wrongValue.length - 1),
                answer: answer.charAt(answer.length - 1),
            }
            tokenMap[id] = {
                ...defaultState,
                id,
                type: 'punct',
                value: wrongValue,
                answer,
                punct,
            }
        } else if (value.includes('{')) {
            const wrongValue = value.slice(0, value.indexOf('{'))
            const answer = value.slice(
                value.indexOf('{') + 1,
                value.indexOf('}')
            )
            tokenMap[id] = {
                ...defaultState,
                id,
                type: 'text',
                value: wrongValue,
                answer,
            }
        } else if (value === ' ') {
            tokenMap[id] = {
                ...defaultState,
                id,
                type: 'none',
                value,
            }
        } else {
            tokenMap[id] = {
                ...defaultState,
                id,
                type: 'text',
                value,
            }
        }
    })

    return tokenMap
}
