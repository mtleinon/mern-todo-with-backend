const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const { mongoURI } = require('./config/keys');

const Todo = require('./models/Todo');

app.use(bodyParser.json());

function validateTodo(req, res, next) {
  const todo = req.body.todo;
  if (
    typeof todo !== 'object' ||
    typeof todo.text !== 'string' ||
    typeof todo.done !== 'boolean'
  ) {
    return res.status(400).json({
      error: 'request must contain todo object with text and done properties.'
    });
  }
  if (todo.text.trim().length < 2) {
    return res
      .status(400)
      .json({ error: 'todo must be more than 2 character.' });
  }
  next();
}

// POST /api/todo
// Add new todo
app.post('/api/todo', [
  validateTodo,
  function saveTodo(req, res, next) {
    new Todo(req.body.todo).save(function(err, savedTodo) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server internal error' });
      }
      return res.status(200).json(savedTodo);
    });
  }
]);

// PUT /api/todo/:id
// Update todo
app.put('/api/todo/:id', [
  validateTodo,
  function updateTodo(req, res, next) {
    todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, req.body.todo, function(err, savedTodo) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server internal error' });
      }
      return res.status(200).json(savedTodo);
    });
  }
]);

// DELETE /api/todo/:id
// Delete todo
app.delete('/api/todo/:id', function deleteTodo(req, res, next) {
  todoId = req.params.id;
  Todo.findByIdAndDelete(todoId, req.body.todo, function(err, deletedTodo) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server internal error' });
    }
    return res.status(200).json(deletedTodo);
  });
});

// GET /api/todos
// Get all todos
app.get('/api/todos', function getAllTodos(req, res, next) {
  Todo.find(null, function(err, allTodos) {
    if (err) {
      console.log(err);
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.status(200).json(allTodos);
  });
});

// GET /api/todo/<todoId>
// GET todo by id
app.get('/api/todo/:id', function getTodo(req, res, next) {
  todoId = req.params.id;
  Todo.findById(todoId, function(err, foundTodo) {
    if (err) {
      console.log(err);
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.status(200).json(foundTodo);
  });
});

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo database');
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(err => console.log('CATCH: db', err));
