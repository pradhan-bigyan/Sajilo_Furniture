// export default SellerPanel
import React, { useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';

const SellerPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result: seller } = location.state || {}; // Access the seller data from state

  useEffect(() => {
    if (!seller || seller.seller.role !== 'VERIFIED') {
      navigate('/shop-login'); // Redirect to login if the user is not a seller
    }
  }, [seller, navigate]);

  if (!seller) {
    return <div>Loading...</div>; // Display loading state if seller data is not yet available
  }

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      {/* Sidebar Section */}
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-52 flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            
            {seller?.profilePic ? (
              <img src={seller.profilePic} className='w-20 h-20 rounded-full' alt={seller.seller.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
         
          <p className='capitalize text-lg font-semibold'>{seller.seller.name}</p>
          <p className='font-bold'>{seller.seller.email}</p>
          <p className='font-bold'>{seller.seller.address}</p>
          <p className='font-bold'>{seller.seller.district}</p>
          <p className='font-bold'>{seller.seller.phonenumber}</p>
        </div>

        {/* Navigation */}
        <div>
          <nav className='grid p-4'>
            <button
              className='px-2 py-1 hover:bg-slate-100 text-left'
              onClick={() => navigate('my-products', { state: { result: seller } })}
            >
              My Products
            </button>
            <button
              className='px-2 py-1 hover:bg-slate-100 text-left'
              onClick={() => navigate('my-orders', { state: { result: seller } })}
            >
              Order Management
            </button>
            <button
              className='px-2 py-1 hover:bg-slate-100 text-left'
              onClick={() => navigate('profile', { state: { result: seller } })}
            >
              Profile Settings
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className='w-full h-full p-2'>
        <Outlet /> {/* This will render the child components like 'My Products' */}
      </main>
    </div>
  );
};

export default SellerPanel;
