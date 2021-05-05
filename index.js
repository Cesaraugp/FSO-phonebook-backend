const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const Person = require("./models/person");
const app = express();
morgan.token("body", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
  else return " ";
});
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms  :body "
  )
);
app.use(cors());
app.use(express.static("build"));

let persons = [
  { id: 1, name: "Cesar", phone: "0414-7685182" },
  { id: 2, name: "Juan", phone: "0464-7468213" },
  { id: 3, name: "Pedro", phone: "0424-5531725" },
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((r) => {
    res.json(r);
  });
  //res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const amount = persons.length;
  res.send(`<p>Phonebook has info for ${amount} people</p>
            <p>${date}</p>
    `);
});
app.get("/api/persons/:id", (req, res) => {
  const id = phone(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).end();
  } else res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((r) => {
      if (r) res.json(r);
      else res.status(204).end();
    })
    .catch((error) => console.log(error));
});

app.post("/api/persons", (req, res) => {
  const { name, phone } = JSON.parse(JSON.stringify(req.body));
  const person = new Person({
    name,
    phone,
  });

  let isAlreadyRegisteredName = persons.find((p) => p.name === person.name);
  //isAlreadyRegisteredName = false;
  if (!person.name || !person.phone) {
    res.status(406);
    res
      .json({
        error: `Bad Params`,
      })
      .end();
  } else if (isAlreadyRegisteredName) {
    //findByIdAndUpdate
    res.status(409);
    res
      .json({
        error: "User name already registered on the phonebook",
      })
      .end();
  } else {
    person.save().then((savedNote) => res.json(savedNote));
  }
});

const unknownEndpoint = (request, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
