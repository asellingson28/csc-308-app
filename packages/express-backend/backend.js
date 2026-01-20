// backend.js
import express from "express"; // express module -- used for http communication
import cors from "cors"; // used for program testing

const app = express(); // instance of express 
const port = 8000;

app.use(cors());

app.use(express.json()); // express app to process incoming data in JSON format

app.get("/", (req, res) => { // / is the url endpoint (like root link address)
  res.send("Hello World of people!");  // we have the callback function that'll be called when our server receives an incoming GET request matching the / URL pattern
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}` // incoming http requests on the defined port number
  );
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) { // name provided in form of localhost:8000/users?name=Mac
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const { id, name, job } = req.body;
  console.log({ id, name, job });
  // Basic validation
  if (!id || !name || !job) {
    return res.status(400).send({
      error: "id, name, and job are required"
    });
  }

  // Prevent duplicate IDs
  const existingUser = findUserById(id);
  if (existingUser) {
    return res.status(409).send({
      error: "User with this id already exists"
    });
  }

  const newUser = addUser({ id, name, job });

  // Respond properly
  res.status(201).send(newUser);
});


const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(user => user.id === id);
  if (index !== -1) {
    let removed = users["users_list"].splice(index, 1);
    console.log(removed);
    return true; // deleted
  }
  return false; // not found
};

//=========== DELETE ROUTE ===========
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const deleted = deleteUserById(id);
  if (!deleted) return res.status(404).send("Resource not found.");

  res.status(204).send(); // No Content
});


// res.on('close', () => {
//   console.log('Client disconnected');
//   res.destroy(); // Forcefully close the connection
// });   

// curl -i http://localhost:8000/users/abc123

/**
 * curl -i -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new111",
    "name": "Frank",
    "job": "Lawyer"
  }'

 */
