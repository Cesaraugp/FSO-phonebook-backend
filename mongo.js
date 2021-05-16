const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cesaraugp:${password}@cluster0.ar5gh.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const persona = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });

  persona.save().then((r) => {
    console.log(`added ${r.name} number ${r.phone} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((r) => {
    console.log("phonebook:");
    r.forEach((person) => {
      console.log(person.name, person.phone);
    });
    mongoose.connection.close();
  });
}
