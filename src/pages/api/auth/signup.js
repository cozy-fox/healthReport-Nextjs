import dbConnect from "../../../server/dbConnect";
import User from "../../../server/model/user";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            role: 'user',
            allowed: false,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        try {
            await user.save();
            res.status(200).send({ message: "User was registered Sucessfully!" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
}