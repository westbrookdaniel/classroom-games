import type { ParagraphGameLink } from '@prisma/client'
import { prisma } from '../utils/db'

export async function getLinkByCode({ code }: Pick<ParagraphGameLink, 'code'>) {
    const link = await prisma.paragraphGameLink.findFirst({
        where: { code },
    })
    return {
        ...link,
        createdAt: link?.createdAt.toUTCString(),
    }
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
