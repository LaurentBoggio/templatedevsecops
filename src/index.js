const http = require('http')

const PORT = process.env.PORT || 3000

const requestHandler = (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Template DevSecOps!')
}

const createServer = () => http.createServer(requestHandler)

if (require.main === module) {
  const server = createServer()
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

module.exports = {
  requestHandler,
  createServer,
  PORT
}
