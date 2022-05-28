import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface TokenState {
    id: number
    value: string
    guess: string[]
    answer?: string
    isCorrect: boolean
}

export interface State {
    health: number
    paragraph: string
    tokenMap: Record<number, TokenState>
    subtractHealth: () => void
    setParagraph: (paragraph: string, answerMap: Record<number, string>) => void
    setTokenGuess: (id: number, guess: string) => void
}

export const useStore = create(
    immer<State>((set, get) => ({
        health: 5,
        paragraph: '',
        tokenMap: {},
        subtractHealth: () =>
            set((state) => {
                if (state.health > 0) state.health -= 1
                return state
            }),
        setParagraph: (
            paragraph: string,
            answerMap: Record<number, string>
        ) => {
            const tokens = paragraph.split(/([ .,?:;!'])/)
            const tokenMap: Record<string, TokenState> = {}
            tokens.forEach((value, id) => {
                tokenMap[id] = {
                    id,
                    value,
                    answer: answerMap[id],
                    guess: [],
                    isCorrect: false,
                }
            })
            set({ paragraph, tokenMap })
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
