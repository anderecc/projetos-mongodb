import connectMongoDB from '@/libs/connectMongoDB';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send({ error: 'Método não suportado' });
    }

    try {
        const { id } = req.query;
        await connectMongoDB();

        await User.findById(id)
            .then((user) => {
                return res.status(200).send({ data: user.data });
            })
            .catch((err) => {
                return res.status(400).send({ err });
            });
    } catch (error) {
        return res.status(400).send({
            error: 'Ocorreu algum erro ao tentar buscar o fechamento do dia.',
        });
    }
}
