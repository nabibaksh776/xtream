const nextConnect = require("next-connect")

const {loginUser} = require("../../../backend/controllers/userController")

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.post(loginUser)

export default router.handler();