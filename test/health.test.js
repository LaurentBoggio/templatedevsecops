const http = require('http')
const assert = require('node:assert')
const { describe, after, test } = require('node:test')
const { createServer } = require('../src/index')

const server = createServer()

server.listen(0)

describe('health probe', () => {
  after(() => server.close())

  test('should return status ok', async () => {
    const port = server.address().port

    await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/health`, (res) => {
        let data = ''

        try {
          assert.strictEqual(res.statusCode, 200)
        } catch (err) {
          reject(err)
          return
        }

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          try {
            assert.deepStrictEqual(JSON.parse(data), { status: 'ok' })
            resolve()
          } catch (err) {
            reject(err)
          }
        })

        res.on('error', reject)
      }).on('error', reject)
    })
  })
})
