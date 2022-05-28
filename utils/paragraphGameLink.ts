import { ParagraphGameLink } from '@prisma/client'
import useSWRImmutable from 'swr/immutable'
import { CreateLinkProps } from '../models/paragraphGameLink'
import { ResponseData } from '../pages/api/paragraph/link/create'

const basePath = '/api/paragraph/link'

export const useLinkByCode = (code: string) =>
    useSWRImmutable<ParagraphGameLink>(`${basePath}/${code}`)

export const createLink = async (
    props: CreateLinkProps
): Promise<ResponseData> => {
    const res = await fetch(`${basePath}/create`, {
        method: 'POST',
        body: JSON.stringify(props),
    })
    return await res.json()
}
