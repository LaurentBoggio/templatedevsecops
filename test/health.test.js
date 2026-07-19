const http = require('http')
const { createServer } = require('../src/index')

const server = createServer()

server.listen(0)

describe('health probe', () => {
  afterAll(() => server.close())

  test('should return status ok', (done) => {
    const port = server.address().port
    http.get(`http://127.0.0.1:${port}/health`, (res) => {
      let data = ''

      expect(res.statusCode).toBe(200)
      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        expect(JSON.parse(data)).toEqual({ status: 'ok' })
        done()
      })
    })
  })
})
