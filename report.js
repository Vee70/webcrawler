function sortPage(pages) {
  const sortedPages = []
  for (const url in pages) {
    sortedPages.push([url, pages[url]])
  }
  sortedPages.sort((a, b) => b[1] - a[1])
  const sortedPagesObj = {}
  for (const [page, count] of sortedPages) {
    sortedPagesObj[page] = count
  }
  return sortedPagesObj
}

function printReport(pages) {
  console.log('\n*** Report ***')
  console.log('Start ==================================================\n')
  const sortedPages = sortPage(pages)
  for (const [url, count] of Object.entries(sortedPages)) {
    console.log(`  Found ${count} internal links to ${url}`)
  }
  console.log('\nEnd ====================================================')
}

module.exports = {
  sortPage,
  printReport
}