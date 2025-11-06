import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeSellerRole = ({
    name,
    email,
    role,
    sellerId,  // Use sellerId instead of userId
    onClose,
    callFunc,
}) => {
    const [sellerRole, setSellerRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setSellerRole(e.target.value);
        console.log(e.target.value);
    };
    const updateSellerRole = async () => {
        console.log("Sending data to backend:", {
            email: email,  // Verify this email value
            role: sellerRole // Verify this role value
        });
    
        const fetchResponse = await fetch(SummaryApi.updateSeller.url, {
            method: SummaryApi.updateSeller.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,  // Ensure this is correctly sent
                role: sellerRole
            })
        });
    
        const responseData = await fetchResponse.json();
    
        // Log response from the backend for debugging
        console.log("Response from backend:", responseData);
    
        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        } else {
            toast.error(responseData.message || 'Failed to update role');
        }
    };
    
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change Seller Role</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role :</p>
                    <select className='border px-4 py-1' value={sellerRole} onChange={handleOnChangeSelect}>
                        <option value="PENDING">PENDING</option>
                        <option value="VERIFIED">VERIFIED</option>
                    </select>
                </div>

                <button 
                    className='w-fit mx-auto block py-1.5 px-4 rounded-xl bg-[#2F4F4F] text-white hover:bg-[#223737]' 
                    onClick={updateSellerRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeSellerRole;
