import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayNPRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { FaTrashAlt } from "react-icons/fa";

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)
    const handleDeleteProduct = async () => {
      if (!window.confirm("Are you sure you want to delete this product?")) return;
  
      try {
          const response = await fetch(SummaryApi.deleteMYProduct.url, {
              method: SummaryApi.deleteMYProduct.method,
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: data._id }),
          });

          // Parse the response directly as JSON
          const responseData = await response.json();
  
          if (responseData.success) {
              toast.success(responseData.message);
              if (typeof fetchdata === 'function') {
                  fetchdata();
              }
          } else {
              toast.error(responseData.message);
          }
      } catch (err) {
          console.log(err);
          toast.error("Failed to delete product. Please try again later.");
      }
  };

  return (
    <div className='bg-white p-4 rounded '>
       <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayNPRCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='flex justify-end gap-2'>
                                        {/* Edit Button */}
                                        <div className='w-fit p-2 bg-green-200 hover:bg-[#2F4F4F] rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                                            <MdModeEditOutline />
                                        </div>
                                        
                                        {/* Delete Button */}
                                        <div className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={handleDeleteProduct}>
                                            <FaTrashAlt />
                                        </div>
                                    </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
    
    </div>
  )
}

export default AdminProductCard