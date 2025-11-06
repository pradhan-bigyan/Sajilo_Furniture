import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Helper function to get the emoji based on status
const getStatusEmoji = (status) => {
  switch (status) {
    case 'pending':
      return '⏳'; // Hourglass for pending
    case 'confirmed':
      return '✅'; // Check mark for confirmed
    case 'shipped':
      return '📦'; // Package for shipped
    case 'out for delivery':
      return '🚚'; // Delivery truck for out for delivery
    case 'delivered':
      return '📬'; // Mailbox for delivered
    case 'cancelled':
      return '❌'; // Cross mark for cancelled
    default:
      return '❔'; // Question mark for unknown status
  }
};

// Helper function to format the timestamp into a readable time
const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

const NotificationsPage = () => {
  const location = useLocation();
  const [orders, setOrders] = useState(location.state?.orders || []);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Set the selected order to show in the popup
  };

  const handleClosePopup = () => {
    setSelectedOrder(null); // Close the popup
  };

  // Fetch orders function to simulate re-fetching
  const fetchOrders = () => {
    // Simulate fetching the latest orders (you can replace this with actual API call)
    setOrders(location.state?.orders || []); // Example of resetting orders from location state
  };

  // Set up an interval to refresh the data every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOrders(); // Fetch the latest orders every 60 seconds
    }, 60000); // 60000 milliseconds = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="border-b py-4">
              <div className="flex items-center gap-4">
                <img
                  src={order.products[0].imageUrl}
                  alt={order.products[0].productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p>
                    <strong>Your order for this item:</strong> {order.products[0].productName}{' '}
                    <span className="text-green-600 font-semibold">was successful</span>.
                  </p>
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-blue-600 underline"
                  >
                    To track your order, please click here.
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}

      {/* Popup for order tracking */}
      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Order Tracking</h2>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Product Name:</strong> {selectedOrder.products[0].productName}</p>
            <p><strong>Seller:</strong> {selectedOrder.products[0].seller}</p>
            <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress.address}, {selectedOrder.deliveryAddress.district}</p>

            {/* Displaying the current status and emoji */}
            <div>
              <p><strong>Status:</strong> {getStatusEmoji(selectedOrder.status)} {selectedOrder.status}</p>
            </div>

            {/* Display the status history with time */}
            <div className="mt-4">
              <h3 className="font-semibold">Status History</h3>
              <ul>
                {selectedOrder.statusHistory.map((history, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>{getStatusEmoji(history.status)} {history.status}</span>
                    <span className="text-sm text-gray-500">({formatDate(history.updatedAt)})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
