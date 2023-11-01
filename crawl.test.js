const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('normlaize url', () => {
  const url_normalized = 'blog.boot.dev/path'
  const urls = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path',
  ]
  urls.forEach((url) => expect(normalizeURL(url)).toBe(url_normalized))
})