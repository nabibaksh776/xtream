const formidable = require('formidable')

const parseForm = req => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true // if you expect multiple files
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      resolve({ fields, files })
    })
  })
}

module.exports = { parseForm }
