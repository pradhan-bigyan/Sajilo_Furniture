const backendDomin = "https://sajilotest.onrender.com"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    bestSELLERS : {
        url : `${backendDomin}/api/best-sellers`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    allSellers : {
        url : `${backendDomin}/api/seller-infos`,
        method : 'get'
    },
    updateSeller : {
        url : `${backendDomin}/api/update-seller`,
        method : "post"
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    uploadMYProduct : {
        url : `${backendDomin}/api/upload-myproduct`,
        method : 'post'
    },
    processPayment: {
        url: '${backendDomin}/api/process-payment', // Backend payment processing endpoint
        method: "POST",
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    deleteMYProduct: {
        url : `${backendDomin}/api/delete-product`,
        method : 'delete'
    },
    MYProduct : {
        url : `${backendDomin}/api/get-my-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    updateMYProduct : {
        url : `${backendDomin}/api/update-Myproduct`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    sellerSignUp: {
        url: `${backendDomin}/api/seller-signup`,
        method: 'post'
    },
    sellerLogin: {  
        url: `${backendDomin}/api/seller-Login`,
        method: "post",
      },
      saveOrder: {  
        url: `${backendDomin}/api/save-order`,
        method: "post",
      },
      getOrder: {  
        url: `${backendDomin}/api/get-order`,
        method: "get",
      },
      getuserOrder: {  
        url: `${backendDomin}/api/get-userorder`,
        method: "post",
      },
      productByDistrict: {  
        url: `${backendDomin}/api/products-by-district`,
        method: "post",
      },
      updateOrderStatus: {
        url: `${backendDomin}/api/updatestatus`,
        method: 'post',
      },
      confirmOrder: {
        url: `${backendDomin}/api/confirm`, 
        method: 'post',
      },
      completeOrder: {
        url: `${backendDomin}/api/completeorder`, 
        method: 'post',
      },
}


export default SummaryApi
