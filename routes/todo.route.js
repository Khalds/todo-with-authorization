const { Router } = require("express")
const { todoController } = require("../controllers/todo.controller")
const authMiddleware = require("../models/middleware/auth.middleware")

const router = Router()

router.get("/todo", todoController.getAllTodo)
router.post("/todo", authMiddleware, todoController.postTodo)
router.delete("/todo/:id", authMiddleware, todoController.removeTodoById)
router.patch("/todo/:id", authMiddleware, todoController.patchTodoById)

module.exports = router
