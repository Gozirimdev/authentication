const mongoose = require('mongoose')

const connStr = 'mongodb+srv://chigozirimfavour001:pNEw9KKv84ktcBjT@cluster0.xaa2v0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let temp = 'pNEw9KKv84ktcBjT'
async function connect() {
    try {
        await mongoose.connect(connStr)
        console.log('db connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connect