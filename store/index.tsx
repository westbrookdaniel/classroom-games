import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createTokensFromParagraph } from '../utils/createTokensFromParagraph'

export interface TokenState {
    id: number
    value: string
    guess: string[]
    answer?: string
    isCorrect: boolean
}

export interface State {
    maxHealth: number
    health: number
    tokenMap: Record<number, TokenState>
    subtractHealth: () => void
    setParagraph: (paragraph: string) => void
    setTokenGuess: (id: number, guess: string) => void
}

export const useStore = create(
    immer<State>((set) => ({
        maxHealth: 5,
        health: 5,
        paragraph: '',
        tokenMap: {},
        subtractHealth: () =>
            set((state) => {
                if (state.health > 0) state.health -= 1
                return state
            }),
        setParagraph: (paragraph: string) => {
            const tokenMap = createTokensFromParagraph(paragraph)
            set({ tokenMap })
        },
        setTokenGuess: (id: number, guess: string) =>
            set((state) => {
                const token = state.tokenMap[id]
                token.guess.push(guess)
                token.isCorrect = guess === token.answer
                if (!token.isCorrect && state.health > 0) state.health -= 1
                return state
            }),
    }))
)

// Setup the initial data
useStore
    .getState()
    .setParagraph(
        'This is a very nomal{normal} looking paragraph, or so I believe.'
    )
