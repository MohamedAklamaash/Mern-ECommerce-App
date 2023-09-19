const express = require("express");
const router = express.Router();

const {checkout,payment} = require("../controllers/paymentController");

router.route("/checkout").post(checkout);

router.route("/paymentVerification").post(payment);

module.exports = router;