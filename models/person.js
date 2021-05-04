const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((r) => {
    console.log("🟢 connected to MongoDB");
  })
  .catch((error) => {
    console.log("🔴 Error Connecting to MongoDB: ", error.message);
  });
const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);
