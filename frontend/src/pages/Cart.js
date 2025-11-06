import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayNPRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import KhaltiCheckout from "khalti-checkout-web";
import { districts } from "../static/data"
import { useNavigate } from 'react-router-dom'; 
import {  useSelector } from 'react-redux';

const Cart = () => {
  const user = useSelector(state => state?.user?.user)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    area: "",
  });
  const navigate = useNavigate();
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const initiateKhaltiPayment = () => {
    const items = data.map(product => ({
        name: product?.productId?.productName,
        amount: product?.productId?.sellingPrice * product?.quantity * 100 // Convert to paise
    }));
    const userId = user?._id;

    const config = {
        publicKey: "test_public_key_dafa9deec1da4f28aa6bbf1ce8380543",
        productIdentity: "cart_product",
        productName: "Products from Cart",
        productUrl: window.location.origin,

        eventHandler: {
            onSuccess: async function (payload) {
                console.log("Payment Success", payload);

                // Store order details and redirect user to success page
                try {
                    const orderDetails = {
                      userId, 
                        products: data.map(product => ({
                            productId: product.productId._id,
                            productName: product.productId.productName,
                            quantity: product.quantity,
                            price: product.productId.sellingPrice,
                            imageUrl: product.productId.productImage[0],
                            seller: product.productId.sellerName,  // Assuming seller name is part of the product details
                            sellerLocation: product.productId.sellerLocation // Assuming seller location is part of the product details
                        })),
                        totalAmount: totalPrice,
                        paymentStatus: "successful",
                        paymentToken: payload.token,
                        paymentPidx: payload.pidx,
                        deliveryAddress: deliveryAddress,
                    };

                    // Send order details to backend
                    const response = await fetch(SummaryApi.saveOrder.url, {
                        method: SummaryApi.saveOrder.method,
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(orderDetails),
                    });

                    const responseData = await response.json();

                    if (responseData.success) {
                        console.log("Order saved successfully:", responseData.data);
                        alert("Payment Successful! Your order has been placed.");
                        setData([]); // Clear the cart
                        context.fetchUserAddToCart(); // Refresh cart data

                        // Redirect to the payment success page
                        navigate("/payment-success")
                    } else {
                        console.error("Failed to save the order:", responseData.message);
                        alert("Failed to place the order. Please try again.");
                    }
                } catch (error) {
                    console.error("Error saving the order:", error);
                    alert("An error occurred while processing the payment.");
                }
            },
            onError: function (error) {
                console.error("Payment Error", error);
            },
            onClose: function () {
                console.log("Payment Modal Closed");
            }
        }
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: totalPrice * 100 });  // Amount should be in paise (1 NPR = 100 paise)
};

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View products */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => (
                <div
                  key={el + "Add To Cart Loading" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayNPRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayNPRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm rounded-lg">
          {loading ? (
            <div className="h-full bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-full bg-white rounded-b-lg">
              <h2 className="text-white bg-[#2F4F4F] px-4 py-1 rounded-t-lg text-center font-semibold">Summary</h2>
              <div className="p-4 text-[#223737] font-medium space-y-2">
                <div className="flex justify-between items-center">
                  <p>Total Price</p>
                  <p>{displayNPRCurrency(totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Total Qty</p>
                  <p>{totalQty}</p>
                </div>

                {/* Delivery Address Form */}
                <div className="mt-4">
                  <h3 className="font-semibold">Recipient Information</h3>
                  <form>
  {["name", "phone"].map((field) => (
    <div key={field} className="mb-2">
      <label className="block text-sm font-medium">{field.toUpperCase()}</label>
      <input
        type="text"
        className="w-full p-1 border border-gray-300 rounded"
        value={deliveryAddress[field]}
        onChange={(e) =>
          setDeliveryAddress({
            ...deliveryAddress,
            [field]: e.target.value,
          })
        }
      />
    </div>
  ))}

  {/* District Dropdown */}
  <div className="mb-2">
    <label className="block text-sm font-medium">DISTRICT</label>
    <select
      name="district"
      value={deliveryAddress.district}
      onChange={(e) =>
        setDeliveryAddress({
          ...deliveryAddress,
          district: e.target.value,
        })
      }
      className="w-full p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      required
    >
      <option value="" disabled>
        Select District
      </option>
      {districts.map((district) => (
        <option key={district.id} value={district.name}>
          {district.name}
        </option>
      ))}
    </select>
  </div>

  {/* Address Input */}
  <div className="mb-2">
    <label className="block text-sm font-medium">ADDRESS</label>
    <input
      type="text"
      className="w-full p-1 border border-gray-300 rounded"
      value={deliveryAddress.address}
      onChange={(e) =>
        setDeliveryAddress({
          ...deliveryAddress,
          address: e.target.value,
        })
      }
    />
  </div>

  {/* Area Input */}
  <div className="mb-2">
    <label className="block text-sm font-medium">AREA</label>
    <input
      type="text"
      className="w-full p-1 border border-gray-300 rounded"
      value={deliveryAddress.area}
      onChange={(e) =>
        setDeliveryAddress({
          ...deliveryAddress,
          area: e.target.value,
        })
      }
    />
  </div>
</form>

                </div>

                <button
                  className="px-6 py-2 rounded-2xl bg-[#2F4F4F] text-white w-full"
                  onClick={initiateKhaltiPayment}
                >
                  Pay with Khalti
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

