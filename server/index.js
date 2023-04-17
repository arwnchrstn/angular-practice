const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const todos = [];
const employees = [];

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));
app.use(morgan("tiny"));

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos/add", (req, res) => {
  todos.push(req.body);

  res.send(req.body);
});

app.put("/todos/:index", (req, res) => {
  console.log(req.body);
  todos.splice(req.params.index, 1, req.body);

  res.send(req.params.index);
});

app.delete("/todos/:index", (req, res) => {
  todos.splice(req.params.index, 1);

  res.send(req.params.index);
});

//--------------------------------------------------------------------------
app.get("/employees", (req, res) => {
  res.send(employees);
});

app.get("/employee/:index", (req, res) => {
  const { index } = req.params;

  const employee = employees.at(index);

  res.send(employee);
});

app.post("/employees/add", (req, res) => {
  employees.push(req.body);

  res.send("Employee Added");
});

app.put("/employee/:index/edit", (req, res) => {
  employees.splice(req.params.index, 1, req.body);

  res.send("Employee Updated");
});

app.delete("/employee/:index/delete", (req, res) => {
  employees.splice(req.params.index, 1);

  res.send(req.params.index);
});

app.listen(5000, () => {
  console.log("Server running");
});
