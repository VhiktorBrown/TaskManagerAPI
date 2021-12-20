const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()

const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//         res.status(503).send('API is temporarily down and under maintenance')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server now up and running on port ' + port)
})
