/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connectMongoDB from '@/libs/connectMongoDB';
import User from '@/models/User';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z]).{6,20})/;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Método não suportado' });
    }
    try {
        await connectMongoDB();
        const { name, email, password, confirmPassword } = req.body;

        if (!name) {
            return res
                .status(406)
                .send({ error: 'Nome precisa ser preenchido.' });
        }
        if (!email.match(emailRegex)) {
            return res
                .status(406)
                .send({ error: 'E-mail informado está inválido.' });
        }
        if (!password.match(passwordRegex)) {
            return res.status(406).send({
                error: 'Senha deve ter entre 6 a 12 caracteres.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
            return res.status(406).send({
                error: 'As senhas não estão iguais.',
            });
        }

        // buscando se existe já algum e-mail cadastrado com o que foi passado
        await User.findOne({ email })
            .then((user) => {
                if (user) {
                    return res.status(401).send({
                        error: 'Já existe um usuário com esse e-mail.',
                    });
                } else {
                    User.create({
                        name,
                        email,
                        password: passwordHash,
                        data: {
                            closingDay: {
                                date: '00/00/0000',
                                values: [],
                                total: 0,
                            },
                            closingWeek: {
                                values: [],
                                total: 0,
                            },
                            closingAggregate: {
                                values: [
                                    {
                                        values: [],
                                        total: 0,
                                    },
                                ],
                                total: 0,
                            },
                        },
                    })
                        .then(async (user) => {
                            const { id, name, email } = user;
                            const token = await jwt.sign(
                                { id, name, email },
                                process.env.NEXT_PUBLIC_JWT,
                                { expiresIn: '1d' }
                            );

                            return res.status(201).send({
                                token,
                            });
                        })
                        .catch(() =>
                            res.status(400).send({
                                error: 'Ocorreu algum erro ao tentar efetuar seu registro.',
                            })
                        );
                }
            })
            .catch(() =>
                res.status(404).send({
                    error: 'Ocorreu algum erro ao tentar efetuar seu registro.',
                })
            );
    } catch (error) {
        return res.status(400).send({
            error: 'Ocorreu algum erro ao tentar efetuar seu registro.',
        });
    }
}
