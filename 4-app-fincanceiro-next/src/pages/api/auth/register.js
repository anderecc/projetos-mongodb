/* eslint-disable no-undef */
import { connectMongoDB } from '@/libs/connectMongoDB';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/user';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({ msg: 'Método não suportado.' });
    }

    const { name, email, password, confirmPassword } = req.body;

    try {
        await connectMongoDB();

        if (!name) {
            res.status(404).send({
                msg: 'O nome informado está inválido.',
            });
        }

        if (!email.match(emailRegex)) {
            res.status(404).send({
                msg: 'O e-mail informado está inválido.',
            });
        }

        if (!password.match(passwordRegex)) {
            res.status(404).send({
                msg: 'A senha deve conter, letras maiúsculas, minusculas, entre 6 a 12 caracteres e entre eles algum especial.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
            res.status(404).send({
                msg: 'As senhas não conferem.',
            });
        }

        User.findOne({ email })
            .then((user) => {
                if (user) {
                    res.status(404).send({
                        msg: 'Usuário já cadastrado.',
                    });
                } else {
                    User.create({ name, email, password: passwordHash })
                        .then((data) => {
                            const { id, name, email } = data;
                            const token = jwt.sign(
                                { id, name, email },
                                process.env.NEXT_PUBLIC_SECRET,
                                { expiresIn: '1d' }
                            );
                            res.status(201).send({
                                token,
                            });
                        })
                        .catch((error) =>
                            res.status(404).send({
                                error,
                                msg: 'Ocorreu algum erro ao tentar registrar sua conta.',
                            })
                        );
                }
            })
            .catch((error) =>
                res.status(404).send({
                    error,
                    msg: 'Ocorreu algum erro ao tentar registrar o usuário.',
                })
            );
    } catch (error) {
        res.status(404).send({
            error,
            msg: 'Ocorreu algum erro ao tentar registrar sua conta.',
        });
    }
}
