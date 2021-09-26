
const database = require('../configurations/db')
const User = require('../models/User')

async function insert(user) {
    try {
        const con = await database.sync()
        console.log(con)
        const res = await User.create(user);
        console.log(res)
    }
    catch (err) {
        console.log(err)
    }
}


async function update(user) {
    try {
        const { id } = user
        const userMatched = await user.findByPk(id)
        userMatched = user
        const res = await user.save();
        console.log(res)
    }
    catch (err) {
        console.log(err)
    }
}


async function getAll() {
    try {
        const users = await User.findAll();
        console.log(users);
    }
    catch {
        console.log(err)
    }
}

async function remove(id) {
    try {
        User.destroy({ where: { id } })
    }
    catch {
        console.log(err)
    }
}

module.exports = {
    insert,
    update,
    getAll,
    remove
}