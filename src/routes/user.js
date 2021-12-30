const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
   
    const user = new User(req.body)


    try{
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send( { user, token})
    }catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
           return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch(e) {
        res.status(500).save()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return false
        })

        await req.user.save()
        res.send()
    }catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
       return res.status(400).send({
            error: 'Invalid updates!'
        })
    }
    try{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true})

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try{
        req.user.remove(req.user._id)
        res.send(req.user)
    }catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router