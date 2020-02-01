import User from '../../../models/user'
import bcrypt from 'bcrypt'


export async function post(req, res, next) {

    try {
        const hashedPassword = await bcrypt.hash(req.body.user.password, 10)
        User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            password: hashedPassword,
        })


    } catch (error) {
        res.redirect('/register');
        console.log(error)
    }


}