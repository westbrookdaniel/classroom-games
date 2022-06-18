import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createTokensFromParagraph } from '../utils/createTokensFromParagraph'

export interface TokenState {
    id: number
    value: string
    isCorrect: boolean
    hasSelected: boolean
    type: 'text' | 'punct' | 'none'
    guess: string[]
    answer?: string
    punct?: {
        value: string
        answer: string
    }
}

export interface State {
    maxHealth: number
    health: number
    paragraph: string
    tokenMap: Record<number, TokenState>
    setIncorrectSelect: (id: number) => void
    setParagraph: (paragraph: string) => void
    setTokenGuess: (id: number, guess: string) => void
    restart: () => void
}

export const useStore = create(
    immer<State>((set) => ({
        maxHealth: 5,
        health: 5,
        paragraph: '',
        tokenMap: {},
        setIncorrectSelect: (id: number) =>
            set((state) => {
                if (state.health > 0) state.health -= 1
                state.tokenMap[id].hasSelected = true
                return state
            }),
        setParagraph: (paragraph: string) => {
            const tokenMap = createTokensFromParagraph(paragraph)
            set({ tokenMap, paragraph })
        },
        setTokenGuess: (id: number, guess: string) => {
            set((state) => {
                const token = state.tokenMap[id]
                token.guess.push(guess)
                token.isCorrect = guess === token.answer
                if (!token.isCorrect && state.health > 0) state.health -= 1
                return state
            })
        },
        restart: () => {
            set((state) => {
                const tokenMap = createTokensFromParagraph(state.paragraph)
                return { tokenMap, health: state.maxHealth }
            })
        },
    }))
)
