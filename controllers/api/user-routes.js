const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes
// GET -- get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET id-- get a single user by id
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST -- add a new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
    
        res.json(userData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST -- login route for a user
router.post('/login',  (req, res) => {
      User.findOne({
        where: {
        email: req.body.email
        }
    }).then(userData => {
        if (!userData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
    
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    });  
});

// POST /api/users/logout -- log out an existing user
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
       res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

router.post("/signup", function (req, res) {
  User.create({
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      email: req.body.email,
      password: req.body.password

  })
      .then(function (userData) {
        res.json({userData, 
          logged_in: true});
      })
      .catch(function (err) {
          res.status(401).json(err);
      });
});

// PUT /api/users/1 -- update an existing user
router.put('/:id', withAuth, (req, res) => {
     User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
      .then(userData => {
        if (!userData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

// DELETE /api/users/1 -- delete an existing user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;