const { getAll, insert, remove, update, login } = require('../service/User')

module.exports = function (app) {

    app.get('/getAll', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const users = await getAll()
        if (users) {
            return res.status(200).send(users)
        }
        else {
            return res.status(404).send({ message: 'Any user found!' })
        }
    })

    app.post('/login', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const { email, password } = req.body
        const loginResponse = await login(email, password)
        if (loginResponse) {
            return res.status(200).send(loginResponse)
        }
        else {
            return res.status(500).send({ message: 'Internal error on login user' })
        }

    })

    app.post('/create', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const { email, password, levelAccess } = req.body
        const createdUser = await insert({ email, password, levelAccess })
        if (createdUser) {
            return res.status(200).send({ user: createdUser, message: 'User created successfully!' })
        }
        else {
            return res.status(500).send({ message: 'Internal Error on create user' })
        }
    })

    app.delete('/delete/:id', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const removed = await remove(req.params.id)
        if (removed) {
            return res.status(200).send({ removed, message: 'User removed successfully!' })
        }
        else {
            return res.status(404).send({ message: 'User not found' })
        }
    })

    app.put('/update', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const { email, password, id, levelAccess } = req.body
        const userUpdated = await update({ email, password, id, levelAccess })
        if (userUpdated) {
            return res.status(200).send({ userUpdated, message: 'User updated successfully!' })
        }
        else {
            return res.status(404).send({ message: 'User not found' })

        }
    })

}