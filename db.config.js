const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '',
        database: 'newdby',
    },
};

module.exports = config[env];