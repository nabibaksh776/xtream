const nextConnect = require("next-connect")

const {userVerificationCode} = require("../../../backend/controllers/userController")

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.post(userVerificationCode)

export default router.handler();
