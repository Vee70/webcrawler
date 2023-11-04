function normalizeURL(url) {
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`.replace(/(\/$)/, '')
}

module.exports = {
  normalizeURL
}