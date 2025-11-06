import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing navigation state and navigate

const PendingApproval = () => {
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const location = useLocation(); // Get location to access passed state
  const navigate = useNavigate(); // Get the navigate function
  const [email, setEmail] = useState(null); // For storing the email

  useEffect(() => {
    // Step 1: Check if result is passed through state
    const { result } = location.state || {};

    if (!result) {
      // If result is not passed, redirect to the login page or home page
      navigate('/'); // Or navigate('/') for home page
      return;
    }

    // Step 2: If result is available, set the email directly from result
    setEmail(result.seller.email); // Assuming result has a seller object with email
    setLoading(false);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div>
            {email ? (
              <div>
                <h1 className="text-2xl font-semibold mb-4">Dear {email},</h1>
                <p className="text-lg">
                  Please wait until the admin verifies you as a seller. You will
                  be notified once your account is approved.
                </p>
              </div>
            ) : (
              <p>Email not found. Please log in again.</p>
            )}
          </div>
        )}
        <button
          onClick={() => navigate('/')} // Navigate to home page when clicked
          className="mt-6 px-4 py-2 bg-[#2F4F4F] text-white rounded-md"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
