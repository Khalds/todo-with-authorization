const Todo = require("../models/Todo.model")
const jwt = require("jsonwebtoken")

module.exports.todoController = {
  postTodo: async (req, res) => {
    const { text } = req.body

    try {
      const todo = await Todo.create({
        user: req.user.id,
        text,
      })
      res.json(todo)
    } catch (e) {
      return res.status(401).json({ error: "Ошибка при запросе на сервер" })
    }
  },

  getAllTodo: async (req, res) => {
    try {
      const todo = await Todo.find({user: req.params.id})
  
        res.json(todo)
      
    } catch (e) {
      res.json({ error:e.message })
    }
  },

  removeTodoById: async (req, res) => {
    const { id } = req.params

    try {
      const todo = await Todo.findById(id)

      if (todo.user.toString() === req.user.id) {
        await todo.remove()

        return res.json("Todo was deleted")
      }

      return res.status(401).json({ error: "Нет прав на удаление!" })
    } catch (e) {
      res.json({ error: "Ошибка" + e.toString() })
    }
  },

  patchTodoById: async (req, res) => {
    const { id } = req.params
    const { completed } = req.body

    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        {
          completed: completed,
        },
        { new: true }
      )
      res.json(todo)
    } catch (e) {
      res.json({ error: "Ошибка" + e.toString() })
    }
  },
}
