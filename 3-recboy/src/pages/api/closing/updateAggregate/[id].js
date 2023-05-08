import connectMongoDB from '@/libs/connectMongoDB';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).send({ error: 'Método não suportado' });
    }
    try {
        await connectMongoDB();

        const { id } = req.query;
        const closingAggregate = req.body;

        await User.findById(id)
            .then((user) =>
                User.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            data: {
                                ...user.data,
                                closingAggregate: {
                                    ...user.data.closingAggregate,
                                    ...closingAggregate,
                                },
                            },
                        },
                    },
                    {
                        new: true,
                    }
                )
                    .then((user) => res.status(200).send({ data: user.data }))
                    .catch((err) => res.status(400).send({ err }))
            )
            .then((err) => res.status(400).send({ err }));
    } catch (error) {
        return res.status(400).send({
            error: 'Ocorreu algum erro ao tentar efetuar seu registro.',
        });
    }
}
