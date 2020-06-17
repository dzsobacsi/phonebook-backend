const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
  {
    id: 1,
    name: "Peppa Pig",
    number: "123-456-789",
  },
  {
    id: 2,
    name: "Susy Sheep",
    number: "123-456-123",
  },
  {
    id: 3,
    name: "Danny Dog",
    number: "654-789-852",
  }
]

// =========== GET requests ===================

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  //console.log(req)
  const text1 = `<p>The phonebook has info for ${persons.length} people</p>`
  const now = new Date()
  const text2 = now.toString()
  res.send(text1.concat(text2))
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// =========== POST request ===================

app.post('/api/persons', (req, res) => {
  const person = req.body
  //console.log('Post request', person)

  if (!person.name || !person.number) {
    console.log('Error: Name or number is empty')
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if (persons.find(p => p.name === person.name)) {
    console.log('Error: Name must be unique')
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = Math.floor(Math.random() * 1000000)
  res.json(person)
  persons = persons.concat(person)
})

// =========== DELETE request ===================

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})
