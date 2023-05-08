import { connectMongoDB } from '@/libs/connectMongoDB';
import BillingCycle from '@/models/billingCycle';

export default async function handler(req, res) {
    await connectMongoDB();
    let { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            BillingCycle.deleteOne({ _id: id })
                .then((data) => res.status(200).send(data))
                .catch((error) =>
                    res.status(404).send({
                        error,
                        msg: 'Ocorreu algum erro ao tentar excluir o documento.',
                    })
                );
        } catch (error) {
            res.status(404).send({
                error,
                msg: 'Ocorreu algum erro ao tentar excluir o documento.',
            });
        }
    } else if (req.method === 'PUT') {
        let item = req.body;
        try {
            BillingCycle.updateOne({ _id: id }, item)
                .then((data) => res.status(200).send(data))
                .catch((error) =>
                    res.status(404).send({
                        error,
                        msg: 'Ocorreu algum erro ao tentar alterar o documento.',
                    })
                );
        } catch (error) {
            res.status(404).send({
                error,
                msg: 'Ocorreu algum erro ao tentar alterar o documento.',
            });
        }
    } else {
        res.status(400).send({ msg: 'Método não suportado.' });
    }
}
