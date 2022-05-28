import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface TokenState {
    id: number
    value: string
    guess?: string
    answer?: string
}

export interface State {
    paragraph: string
    tokenMap: Record<string, TokenState>
    setParagraph: (paragraph: string) => void
    setTokenGuess: (value: string, guess: string) => void
}

export const useStore = create(
    immer<State>((set) => ({
        paragraph: '',
        tokenMap: {},
        setParagraph: (paragraph: string) => {
            const tokens = paragraph.split(/([ .,?:;!'])/)
            const tokenMap: Record<string, TokenState> = {}
            tokens.forEach((value, id) => (tokenMap[id] = { id, value }))
            set({ paragraph, tokenMap })
        },
        setTokenGuess: (id: string, guess: string) =>
            set((s) => {
                const tokenMap = s.tokenMap
                tokenMap[id].guess = guess
                return { tokenMap }
            }),
    }))
)
