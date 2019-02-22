function bookImages(file) {

  if(file.origPath.endsWith('.md') && file.origPath.includes('books/')) {
    let imgPath = file.origPath.split('/')
    imgPath.shift()
    imgPath.shift()
    imgPath.pop()

    file.bodyLines.forEach((line, index) => {

      // ./images/ => {bookPath (minus final folder)}/images/
      if (line.includes('src="./images/')) {
        line = line.replace('src="./images/', '/assets/img/books/')
      }

      file.bodyLines[index] = line
    });
  }

  return file

}
module.exports = bookImages
