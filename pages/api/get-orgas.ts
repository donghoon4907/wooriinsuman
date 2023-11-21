import type { NextApiRequest, NextApiResponse } from 'next';
import orgasService from '@services/orgasService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const { rate } = req.query;

    try {
        const { data } = await orgasService.getOrgas({
            rate: rate as string,
        });

        res.status(200).json(data);
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}
