const mongoose = require('mongoose');
require('dotenv').config()



// connection string
const dburl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.d8mb7.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dburl)
.then(result => console.log('connected to MongoDb'))
.catch(error => console.log("Error connecting to mongdb",error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,    
})

personSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)


