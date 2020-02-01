// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }

import sirv from 'sirv';
import express from 'express';
import passport from 'passport'
import {
    Strategy as LocalStrategy
} from 'passport-local';
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionFileStore from 'session-file-store';
import compression from 'compression';
import * as sapper from '@sapper/server';
// import flash from 'express-flash';
import Sequelize from 'sequelize';

const {
    PORT,
    NODE_ENV
} = process.env;
const dev = NODE_ENV === 'development';
const FileStore = sessionFileStore(session)

const sequelize = new Sequelize('newdbx', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

passport.use(new LocalStrategy({
    usernameField: 'email',
    callbackURL: 'http://localhost:3000/auth/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log('sucessPassport')
    return cb(null, profile)
}))

passport.serializeUser(function (user, cb) {
    cb(null, obj)
})
passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
})

const expressServer = express()
    .use(passport.initialize())
    .use(bodyParser.json())
    .use(session({
        secret: 'conduit',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 31536000
        },
        store: new FileStore({
            path: `.sessions`
        })
    }))

    .get('login',
        passport.authenticate('local'))
    .get('/callback',
        passport.authenticate('local', {
            failureRedirect: '/login'
        }),
        (req, res) => {
            res.redirect('/');
            console.log(req.user.username);
        })
    .get('/logout', (req, res) => {
        req.logout();
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    })

    .use(
        compression({
            threshold: 0
        }),
        sirv('static', {
            dev
        }),
        sapper.middleware({
            session: req => {
                const user = req.session.passport ? req.session.passport.user.username : null;
                // console.log(req.session.passport.user.username);
                return {
                    user
                };
            }
        })
    )
if (dev) {
    expressServer.listen(PORT, err => {
        if (err) console.log('error', err);
    });
}

export {
    expressServer
}


































//import initializePassport from '../passport-config';









// const app = express()



// const sequelize = new Sequelize('newdbx', 'root', '', {
// 	host: 'localhost',
// 	dialect: 'mysql'
// })

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch(err => {
// 		console.error('Unable to connect to the database:', err);
// 	});

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
// 	extended: false
// }))
// app.use(express.urlencoded({
// 	extended: false
// }))
// app.use(express.json())
// app.use(flash())
// app.use(session({
// 	secret: process.env.SESSION_SECRET,
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		secure: false,
// 		maxAge: 1000 * 60 * 60 * 24 * 7
// 	}
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(cookieParser())
// const assets = sirv('static', {
// 	maxAge: 31536000, //1Y
// 	immutable: true
// })

// app.use(assets, compression({
// 		threshold: 0
// 	}),
// 	sapper.middleware({
// 		session: req => ({
// 			user: req.session && req.session.user
// 		})
// 	})).listen(PORT, err => {
// 	if (err) console.log('error', err);
// });


// initializePassport(
// 	passport,
// 	email => users.find(user.email === email)
// )