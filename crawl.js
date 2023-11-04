const { JSDOM } = require("jsdom");


function normalizeURL(url) {
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`.replace(/(\/$)/, '')
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody)
  const baseUrlObj = new URL(baseURL)
  const queryResults = dom.window.document.querySelectorAll('a')
  const urls = []
  for (const url of queryResults) {
    const urlObj = new URL(url.href)
    if (baseUrlObj.host === urlObj.host) {
      urls.push(urlObj.href)
    }
  }
  return urls
}


module.exports = {
  normalizeURL,
  getURLsFromHTML
}