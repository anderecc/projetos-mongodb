/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connectMongoDB from '@/libs/connectMongoDB';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Método não suportado' });
    }
    try {
        await connectMongoDB();
        const { email, password } = req.body;

        await User.findOne({ email })
            .then(async (user) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const { id, name, email } = user;
                    const token = await jwt.sign(
                        { id, name, email },
                        process.env.NEXT_PUBLIC_JWT,
                        { expiresIn: '1d' }
                    );

                    return res.status(200).send({ token });
                } else {
                    return res.status(404).send({
                        error: 'E-mail ou senha inválidos.',
                    });
                }
            })
            .catch(() =>
                res.status(404).send({
                    error: 'Ocorreu algum erro ao tentar efetuar seu login.',
                })
            );
    } catch (error) {
        return res.status(400).send({
            error: 'Ocorreu algum erro ao tentar efetuar seu login.',
        });
    }
}
