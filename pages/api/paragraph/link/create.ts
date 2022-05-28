import { ParagraphGameLink } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createLink, getLinkByCode } from '../../../../models/paragraphGameLink'

export interface ResponseData {
    data?: ParagraphGameLink
    error?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST')
        return res.status(405).send({ error: 'method not allowed' })

    const { code, paragraph, hideCreate } = JSON.parse(req.body)

    console.log(req.body.paragraph)

    if (typeof paragraph !== 'string')
        return res.status(400).send({ error: 'paragraph is not valid' })

    if (typeof code !== 'string')
        return res.status(400).send({ error: 'code is not valid' })

    if (typeof hideCreate !== 'boolean')
        return res.status(400).send({ error: 'hideCreate is not valid' })

    if (await getLinkByCode({ code }))
        return res
            .status(400)
            .send({ error: 'link with this code already exists' })

    const gameLink = await createLink({ code, paragraph, hideCreate })
    res.status(200).json({ data: gameLink })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '500kb',
        },
    },
}
