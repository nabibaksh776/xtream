const nextConnect = require("next-connect")

const {userVerificationCodeResend} = require("../../../backend/controllers/userController")

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.post(userVerificationCodeResend)

export default router.handler();
