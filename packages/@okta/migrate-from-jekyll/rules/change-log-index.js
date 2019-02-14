const {parseFile} = require("../utils/parseFile");

const fs = require('fs-extra')

function changeLogIndex(file) {
  if(!file.origPath.includes('change-log/index.md')) {
    return file
  }

  let fileData = fs.readFileSync('templates/changeLogIndex.md', 'utf8')

  return parseFile(fileData, file.origPath)

}

module.exports = changeLogIndex
