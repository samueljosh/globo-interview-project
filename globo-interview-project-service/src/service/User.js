
const User = require('../models/User')

async function insert(user) {
    try {
        const userCreated = await User.create(user);
        return userCreated;
    }
    catch (err) {
        console.log('error', err)
    }
}

async function update(user) {
    try {
        const { id, ...userRest } = user
        let response = await User.update(userRest, { where: { id } })
        return response

    }
    catch (err) {
        console.log('error', err)
    }
}

async function getAll() {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        console.log('users', users)
        return users
    }
    catch (err) {
        console.log('error', err)
    }
}

async function remove(id) {
    try {
        const userDeleted = await User.destroy({ where: { id } })
        return userDeleted;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

async function login(email, password) {
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return { valid: false, message: 'Incorrect email!' }
        }
        if (user.password !== password) {
            return { valid: false, message: 'Incorrect password!' }
        }
        return { valid: true, message: 'Logado! :)', levelAccess: user.levelAccess }
    }
    catch {
        console.log(err)
        return { valid: false, message: err }

    }
}

module.exports = {
    insert,
    login,
    update,
    getAll,
    remove
}