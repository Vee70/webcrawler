const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normlaize url', () => {
  const urlNormalized = 'blog.boot.dev/path'
  const urls = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path',
  ]
  urls.forEach((url) => expect(normalizeURL(url)).toBe(urlNormalized))
})

test('getURLsFromHTML base url', () => {
  const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
  const BaseURL = 'https://blog.boot.dev'
  const urls = ['https://blog.boot.dev/']
  expect(getURLsFromHTML(htmlBody, BaseURL)).toEqual(urls)
})

test('getURLsFromHTML abosulte path', () => {
  const htmlBody = '<html><body><a href="https://blog.boot.dev/path"><span>Go to Boot.dev</span></a></body></html>'
  const BaseURL = 'https://blog.boot.dev'
  const urls = ['https://blog.boot.dev/path']
  expect(getURLsFromHTML(htmlBody, BaseURL)).toEqual(urls)
})

test('getURLsFromHTML relative path', () => {
  const htmlBody = '<html><body><a href="/path1/path2"><span>Go to Boot.dev</span></a></body></html>'
  const BaseURL = 'https://blog.boot.dev'
  const urls = ['https://blog.boot.dev/path1/path2']
  expect(getURLsFromHTML(htmlBody, BaseURL)).toEqual(urls)
})

test('getURLsFromHTML multiple <a> tags', () => {
  const htmlBody = '<html><body><a href="/path1/path2"><span>Go to Boot.dev</span></a><a href="http://blog.boot.dev/about"><span>Go to Boot.dev</span></a></body></html>'
  const BaseURL = 'https://blog.boot.dev'
  const urls = ['https://blog.boot.dev/path1/path2', 'http://blog.boot.dev/about']
  expect(getURLsFromHTML(htmlBody, BaseURL)).toEqual(urls)
})