
// export default BestSellers;
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';  
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from react-router-dom

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize useNavigate hook

    // Fetch best sellers from API using SummaryApi
    const fetchBestSellers = async () => {
        try {
            const response = await fetch(SummaryApi.bestSELLERS.url, {
                method: 'GET',
                credentials: 'include',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                setBestSellers(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Error fetching best sellers:", err);
            setError('Failed to fetch best sellers.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchBestSellers();  
    }, []);

    // Handle product click and navigate to search page
    const handleProductClick = (productName) => {
        const query = encodeURIComponent(productName);  // Encode product name for URL
        navigate(`/search?q=${query}`);  // Redirect to search page with the query
    };

    if (loading) return <div>Loading best sellers...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Best Selled items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bestSellers.map((product) => (
                    <div 
                        key={product._id} 
                        className="bg-white p-4 border rounded-lg shadow-md cursor-pointer" 
                        onClick={() => handleProductClick(product.productName)}  // Handle product click
                    >
                        <img 
                            src={product.imageUrl} 
                            alt={product.productName} 
                            className="w-full h-48 object-cover mb-4" 
                        />
                        <h3 className="text-xl font-semibold">{product.productName}</h3>
                        <p className="text-gray-500">Seller: {product.seller}</p>
                        <p className="text-lg font-semibold mt-2">Quantity Sold: {product.totalQuantitySold}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
