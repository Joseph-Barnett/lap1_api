const express = require('express')
const cors = require('cors')

const fruits = require('./fruits')
const logger = require('./logger')

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(logger)


app.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'Are you reddy!' })
})

// http://localhost:3000/fruits
app.get('/fruits', (req, res) => {
  res.status(200).send(fruits)
})

// http://localhost:3000/fruits/1

app.get('/fruits/:id', (req, res) => {
  const idx = req.params.id - 1

  const fruit = fruits[idx]

  if (!fruit) {
    res.status(404).send({ error: `Fruit with id ${req.params.id} not found` })
  } else {
    res.status(200).send(fruit)
  }
})

// http://localhost:3000/fruits

app.post('/fruits', (req, res) => {
  const fruit = req.body
  const lastFruit = fruits[fruits.length - 1]

  const lastId = lastFruit ? lastFruit.id + 1 : 1
  fruit.id = lastId

  if (Object.keys(fruit).includes('name')) {
    fruits.push(fruit)
    res.status(201).send(fruit)
  } else {
    res.status(422).send({ error: 'you need a name to create a fruit' })
  }
  // res.status(201).send(fruit)

})

app.patch('/fruits/:id', (req, res) => {
  const idx = req.params.id + 1

  const fruit = fruits[idx]

  if (!fruit) {
    res.status(404).send({ error: 'cannot update missing fruit' })
  } else {
    res.status(200).send(fruit)
  }


})

module.exports = app
