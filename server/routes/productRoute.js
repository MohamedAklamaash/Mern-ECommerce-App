const {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductDetails,
  getDetailsOfSingleProduct,
} = require("../controllers/productController");

const express = require("express");
const { isUserAuthenticated, authorizedRoles } = require("../middleware/auth");
const { deleteProduct } = require("../controllers/adminStuff");
const router = express.Router();

router
  .route("/products")
  .post(isUserAuthenticated, authorizedRoles("admin"), createProduct)
  .get(getAllProducts)
  .get(getProductDetails);
router
  .route("/products/:id")
  .put(isUserAuthenticated, authorizedRoles("admin"), updateProduct)
  .delete(isUserAuthenticated, authorizedRoles("admin"), deleteProduct)
  .get(getDetailsOfSingleProduct);

module.exports = router;
