import { connectMongoDB } from '@/libs/connectMongoDB';
import BillingCycle from '@/models/billingCycle';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(400).send({ msg: 'Método não suportado.' });
    }

    await connectMongoDB();
    try {
        BillingCycle.aggregate([
            {
                $project: {
                    credit: { $sum: '$credits.value' },
                    debit: { $sum: '$debits.value' },
                },
            },
            {
                $group: {
                    _id: null,
                    credit: { $sum: '$credit' },
                    debit: { $sum: '$debit' },
                },
            },
            { $project: { _id: 0, credit: 1, debit: 1 } },
        ])
            .then((data) => res.status(200).send(data))
            .catch((error) =>
                res.status(404).send({
                    error,
                    msg: 'Ocorreu algum erro ao agregar os valores.',
                })
            );
    } catch (error) {
        res.status(404).send({
            error,
            msg: 'Ocorreu um erro ao agregar os resultados.',
        });
    }
}
