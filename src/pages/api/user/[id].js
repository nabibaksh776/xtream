const nextConnect = require("next-connect");

const { getUserById } = require("../../../backend/controllers/userController");

import { createRouter } from "next-connect";

const router = createRouter();

const handler = router.get(getUserById);

export default router.handler();
