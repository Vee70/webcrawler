const { JSDOM } = require("jsdom");


function normalizeURL(url) {
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`.replace(/(\/$)/, '')
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody)
  const queryResults = dom.window.document.querySelectorAll('a')
  const urls = []
  for (const queryRes of queryResults) {
    if (queryRes.href[0] === '/') {
      try {
        const urlObj = new URL(queryRes.href, baseURL)
        urls.push(urlObj.href)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const urlObj = new URL(queryRes.href)
        urls.push(urlObj.href)
      } catch (err) {
        console.log(err)
      }
    }
  }
  return urls
}


module.exports = {
  normalizeURL,
  getURLsFromHTML
}