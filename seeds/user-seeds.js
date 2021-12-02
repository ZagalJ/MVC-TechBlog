const { User } = require('../models');

const userData = [
  {
    id: '1',
    username: 'zagal',
    firstName: 'jonathan',
    email: 'a@a.com',
    password: '123',
  }
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
