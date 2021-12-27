const express = require('express')
const { getAsync } = require('../redis')
const router = express.Router()

router.get('/', async (req, res) => {
  const counter = await getAsync('counter')
  console.log(counter)
  res.send({ added_todos: counter })
})

module.exports = router
