const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.hs80f.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 7
    }
})

const Person = mongoose.model('Person', phoneSchema)

if (process.argv.length == 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
        })
        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        mongoose.connection.close()
    })
}

