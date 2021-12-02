const { User } = require('../models');

const userData = [
  {
    id: '1',
    user_name: 'zagal',
    first_name: 'jonathan',
    email: 'a@a.com',
    password: '123',
  }
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
