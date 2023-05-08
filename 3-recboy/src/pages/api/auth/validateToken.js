/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Método não suportado' });
    }

    try {
        const { token } = req.body || req.query || '';

        await jwt.verify(
            token,
            process.env.NEXT_PUBLIC_JWT,
            function (err, decoded) {
                !err
                    ? res.status(200).send({ valid: token, decoded })
                    : res.status(401).send({
                          error: 'Token está inválido. Faça seu login novamente.',
                      });
            }
        );
    } catch (error) {
        return res.status(401).send({
            error: 'Ocorreu algum erro ao tentar validar seu token.',
        });
    }
}
