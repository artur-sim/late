import {
    Strategy as LocalStrategy
} from 'passport-local';
import bcrypt from 'bcrypt'

export default function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {
                mesage: 'No user with that Email'
            })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {

            } else {
                return done(null, false, {
                    message: 'Password Incorrect'
                })
            }
        } catch (e) {
            return done(e)

        }

    }
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize