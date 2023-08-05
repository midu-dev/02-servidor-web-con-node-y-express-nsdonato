const express = require('express')
const fs = require('fs')
const app = express()

function startServer() {
  const PORT = process.env.PORT || 1234

  app.use(express.json())
  app.use(express.static('./assets'))

  app.get('/', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
  })

  app.get('/logo.webp', (req, res) => {
    fs.readFile('./logo.webp', (err, data) => {
      if (err) {
        res.status(500).end('<h1>500 Internal Server Error</h1>')
      } else {
        res.sendFile('./logo.webp')
      }
    })
  })

  app.post('/contacto', (req, res) => {
    res.status(201).json(req.body)
  })

  // 🙋🏻‍♀️ Duda que me quedó y no encuentro respuesta 😅:
  // Si uso all, el test 2.4 rompe por el body de la respuesta
  // también el 2.6 porque responde 404 en vez de 405

  app.use('/', (req, res) => {
    if (req.method === 'GET') {
      if (req.url === '/' || req.url === '/404') {
        res.status(404).end('<h1>404</h1>')
      }
    } else {
      res.status(405).end()
    }
  })

  const server = app.listen(PORT, () => {
    console.log('server listening on port http://localhost:1234')
  })

  return server
}

// startServer()
module.exports = {
  startServer
}
