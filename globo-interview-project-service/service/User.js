
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
        const { id } = user
        let userMatched = await User.findByPk(id)
        if (userMatched) {
            console.log('usuario encontrado',userMatched)
            userMatched = user
            console.log('usuario atualizado',user)
            const res = await user.save();
            return res;

        }
        else {
            throw new Error("user not found");
        }
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
        return { valid: true, message: 'Login valid! :)' }
    }
    catch {
        console.log(err)
        return { valid: true, message: err }

    }
}

module.exports = {
    insert,
    login,
    update,
    getAll,
    remove
}