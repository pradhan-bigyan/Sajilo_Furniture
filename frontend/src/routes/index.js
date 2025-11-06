import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import BecomeSeller from '../pages/BecomeSeller'
import ShopLogin from '../pages/ShopLogin'
import PendingApproval from '../pages/pendingapproval'
import AllSellers from '../pages/sellerinfos'
import SellerPanel from '../pages/SellerPanel'
import MyProducts from '../pages/MyProducts'
import FAQPage from '../pages/FAQPage'
import ProductsPage from '../pages/ProductsPage'
import Allorders from '../pages/Allorders'
import MyOrders from '../pages/MyOrders'
import PaymentSuccess from '../pages/Paymentsuccesspage'
import DistrictProducts from '../components/districtproduct'
import BestSellers from '../pages/Bestselleditems'
import NotificationsPage from '../pages/notificationpage'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "become-seller",
                element : <BecomeSeller />
            },
            {
                path : "shop-login",
                element : <ShopLogin />
            },
            {
                path: "shop-dashboard",
                element: <SellerPanel />,
                children: [
                  {
                    path: "my-products",
                    element: <MyProducts />
                  },
                  {
                    path: "my-orders",
                    element: < MyOrders />
                  },
                //   {
                //     path: "profile",
                //     element: <ProfileSettings />
                //   },
                ]
              },
            {
                path : "pending-approval",
                element : <PendingApproval />
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "district-products",
                element : < DistrictProducts/>
            },
            {
                path : "product",
                element : <ProductsPage />
            },
            {
                path : "faq",
                element : <FAQPage/>
            },
            {
                path : "notificationspage",
                element : <NotificationsPage/>
            },
            {
                path : "best-selleditems",
                element : <BestSellers/>
            },
            {
                path : "payment-success",
                element : <PaymentSuccess/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "seller-infos",
                        element : <AllSellers/>
                    },
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <Allorders/>
                    }
                ]
            },
        ]
    }
])


export default router