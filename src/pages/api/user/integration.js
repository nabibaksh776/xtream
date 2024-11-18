const nextConnect = require('next-connect')

const { checkIntegrationById } = require('../../../backend/controllers/userController')

import { createRouter } from 'next-connect'

const router = createRouter()

const handler = router.post(checkIntegrationById)

export default router.handler()
