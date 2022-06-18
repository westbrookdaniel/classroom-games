import { TokenState } from '../../store'
import { TextForm } from './Text'

export interface FormProps {
    onCancel: () => void
    onClose: () => void
    token: TokenState
    initialRef: React.RefObject<HTMLInputElement>
}

export function TokenForm({ token, ...props }: FormProps) {
    switch (token.type) {
        case 'text':
        case 'punct':
            return <TextForm token={token} {...props} />
        default:
            throw new Error(
                `Form for token of type "${token.type}" could not be found`
            )
    }
}
