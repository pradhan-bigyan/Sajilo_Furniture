// import React from 'react';
// import { FaRegCheckCircle } from "react-icons/fa";
// import { MdCancel } from "react-icons/md";
// import displayNPRCurrency from '../helpers/displayCurrency';

// const OrderProductCard = ({ order }) => {
//     return (
//         <div className="bg-white p-4 rounded shadow-md mb-4">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b pb-2 mb-3">
//                 <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
//                 <div>
//                     {
//                         order.paymentStatus === 'successful' ? (
//                             <div className="text-green-600 flex items-center gap-1">
//                                 <FaRegCheckCircle />
//                                 <span>Paid</span>
//                             </div>
//                         ) : (
//                             <div className="text-red-600 flex items-center gap-1">
//                                 <MdCancel />
//                                 <span>Unpaid</span>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>

//             {/* Recipient Information */}
//             {order.deliveryAddress ? (
//                 <div className="mb-4">
//                     <h3 className="text-lg font-medium">Recipient Information</h3>
//                     <p className="text-sm text-gray-600">Name: {order.deliveryAddress.name}</p>
//                     <p className="text-sm text-gray-600">Phone: {order.deliveryAddress.phone}</p>
//                     <p className="text-sm text-gray-600">District: {order.deliveryAddress.district}</p>
//                     <p className="text-sm text-gray-600">Address: {order.deliveryAddress.address}</p>
//                     <p className="text-sm text-gray-600">Area: {order.deliveryAddress.area}</p>
//                 </div>
//             ) : (
//                 <div className="mb-4 text-red-600">
//                     <p>Recipient information is missing.</p>
//                 </div>
//             )}

//             {/* Product Details */}
//             {order.products.map((product, index) => (
//                 <div key={index} className="flex items-center gap-4 mb-4">
//                     {/* Product Image */}
//                     <div className="w-20 h-20">
//                         <img 
//                             src={product.imageUrl} 
//                             alt={product.productName} 
//                             className="w-full h-full object-cover rounded" 
//                         />
//                     </div>
//                     {/* Product Info */}
//                     <div className="flex-1">
//                         <h3 className="text-lg font-medium line-clamp-1">{product.productName}</h3>
//                         <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
//                         <p className="text-sm text-gray-600">Seller: {product.seller}</p>
//                         <p className="text-sm text-gray-600">Location: {product.sellerLocation}</p>
//                     </div>
//                     {/* Price */}
//                     <div className="text-right font-semibold">
//                         {displayNPRCurrency(product.price)}
//                     </div>
//                 </div>
//             ))}

//             {/* Total and Footer */}
//             <div className="border-t pt-2 flex justify-between items-center">
//                 <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                 <h4 className="text-lg font-bold">
//                     Total: {displayNPRCurrency(order.totalAmount)}
//                 </h4>
//             </div>
//         </div>
//     );
// };

// export default OrderProductCard;
import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import displayNPRCurrency from '../helpers/displayCurrency';

const OrderProductCard = ({ order }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                <div>
                    {
                        order.paymentStatus === 'successful' ? (
                            <div className="text-green-600 flex items-center gap-1">
                                <FaRegCheckCircle />
                                <span>Paid</span>
                            </div>
                        ) : (
                            <div className="text-red-600 flex items-center gap-1">
                                <MdCancel />
                                <span>Unpaid</span>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Recipient Information */}
            {order.deliveryAddress ? (
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Recipient Information</h3>
                    <p className="text-sm text-gray-600">Name: {order.deliveryAddress.name}</p>
                    <p className="text-sm text-gray-600">Phone: {order.deliveryAddress.phone}</p>
                    <p className="text-sm text-gray-600">District: {order.deliveryAddress.district}</p>
                    <p className="text-sm text-gray-600">Address: {order.deliveryAddress.address}</p>
                    <p className="text-sm text-gray-600">Area: {order.deliveryAddress.area}</p>
                </div>
            ) : (
                <div className="mb-4 text-red-600">
                    <p>Recipient information is missing.</p>
                </div>
            )}

            {/* Product Details */}
            {order.products.map((product, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20">
                        <img 
                            src={product.imageUrl} 
                            alt={product.productName} 
                            className="w-full h-full object-cover rounded" 
                        />
                    </div>
                    {/* Product Info */}
                    <div className="flex-1">
                        <h3 className="text-lg font-medium line-clamp-1">{product.productName}</h3>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        <p className="text-sm text-gray-600">Seller: {product.seller}</p>
                        <p className="text-sm text-gray-600">Location: {product.sellerLocation}</p>
                    </div>
                    {/* Price */}
                    <div className="text-right font-semibold">
                        {displayNPRCurrency(product.price)}
                    </div>
                </div>
            ))}

            {/* Order Status */}
            <div className="mb-4">
                <p className="text-lg font-medium">Status: {order.status}</p>
            </div>

            {/* Display Status History */}
            <div className="mb-4">
                <h4 className="text-md font-semibold">Status History:</h4>
                {order.statusHistory.length > 0 ? (
                    order.statusHistory.map((history, index) => (
                        <div key={index}>
                            <p>{history.status} on {new Date(history.updatedAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No status history available.</p>
                )}
            </div>

            {/* Total and Footer */}
            <div className="border-t pt-2 flex justify-between items-center">
                <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <h4 className="text-lg font-bold">
                    Total: {displayNPRCurrency(order.totalAmount)}
                </h4>
            </div>
        </div>
    );
};

export default OrderProductCard;
