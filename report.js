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
  const sortedPages = sortPage(pages)
  console.log(sortedPages)
}

module.exports = {
  sortPage,
  printReport
}