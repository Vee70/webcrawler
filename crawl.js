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

async function crawlPage(baseURL, currentURL, pages) {
  try {
    // 1. make sure that baseURL and currentURL have the same domain
    const baseUrlObj = new URL(baseURL)
    const currentUrlObj = new URL(currentURL)
    if (baseUrlObj.host !== currentUrlObj.host) {
      return pages
    }
    // 2. net a normalize version of the currentURL
    const currentUrlNormalized = normalizeURL(currentURL)
    // 3. check if the pages object has an entry for the normalized url
    if (pages[currentUrlNormalized] > 0) {
      pages[currentUrlNormalized] += 1
      return pages
    }
    // 4. add an entry to pages object
    if (currentURL !== baseURL) {
      pages[currentUrlNormalized] = 1
    } else {
      pages[currentUrlNormalized] = 0
    }
    // 5.make a request to th currentURL
    console.log(`current URL: ${currentURL}`)
    const response = await fetch(currentURL)
    const statusCode = response.status
    if (statusCode > 399 && statusCode < 500) {
      console.log('Client error')
      return pages
    } else if (statusCode > 499) {
      console.log('Server error')
      return pages
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')) {
      console.log('content-type is not text/html')
      return pages
    }
    const htmlText = await response.text()
    // 6. get urls from the response htmlText
    const urls = getURLsFromHTML(htmlText, baseURL)
    // 7. recursively crawl each url
    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages)
    }
    // 8. return pages object
    return pages
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}