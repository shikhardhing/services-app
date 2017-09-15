import jimp from 'jimp'

exports.resizeImage = (input, output, callback) => {
  jimp.read(input, (error, img) => {
    if (error) {
      let err = new Error()
      err.statusCode = 400
      err.message = 'Broken image found'
      callback(err, null)
    } else {
      img.resize(50, 50)
      .write(output, (err) => {
        if (err) {
          callback(err, null)
        }
        callback(null, output)
      })
    }
  })
}
