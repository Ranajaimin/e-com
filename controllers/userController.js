const userService = require('../services/userService');

exports.getAllUsers = (req, res, next) => {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(next);
};

exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    let data = await userService.createUser(name, email, password)
    res.json(data)
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let data = await userService.loginUser(email, password)
    res.json(data)
};
