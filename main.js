const { crawlPage } = require('./crawl.js')

function main() {
  if (process.argv.length != 3) {
    console.log('Invalid input.')
    process.exitCode = 1
    return
  }
  const baseURL = process.argv[2]
  console.log(baseURL)
  crawlPage(baseURL)
}

main()



