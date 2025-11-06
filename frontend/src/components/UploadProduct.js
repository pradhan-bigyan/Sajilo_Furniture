import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify';
import { districts } from "../static/data"; 

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [data,setData] = useState({
    productName : "",
    sellerName : "",
    sellerLocation : "",
    district: "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check the data being sent before the request
    console.log("Data being sent to API:", data);

    if (!data.sellerLocation || !data.productName || !data.price || !data.sellingPrice) {
        toast.error("Please fill in all required fields.");
        return; // Prevent form submission if required fields are missing
    }

    const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();

    // Check the response to see if there are any errors
    console.log("API Response:", responseData);

    if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchData();
    }

    if (responseData.error) {
        toast.error(responseData?.message);
    }
};

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center mt-20'>
       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Upload furniture items</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

          <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name :</label>
            <input 
              type='text' 
              id='productName' 
              placeholder='enter product name' 
              name='productName'
              value={data.productName} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />


            <label htmlFor='sellerName' className='mt-3'>seller Name :</label>
            <input 
              type='text' 
              id='sellerName' 
              placeholder='enter sellers name' 
              value={data.sellerName} 
              name='sellerName'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />
          <label htmlFor='sellerLocation' className='mt-3'>Seller Location :</label>
<input 
  type='text' 
  id='sellerLocation' 
  placeholder='Enter sellers location' 
  value={data.sellerLocation} 
  name='sellerLocation' // Corrected name to match the state key
  onChange={handleOnChange}
  className='p-2 bg-slate-100 border rounded'
  required
/>

  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
    District
  </label>
  <select
    name="district"
    value={data.district}
    onChange={handleInputChange}
    required
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  >
    <option value={" "} >
      Select District
    </option>
    {districts.map((district) => (
      <option key={district.id} value={district.name}>
        {district.name}
      </option>
    ))}
  </select>


              <label htmlFor='category' className='mt-3'>Category :</label>
              <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                  <option value={""}>Select Category</option>
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
              </select>

              <label htmlFor='productImage' className='mt-3'>Product Image :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label> 
              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='enter price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='enter selling price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>





              <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
          </form> 



      
       </div>



       {/***display image full screen */}
       {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
        

    </div>
  )
}

export default UploadProduct