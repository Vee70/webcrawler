function normalizeURL(url) {
  return url.split('//')
            .at(1)
            .replace(/(\/$)/, '')
}

module.exports = {
  normalizeURL
}