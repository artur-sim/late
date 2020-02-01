import Sequelize from 'sequelize';

const connection = new Sequelize('newdbx', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})


const User = connection.define('usery', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

connection.sync().then(function () {

})

export default User;