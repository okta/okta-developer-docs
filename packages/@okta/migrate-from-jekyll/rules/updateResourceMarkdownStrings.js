function updateResourceMarkdownStrings(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  if(!file.origPath.includes('docs/api/resources')) {
    return file
  }

  file.bodyLines.forEach((line, index) => {
    if(line.includes('{:.')) {
      delete file.bodyLines[index]
    }

    if(line.includes('{% api_operation')) {
      file.bodyLines[index] = line.replace(/{% api_operation (get|post|delete|put) ([^ ]*) %}/gm, (match, method, url) => `<ApiOperation method="${method}" url="${url}" />`);
    }

  })

  return file

}

module.exports = updateResourceMarkdownStrings
