const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.route");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
