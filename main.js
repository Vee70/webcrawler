const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
  if (process.argv.length != 3) {
    console.log('Invalid input.')
    process.exitCode = 1
    return
  }
  const baseURL = process.argv[2]
  const pages = await crawlPage(baseURL, baseURL, {})
  printReport(pages)
}

main()
