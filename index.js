const express = require("express");
const http = require("http");
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

app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.find({})
    .then((r) => {
      const amount = r.length;
      res
        .send(
          `<p>Phonebook has info for ${amount} people</p>
    <p>${date}</p>`
        )
        .end();
    })
    .catch((e) => next(e));
});
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((r) => {
      console.log(r);
      if (r) res.json(r);
      else res.status(404).end();
    })
    .catch((e) => {
      next(e);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((r) => {
      if (r) res.json(r);
      else res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
  const { name, phone } = req.body;

  Person.findByIdAndUpdate(id, { name, phone }, { new: true })
    .then((result) => {
      res.json(result).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, phone } = req.body;
  const person = new Person({
    name,
    phone,
  });
  if (!person.name || !person.phone) {
    res.status(406);
    res
      .json({
        error: `Bad Params`,
      })
      .end();
  }
  Person.find({ name: name }).then((r) => {
    if (/*r.length !== 0*/ false) {
      const body = JSON.stringify({ name: name, phone: phone });
      const request = http
        .request(
          `http://localhost:3001/api/persons/${r[0].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(body),
            },
          },
          (response) => {
            const { statusCode } = response;
            const contentType = response.headers["content-type"];
            let error;
            if (statusCode !== 200) {
              error = new Error(
                "Request Failed.\n" + `Status Code: ${statusCode}`
              );
            } else if (!/^application\/json/.test(contentType)) {
              error = new Error(
                "Invalid content-type.\n" +
                  `Expected application/json but received ${contentType}`
              );
            }
            if (error) {
              console.error(error.message);
              response.resume();
              return;
            }

            response.setEncoding("utf8");
            response.on("data", (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            response.on("end", () => {
              try {
                console.log("successfully updated");
              } catch (e) {
                console.error("error on end: ", e.message);
              }
            });
          }
        )
        .on("error", (e) => {
          console.error(`Got error: ${e.message}`);
        });
      request.end(body);
    } else {
      person
        .save(function (err) {
          next(err);
        })
        .then((savedNote) => res.json(savedNote))
        .catch((e) => next(e));
    }
  });
});

const unknownEndpoint = (request, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted phonebook id" });
  }
  if (error.name === "ValidationError") {
    return response.status(409).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
