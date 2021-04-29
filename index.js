const express = require("express");
const app = express();

app.use(express.json());

const persons = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
