const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated,authorizeRoles("admin"),getAllProducts);
router.route("/products/new").post(isAuthenticated, createProduct);
router.route("/products/:id").put(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProduct).get(getProductDetails);

module.exports = router;