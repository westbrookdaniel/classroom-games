import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface TokenState {
    id: number
    value: string
    guess?: string
    answer?: string
}

export interface State {
    health: number
    paragraph: string
    tokenMap: Record<string, TokenState>
    subtractHealth: () => void
    setParagraph: (paragraph: string) => void
    setTokenGuess: (id: number, guess: string) => void
}

export const useStore = create(
    immer<State>((set) => ({
        health: 3,
        paragraph: '',
        tokenMap: {},
        subtractHealth: () =>
            set((state) => {
                state.health -= 1
                return state
            }),
        setParagraph: (paragraph: string) => {
            const tokens = paragraph.split(/([ .,?:;!'])/)
            const tokenMap: Record<string, TokenState> = {}
            tokens.forEach((value, id) => (tokenMap[id] = { id, value }))
            set({ paragraph, tokenMap })
        },
        setTokenGuess: (id: number, guess: string) =>
            set((state) => {
                state.tokenMap
                state.tokenMap[id].guess = guess
                return state
            }),
    }))
)
