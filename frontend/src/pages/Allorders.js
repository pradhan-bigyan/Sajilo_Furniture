import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/index';
import OrderProductCard from '../components/orderCard';

const Allorders = () => {
  const [allOrders, setAllOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const dataResponse = await response.json();

      console.log('Orders Data:', dataResponse);

      // Set fetched orders or default to an empty array
      setAllOrders(dataResponse?.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };
  const confirmOrder = async (orderId) => {
    try {
      const response = await fetch(`${SummaryApi.confirmOrder.url}/${orderId}`, {
        method: "post", // PUT method
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('Order confirmed successfully!');
        fetchAllOrders(); // Refresh the orders list
      } else {
        const errorData = await response.json();
        alert(`Failed to confirm order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Orders</h2>
      </div>

      {/* Orders Section */}
<div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-100px)] overflow-y-scroll">
  {allOrders.length > 0 ? (
    allOrders.map((order, index) => (
      <div key={index + 'allOrders'}>
        <OrderProductCard order={order} />
        
        {order.status === 'pending' && (
          <button
            onClick={() => confirmOrder(order._id)}
            className="bg-blue-500 text-white py-1 px-4 rounded"
          >
            Confirm Order
          </button>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center w-full">No orders available.</p>
  )}
</div>

    </div>
  );
};

export default Allorders;
