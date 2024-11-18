import { createRouter } from 'next-connect'
import formidable from 'formidable'
const { createUser } = require('../../../backend/controllers/userController')

// export const config = {
//   api: {
//     bodyParser: true // Disable Next.js default body parsing
//   }
// }
const nextConnect = require('next-connect')
const router = createRouter()

// Middleware to parse form data
// const parseForm = (req, res, next) => {
//   const form = formidable({ multiples: false })

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Form parsing failed' })
//     }
//     req.body = fields // Attach fields to req.body
//     req.files = files // Attach files to req.files
//     next() // Proceed to the next middleware or route handler
//   })
// }

// router.use(parseForm)
const handler = router.post(createUser)

export default router.handler()
