const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server now up and running on port ' + port)
})

const main = async() => {
    // const task = await Task.findById('61ccad7cc71758223b95aa13')
    // await task.populate('owner')
    // console.log(task.owner)

    // const user = await User.findById('61ccad07c71758223b95a9fe')
    // await user.populate('tasks')
    // console.log(user.tasks)
}

main()
