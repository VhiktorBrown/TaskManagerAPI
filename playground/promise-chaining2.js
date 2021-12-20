require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// Task.findByIdAndDelete('61b3d8b342ac629f29a384b4').then((task) => {
//     console.log(task)

//     return Task.countDocuments({ completed : false})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => [
//     console.log(error)
// ])

const deleteAndCount = async (id, completed) => {
    const remove = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })

    return count
}

deleteAndCount('61b4d2ff7253353c726e704e', false).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})