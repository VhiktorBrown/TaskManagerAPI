require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('61b4b979a26da5047bc3d430', { age: 40}).then((user) => {
//     console.log(user)

//     return User.countDocuments({ age: 40})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const update = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('61b4b979a26da5047bc3d430', 40).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})