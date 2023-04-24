const express = require('express')
const logger = require('./middlewares/loggerMiddleware')
const cors = require('cors')

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
const app = express()
app.use(express.json())
app.use(cors())
// Midlewares son usados en cualquier solicitud http y se usan para controlar el cimportamiento de nuestra app

app.use(logger)

app.get('/api/notes', (request, response) => {
  response.status(200).json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  const notefound = notes.find((note) => note.id === id)

  if (notefound) {
    return response.status(200).json(notefound)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'notes is missing' })
  }

  const id = notes.map((note) => note.id)
  const MaxId = Math.max(...id)

  const newnote = {
    id: MaxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newnote)
  response.send(newnote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  const notedeleted = notes.filter((note) => note.id !== id)

  if (!notedeleted) {
    response.status(404).end('La nota no existe')
  } else {
    response.status(200).send(notedeleted)
  }
})

app.use((request, response) => {
  response.status(400).json({ error: 'Not found' })
})

const PUERTO = 3000
app.listen(PUERTO, () => {
  console.log('the aplication is running in port ', PUERTO)
})
