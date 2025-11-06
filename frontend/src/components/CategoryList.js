// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import { Link } from 'react-router-dom';

// const CategoryList = () => {
//     const [categoryProduct, setCategoryProduct] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const categoryLoading = new Array(13).fill(null);

//     const fetchCategoryProduct = async () => {
//         setLoading(true);
//         const response = await fetch(SummaryApi.categoryProduct.url);
//         const dataResponse = await response.json();
//         setLoading(false);
//         setCategoryProduct(dataResponse.data);
//     };

//     useEffect(() => {
//         fetchCategoryProduct();
//     }, []);

//     return (
//         <div className='container mx-auto p-4 pt-5'>
//            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
//             {
//                 loading ? (
//                     categoryLoading.map((el, index) => {
//                         return (
//                             <div className='h-15 w-15 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     categoryProduct.map((product, index) => {
//                         return (
//                             <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
//                                 <div className='w-15 h-15 md:w-20 md:h-20 rounded-xl overflow-hidden p-4 bg-slate-300 flex items-center justify-center'>
//                                     <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
//                                 </div>
//                                 <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
//                             </Link>
//                         );
//                     })
//                 )
//             }
//            </div>
//         </div>
//     );
// };

// export default CategoryList;
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();  // Use useLocation to get the current URL
    const categoryLoading = new Array(13).fill(null);

    // Function to fetch products
    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // Extract the district from the URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const selectedDistrict = queryParams.get('district'); // Get the district from the URL

    // Filter products based on the selected district
    const filteredCategoryProducts = selectedDistrict
        ? categoryProduct.filter(product =>
            product?.district?.toLowerCase() === selectedDistrict.toLowerCase())
        : categoryProduct;

    return (
        <div className='container mx-auto p-4 pt-5'>
           <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                    categoryLoading.map((el, index) => (
                        <div className='h-15 w-15 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
                        </div>
                    ))
                ) : (
                    filteredCategoryProducts.map((product, index) => {
                        return (
                            <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-15 h-15 md:w-20 md:h-20 rounded-xl overflow-hidden p-4 bg-slate-300 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        );
                    })
                )
            }
           </div>
        </div>
    );
};

export default CategoryList;
