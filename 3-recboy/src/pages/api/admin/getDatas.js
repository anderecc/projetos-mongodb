import connectMongoDB from '@/libs/connectMongoDB';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send({ error: 'Método não suportado' });
    }

    try {
        await connectMongoDB();

        await User.find()
            .then((data) => {
                const users = [];
                data?.forEach((user) => {
                    const { data, name } = user;
                    users.push({
                        name,
                        data: {
                            week: data.closingWeek,
                            aggregate: data.closingAggregate,
                        },
                    });
                });
                return res.status(200).send({ users });
            })
            .catch((err) => {
                return res.status(400).send({ err });
            });
    } catch (error) {
        return res.status(400).send({
            error: 'Ocorreu algum erro ao tentar buscar os dados dos usuários.',
        });
    }
}
