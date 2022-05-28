import { ParagraphGameLink } from '@prisma/client'
import useSWRImmutable from 'swr/immutable'
import { CreateLinkProps } from '../models/paragraphGameLink'

const basePath = '/api/paragraph/link'

export const useLinkByCode = (code: string) =>
    useSWRImmutable<ParagraphGameLink>(`${basePath}/${code}`)

export const createLink = async (props: CreateLinkProps) => {
    await fetch(`${basePath}/create`, {
        method: 'POST',
        body: JSON.stringify(props),
    })
}
