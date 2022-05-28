import { ParagraphGameLink } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getLinkByCode } from '../../../../models/paragraphGameLink'

interface ResponseError {
    error: string
}

interface ResponseData {
    data: ParagraphGameLink | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ResponseError>
) {
    if (req.method !== 'GET')
        return res.status(405).send({ error: 'method not allowed' })

    const { code } = req.query

    if (typeof code !== 'string')
        return res.status(400).send({ error: 'code is not valid' })

    const gameLink = await getLinkByCode({ code })
    res.status(200).json({ data: gameLink })
}
