const express = require("express");
const { newOrder, myOrders, getSingleOrder, getAllOrders, deleteOrder, orderUpdate } = require("../controllers/OrderControllers");
const { isUserAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/newOrder").post(isUserAuthenticated, newOrder);
router.route("/me/myOrders").get(isUserAuthenticated,myOrders);
router.route("/singleOrder/:id").get(isUserAuthenticated,authorizedRoles("admin"),getSingleOrder);
router.route("/getAllOrders").get(authorizedRoles("admin"),getAllOrders);
router.route("/deleteOrder/:id").post(isUserAuthenticated,deleteOrder);
router.route("/orderUpdate/:id").get(isUserAuthenticated,orderUpdate);
module.exports = router;