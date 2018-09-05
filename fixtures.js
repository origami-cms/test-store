module.exports = {
    user: {
        age: 24,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'secret'
    },

    post: {
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit illum rerum delectus quis voluptates'
    }
};


module.exports.randomUser = (obj = {}) => {
    return {
        ...module.exports.user,
        ...{
            email: (Math.random() * 1000) + '@example.com',
        },
        ...obj
    }
};

module.exports.randomPost = (obj = {}) => {
    return {
        ...module.exports.post,
        ...obj
    }
};
