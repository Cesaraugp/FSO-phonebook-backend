const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  { id: 1, name: "Cesar", number: "0414-7685182" },
  { id: 2, name: "Juan", number: "0464-7468213" },
  { id: 3, name: "Pedro", number: "0424-5531725" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const amount = persons.length;
  res.send(`<p>Phonebook has info for ${amount} people</p>
            <p>${date}</p>
    `);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).end();
  } else res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personId = persons.find((p) => p.id === id);
  if (!personId) res.status(404).end();
  else {
    persons = persons.filter((p) => p.id !== id);
    res.status(204).end();
  }
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  const isAlreadyRegisteredName = persons.find((p) => p.name === person.name);
  if (!person.name || !person.number) {
    res.status(406);
    res
      .json({
        error: `Bad Params`,
      })
      .end();
  } else if (isAlreadyRegisteredName) {
    res.status(409);
    res
      .json({
        error: "User name already registered on the phonebook",
      })
      .end();
  } else {
    person.id = Math.floor(Math.random() * 1000) + 1;
    persons = persons.concat(person);
    res.json(person);
  }
});

const unknownEndpoint = (request, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
