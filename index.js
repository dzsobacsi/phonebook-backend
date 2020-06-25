require('dotenv').config()
const express = require('express')
const morgan = require('morgan')    // logs requests to the console
const cors = require('cors')
const app = express()
const Person = require('./models/person.js')  // it has mongoose inside
const PORT = process.env.PORT || 3001

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// =========== GET requests ===================

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>') // the express.static above overrites this and sends the build frontend instead
})

app.get('/info', (req, res) => {
  Person.find({}).then(person => {
    //console.log(person)
    const text1 = `<p>The phonebook contains the numbers of ${person.length} people</p>`
    const now = new Date()
    const text2 = now.toString()
    res.send(text1.concat(text2))
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    // res.json() is quite similar to res.send() but it converts the result
    // to json before sending
    // https://expressjs.com/en/api.html#res.json
    //person.sort((a, b) => a.name < b.name ? -1 : 1) // sorting may have a better place in the frontend
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// =========== POST request ===================

app.post('/api/persons', (req, res, next) => {
  const person = new Person({   // Person is a mongoose model exported by person.js
    name: req.body.name,
    number: req.body.number,
  })

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))
})

// ============== PUT request =================

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }

  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  Person.findByIdAndUpdate(req.params.id, person, options)
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

// =========== DELETE request ===================

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// ====== Error handling ==================

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }
  next(error)
}
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
