const express = require('express')
const router = express.Router()
const { controllerWrapper } = require("../../middlewares")
const { ordersControllers: ctrl } = require("../../controllers")

router.post("/", controllerWrapper(ctrl.addOrder));

module.exports = router
