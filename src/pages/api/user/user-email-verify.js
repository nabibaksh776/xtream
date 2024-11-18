const nextConnect = require("next-connect")

const {userVerify} = require("../../../backend/controllers/userController")

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.post(userVerify)

export default router.handler();
