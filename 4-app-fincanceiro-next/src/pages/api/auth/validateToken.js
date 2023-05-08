/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req = NextRequest, res = NextResponse) {
    if (req.method !== 'POST') {
        res.status(400).send({ msg: 'Método não suportado.' });
    }

    try {
        const { token } = req.body || req.query || '';

        await jwt.verify(
            token,
            process.env.NEXT_PUBLIC_SECRET,
            function (err, decoded) {
                !err
                    ? res.status(200).send({ valid: token, decoded })
                    : res.status(401).send({
                          msg: 'Token está inválido. Faça seu login novamente.',
                      });
            }
        );
    } catch (error) {
        res.status(401).send({
            error,
            msg: 'Ocorreu algum erro durante a validação.',
        });
    }
}
