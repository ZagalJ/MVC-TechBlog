const { Post } = require('../models');

const postData = [
    {
        title: "Post #1",
        text: "This is a test post",
        user_id: 1

    }
]

const postSeed = () => Post.bulkCreate(postData);

module.exports = postSeed;