import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/styles';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const url = categoryData 
          ? SummaryApi.categoryWiseProduct.url
          : SummaryApi.allProduct.url;
        
        const response = await fetch(url, {
          method: categoryData ? SummaryApi.categoryWiseProduct.method : SummaryApi.allProduct.method,
          body: categoryData ? JSON.stringify({ category: categoryData }) : null,
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const dataResponse = await response.json();
        console.log('Fetched Data:', dataResponse);

        if (dataResponse && dataResponse.data) {
          setData(dataResponse.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [categoryData]);

  return (
    <div>
      <div className={`${styles.section}`}>
        {/* Conditional rendering based on loading state */}
        {loading ? (
          <div className="text-center w-full pb-[100px] text-[20px]">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0 mt-2">
            {/* Render the VerticalCard component for each product */}
            {data.length > 0 ? (
              data.map((product, index) => (
                <VerticalCard
                  key={product._id}
                  loading={loading}
                  data={[product]}
                />
              ))
            ) : (
              <h1 className="text-center w-full pb-[100px] text-[20px]">No Products Found</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
