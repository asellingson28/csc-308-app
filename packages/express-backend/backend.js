// backend.js
import express from "express"; // express module -- used for http communication

const app = express(); // instance of express 
const port = 8000;

app.use(express.json()); // express app to process incoming data in JSON format

app.get("/", (req, res) => { // / is the url endpoint (like root link address)
  res.send("Hello World!");  // we have the callback function that'll be called when our server receives an incoming GET request matching the / URL pattern
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

app.get("/users", (req, res) => {
  res.send(users);
}); 