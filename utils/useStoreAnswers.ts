import { useStore } from '../store'

export default function useStoreAnswers() {
    const answers = useStore((s) =>
        Object.values(s.tokenMap).filter((s) => s.answer)
    )
    const isAllCorrect = answers.every((a) => a.isCorrect)
    return { answers, isAllCorrect }
}
