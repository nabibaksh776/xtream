const nextConnect = require("next-connect")

const {getUserByEmail} = require("../../../backend/controllers/userController")

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.post(getUserByEmail)

export default router.handler();