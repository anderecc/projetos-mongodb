/* eslint-disable no-undef */
import { connectMongoDB } from '@/libs/connectMongoDB';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '@/models/user';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({ meg: 'Método não suportado.' });
    }

    const { email, password } = req.body;

    try {
        await connectMongoDB();
        User.findOne({ email })
            .then((user) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const { name, email } = user;
                    const token = jwt.sign(
                        { id: user._id, name, email },
                        process.env.NEXT_PUBLIC_SECRET,
                        { expiresIn: '1d' }
                    );

                    res.status(200).json({
                        token,
                    });
                } else {
                    res.status(404).send({
                        msg: 'Usuário ou senha inválidos.',
                    });
                }
            })
            .catch((error) =>
                res.status(404).send({
                    error,
                    msg: 'Ocorreu algum erro ao tentar efetuar o login.',
                })
            );
    } catch (error) {
        res.status(404).send({
            msg: 'Ocorreu algum erro ao tentar efetuar o login.',
        });
    }
}
