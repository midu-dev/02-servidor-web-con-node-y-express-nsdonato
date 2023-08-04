const http = require('node:http')
const fs = require('node:fs')

function startServer () {
  const PORT = process.env.PORT ?? 1234

  const processRequest = (req, res) => {
    const { method, url } = req

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    switch (method) {
      case 'GET':
        if (url === '/') {
          res.end('<h1>¡Hola mundo!</h1>')
        } else if (url === '/logo.webp') {
          fs.readFile('./assets/logo.webp', (err, data) => {
            if (err) {
              res.statusCode = 500
              res.end('<h1>500 Internal Server Error</h1>')
            } else {
              res.setHeader('Content-Type', 'image/webp')
              res.end(data)
            }
          })
        } else {
          res.statusCode = 404
          res.end('<h1>404</h1>')
        }
        break
      case 'POST':
        if (url === '/contacto') {
          let body = ''

          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            })
            res.end(JSON.stringify(data))
          })
        } else {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.statusCode = 405
          res.end('405 Method Not Allowed')
        }
        break
    }
  }

  const server = http.createServer(processRequest)

  server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
