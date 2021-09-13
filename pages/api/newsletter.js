import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
        }

        const client = await MongoClient.connect(
            'mongodb+srv://adi:g6v2z4auqmIwpLRq@cluster0.usjbg.mongodb.net/events?retryWrites=true&w=majority'
        );

        const db = client.db();

        await db.collection('newsletter').insertOne({ email: userEmail });

        client.close();

        res.status(201).json({ message: 'Signed up!' });
    }
};

export default handler;
