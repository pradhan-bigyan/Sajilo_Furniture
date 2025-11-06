import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';  // Import Link to navigate to product detail page
import SummaryApi from '../common';  // Assuming SummaryApi is imported from a central file
import { SlLocationPin } from "react-icons/sl";
import { CiShop } from "react-icons/ci";

const DistrictProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const district = queryParams.get('district');  // Get district from URL query

  useEffect(() => {
    const fetchDistrictProducts = async () => {
      try {
        setLoading(true);
        console.log('District:', district);  // Log district value
        
        const response = await fetch(`${SummaryApi.productByDistrict.url}?district=${district}`, {
          method: 'GET',  // Use GET method
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products for this district, please login and refresh ");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError("Failed to load products for this district, please login and refresh");
      } finally {
        setLoading(false);
      }
    };

    if (district) {
      fetchDistrictProducts();
    }
  }, [district]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black-600">Products in {district}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={product.productImage[0]}
              alt={product.category}
              className="w-full h-56 object-cover mb-4"
            />
            <div className="px-4 py-3">
              <h2 className="text-xl font-semibold text-gray-800">{product.productName}</h2>
              <p className="text-sm text-gray-600 mt-1 text-transform: uppercase">{product.category}</p>
              <p className="text-sm text-gray-500 mt-1">
                <div className='flex gap-1'>
                <CiShop style={{ color: '#223737' }}/>{product.sellerName}
                </div>
                </p>
              <p className="text-sm text-gray-500 mt-1">
              <div className='flex gap-1'>
              <SlLocationPin style={{ color: '#223737' }}/>{product.sellerLocation}
                </div>
                
              </p>
              <p className="text-base text-gray-700 mt-3">{product.description}</p>
            </div>
            <div className="px-4 py-3 bg-gray-100 flex justify-between items-center">
              <Link to={`/product/${product._id}`} className="text-blue-500 font-semibold hover:underline">
                View Product
              </Link>
              <span className="text-gray-600 font-medium">NRs.{product.sellingPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictProducts;
