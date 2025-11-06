// export default MyProducts;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UploadMyProduct from '../components/uploadMyproduct'; 
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import SellerProductCard from '../components/SellerProductCard';

const MyProducts = () => {
  const location = useLocation();
  const { result: seller } = location.state || {}; // Extract seller details

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyProducts = async () => {
    if (!seller) return;

    setLoading(true);
    try {
      // Log the query parameters before making the API call
      console.log('Query Parameters:', {
        shopName: seller.seller.name,
        shopLocation: seller.seller.address,
      });

      // Call the backend API with seller's name and location
      const response = await fetch(
        `${SummaryApi.MYProduct.url}?shopName=${encodeURIComponent(seller.seller.name)}&shopLocation=${encodeURIComponent(seller.seller.address)}`
      );
      const dataResponse = await response.json();

      console.log('Backend Response:', dataResponse); // Log the backend response

      if (dataResponse.success) {
        setMyProducts(dataResponse.data || []);
      } else {
        console.error('Error:', dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [seller]);

  if (!seller) {
    return <p className="text-red-500">Seller information is missing.</p>;
  }
  

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">My Furniture Items</h2>
        <button
          className="border-2 border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#223737] hover:text-white transition-all py-1.5 px-4 rounded-xl"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Furniture Items
        </button>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading products...</p>
      ) : (
        <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
          {myProducts.length > 0 ? (
            myProducts.map((product, index) => (
              <SellerProductCard
                data={product}
                key={index + 'myProducts'}
                fetchdata={fetchMyProducts}
                seller={seller} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No products found.</p>
          )}
        </div>
      )}

      {openUploadProduct && (
        <UploadMyProduct
          onClose={() => setOpenUploadProduct(false)} // Close the modal
          fetchData={fetchMyProducts}
          seller={seller.seller} // Passing seller's name
          
        />
      )}
    </div>
  );
};

export default MyProducts;
