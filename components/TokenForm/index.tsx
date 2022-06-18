import { TokenState } from '../../store'
import { PunctForm } from './PunctForm'
import { TextForm } from './TextForm'

export interface FormProps {
    onCancel: () => void
    onClose: () => void
    token: TokenState
    initialRef: React.RefObject<HTMLInputElement>
}

export function TokenForm({ token, ...props }: FormProps) {
    switch (token.type) {
        case 'text':
            return <TextForm token={token} {...props} />
        case 'punct':
            return <PunctForm token={token} {...props} />
        default:
            throw new Error(
                `Form for token of type "${token.type}" could not be found`
            )
    }
}
