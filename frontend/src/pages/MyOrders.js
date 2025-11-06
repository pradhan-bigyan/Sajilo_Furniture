import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common/index';
import OrderProductCard from '../components/orderCard';

const MyOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  
  const location = useLocation();
  const { result: seller } = location.state || {}; 
  const sellerName = seller.seller.name;
  const sellerLocation = seller.seller.address;
  const sellerEmail = seller.seller.email ;
  
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
      setAllOrders(dataResponse?.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderStatus.url}/${orderId}`, {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert('Order status updated successfully!');
        fetchAllOrders(); // Refresh the orders list
      } else {
        const errorData = await response.json();
        alert(`Failed to update order status: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const completeOrder = async (orderId ) => {
    try {
      const response = await fetch(`${SummaryApi.completeOrder.url}/${orderId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sellerEmail, // Pass seller's email
        }),
    
      });

      if (response.ok) {
        alert('Order completed successfully!');
        fetchAllOrders(); // Refresh the orders list
      } else {
        const errorData = await response.json();
        alert(`Failed to complete order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  // Filter orders based on seller's name and location
  useEffect(() => {
    if (allOrders.length > 0) {
      const filtered = allOrders.filter(order => 
        order.products[0]?.seller === sellerName && 
        order.products[0]?.sellerLocation === sellerLocation
      );
      setFilteredOrders(filtered);
    }
  }, [allOrders, sellerName, sellerLocation]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">My Orders</h2>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-100px)] overflow-y-scroll">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index + 'myOrders'}>
              <OrderProductCard order={order} />
              
              {order.status === 'confirmed' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'shipped')}
                  className="bg-green-500 text-white py-1 px-4 rounded"
                >
                  Mark as Shipped
                </button>
              )}

              {order.status === 'shipped' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'out for delivery')}
                  className="bg-yellow-500 text-white py-1 px-4 rounded"
                >
                  Mark as Out for Delivery
                </button>
              )}

              {order.status === 'out for delivery' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'delivered')}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Mark as Delivered
                </button>
              )}

              {order.status === 'delivered' && (
                <button
                  onClick={() => completeOrder(order._id)}
                  className="bg-gray-500 text-white py-1 px-4 rounded"
                >
                  Complete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No orders available for this seller.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
