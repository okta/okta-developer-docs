function updateResourceMarkdownStrings(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  file.bodyLines.forEach((line, index) => {
    if(line.includes('{:.')) {
      delete file.bodyLines[index]
    }

    if(line.includes('{% api_operation')) {
      file.bodyLines[index] = line.replace(/{% api_operation (get|post|delete|put) ([^ ]*) %}/gm, (match, method, url) => `<ApiOperation method="${method}" url="${url}" />`);
    }

    if(line.startsWith('{: #')) {
      delete file.bodyLines[index]
    }

    if(line.includes('{:target="_blank"}')) {
      file.bodyLines[index] = line.replace(/{:target="_blank"}/, '')
    }

  })

  return file

}

module.exports = updateResourceMarkdownStrings
