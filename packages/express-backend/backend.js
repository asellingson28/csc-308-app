// backend.js
import express from "express"; // express module -- used for http communication
import cors from "cors"; // used for program testing
import userService from "../../mongo/user-services.js";

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

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };


// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;

    const users = await userService.getUsers(name, job);

    res.json({ users_list: users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});


// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);


app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findUserById(id);

    if (!user) {
      return res.status(404).send("Resource not found.");
    }

    res.json(user);
  } catch (error) {

    console.error(error);
    res.status(400).send("Invalid user id");
  }
});

app.get("/users/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const user = await userService.findUserByName(name);
    if (!user) {
      return res.status(404).send("Resource not found.");
    }

    res.json(user);
  } catch (error) {

    console.error(error);
    res.status(400).send("Invalid user name");
  }
});
app.get("/users/:job", async (req, res) => {
  try {
    const { job } = req.params;

    const user = await userService.findUserByJob(job);
    if (!user) {
      return res.status(404).send("Resource not found.");
    }

    res.json(user);
  } catch (error) {

    console.error(error);
    res.status(400).send("Invalid user job");
  }
});

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

app.post("/users", async (req, res) => {
  try {
    const { name, job } = req.body;

    if (!name || !job) {
      return res.status(400).json({
        error: "name and job are required",
      });
    }

    const userToAdd = { name, job };

    const savedUser = await userService.addUser(userToAdd);

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error creating user",
    });
  }
});



app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).send("Resource not found.");
    }

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    return res.status(400).send("Invalid user id");
  }
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
