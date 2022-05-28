import { ParagraphGameLink } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getLinkByCode } from '../../../../models/paragraphGameLink'

export interface ResponseData {
    data?: Omit<ParagraphGameLink, 'createdAt'> & { createdAt: string }
    error?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET')
        return res.status(405).send({ error: 'method not allowed' })

    const { code } = req.query

    if (typeof code !== 'string')
        return res.status(400).send({ error: 'code is not valid' })

    const gameLink = await getLinkByCode({ code })

    if (!gameLink) return res.status(404).send({ error: 'link not found' })

    res.status(200).json({ data: gameLink })
}
