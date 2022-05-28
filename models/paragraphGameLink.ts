import type { ParagraphGameLink } from '@prisma/client'
import { prisma } from '../utils/db'

export function getLinkByCode({ code }: Pick<ParagraphGameLink, 'code'>) {
    return prisma.paragraphGameLink.findFirst({
        where: { code },
    })
}

export type CreateLinkProps = Pick<
    ParagraphGameLink,
    'code' | 'paragraph' | 'hideCreate'
>

export function createLink({ code, paragraph, hideCreate }: CreateLinkProps) {
    return prisma.paragraphGameLink.create({
        data: {
            code: code !== '' ? code : undefined,
            paragraph,
            hideCreate,
        },
    })
}
