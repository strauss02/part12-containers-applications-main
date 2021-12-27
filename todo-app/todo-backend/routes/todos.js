const express = require('express')
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  let counter = await getAsync('counter')
  counter++
  setAsync('counter', counter)
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(405).send(req.todo) // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const response = await Todo.findByIdAndUpdate(req.todo.id, {
    text: req.body.text,
    done: req.body.done,
  })
  res.status(201).send(response) // Implement this
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
