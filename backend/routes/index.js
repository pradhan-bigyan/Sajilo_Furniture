const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const allSellers = require('../controller/user/allsellers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const sellerSignUpController = require("../controller/user/sellerSignUp")
const sellerLoginController = require("../controller/user/sellerLogin")
const updateSeller = require('../controller/user/updateSeller')
const getMYProductsController = require('../controller/product/getMyProducts')
const UploadMYProductController = require('../controller/product/uploadmyproduct')
const processpayment = require('../controller/user/processpayment')
const updateMYProductController = require('../controller/product/updateMyProduct')
const DEleteProductController = require('../controller/product/deleteproduct')
const SAveOrder  = require('../controller/user/saveordercontroller')
const getORDERController = require('../controller/order/getorder')
const GetProductsByDistrict = require('../controller/product/getproductbydistrict');
const BestSellers = require('../controller/user/bestseller')
const getUSEROrderController = require('../controller/order/getuserorder')
const ADminConfirmOrderController = require('../controller/order/orderconfirmation')
const SEllerUpdateOrderStatusController = require('../controller/order/sellerupdateorderstatus')
const adminConfirmOrderController = require('../controller/order/orderconfirmation')
const sellerUpdateOrderStatusController = require('../controller/order/sellerupdateorderstatus')
const CmpleteOrderController = require('../controller/order/completeorder')





router.post("/signup",userSignUpController)
router.post("/seller-signup",sellerSignUpController)
router.post("/seller-Login",sellerLoginController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get('/seller-infos', authToken, allSellers); 
router.post("/update-seller",authToken,updateSeller);
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/process-payment",processpayment)
router.post("/upload-product",authToken,UploadProductController)
router.post("/upload-myproduct",UploadMYProductController)
router.get("/get-product",getProductController)
router.get("/get-order",getORDERController)
router.post("/get-userorder",getUSEROrderController)
router.get("/get-my-product",getMYProductsController)
router.post("/update-product",authToken,updateProductController)
router.post("/update-Myproduct",updateMYProductController)
router.delete("/delete-product",DEleteProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.get("/best-sellers",BestSellers)
router.post("/filter-product",filterProductController)
router.post("/save-order", SAveOrder)
router.get("/products-by-district", GetProductsByDistrict);
//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


//order
router.post("/confirm/:id", ADminConfirmOrderController );
router.post("/completeorder/:orderId", CmpleteOrderController );

router.post("/updatestatus/:id", SEllerUpdateOrderStatusController);



module.exports = router