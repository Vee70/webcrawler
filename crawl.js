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

async function crawlPage(baseURL) {
  try {
    const response = await fetch(baseURL)
    const statusCode = response.status
    if (statusCode > 399 && statusCode < 500) {
      console.log('Client error')
      return
    } else if (statusCode > 499) {
      console.log('Server error')
      return
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')) {
      console.log('content-type is not text/html')
      return
    }
    const htmlText = await response.text()
    console.log(htmlText)
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}