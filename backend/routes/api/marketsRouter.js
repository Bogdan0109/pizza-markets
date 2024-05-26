const express = require('express')
const router = express.Router()
const { controllerWrapper } = require("../../middlewares")
const { marketsControllers: ctrl } = require("../../controllers")

router.get("/", controllerWrapper(ctrl.getAllMarkets));

module.exports = router
