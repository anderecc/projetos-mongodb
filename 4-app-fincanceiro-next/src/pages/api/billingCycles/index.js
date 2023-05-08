import { connectMongoDB } from '@/libs/connectMongoDB';
import BillingCycle from '@/models/billingCycle';

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'POST') {
        try {
            let item = req.body;
            BillingCycle.create(item).then((data) => {
                console.log(data);
                res.status(201)
                    .send({
                        msg: 'Item foi adicionado com sucesso',
                    })
                    .catch((error) =>
                        res.status(404).send({
                            error,
                            msg: 'Ocorreu algum erro ao tentar inserir os dados',
                        })
                    );
            });
        } catch (error) {
            res.status(404).send({
                error,
                msg: 'Ocorreu algum erro ao tentar inserir os dados',
            });
        }
    } else if (req.method === 'GET') {
        try {
            BillingCycle.find()
                .then((data) => res.status(200).send(data))
                .catch((error) =>
                    res.status(404).send({
                        error,
                        msg: 'Ocorreu algum erro ao tentar consumir os dados',
                    })
                );
        } catch (error) {
            res.status(404).send({
                error,
                msg: 'Ocorreu algum erro ao tentar consumir os dados',
            });
        }
    } else {
        res.status(400).send({ msg: 'Método não suportado.' });
    }
}
