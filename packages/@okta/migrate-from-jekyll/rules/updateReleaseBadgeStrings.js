function updateReleaseBadgeStrings(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  file.bodyLines.forEach((line, index) => {
    if(line.includes('{% api_lifecycle')) {
      file.bodyLines[index] = line.replace(/{% api_lifecycle (beta|ea|deprecated) %}/gm, (match, access) => `<ApiLifecycle access="${access}" />`);
    }

  })

  return file

}

module.exports = updateReleaseBadgeStrings
