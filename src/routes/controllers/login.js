import User from '../../../models/user'
import passport from 'passport'
import bcrypt from 'bcrypt'



export async function post(req, res, next) {

    res.setHeader('Content-Type', 'application/json')
    const email = req.body.user.email
    const password = req.body.user.password

    passport.authenticate('local', {

        }),
        function (req, res) {
            console.log(req)
        }


}














//trash


// const errHandler = (err) => {
//     console.log("Error :", err);
// }

// const username = "kkk"
// // const password = req.body.user.password


// // console.log(password)