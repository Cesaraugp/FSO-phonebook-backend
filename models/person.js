const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('🟢 connected to MongoDB')
  })
  .catch((error) => {
    console.log('🔴 Error Connecting to MongoDB: ', error.message)
  })
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 3 },
  phone: { type: String, required: true, minLength: 8 },
})
//Paquete para evitar duplicados en el sschema
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Person', personSchema)
