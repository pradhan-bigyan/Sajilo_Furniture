

// export default AllSellers;
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeSellerRole from '../components/ChangeSellerRole';  // Import ChangeSellerRole

const AllSellers = () => {
    const [allSellers, setAllSellers] = useState([]);
    const [pendingSellers, setPendingSellers] = useState([]);
    const [verifiedSellers, setVerifiedSellers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateSellerDetails, setUpdateSellerDetails] = useState({});
    const [selectedImage, setSelectedImage] = useState(""); // For image modal

    // Fetch all sellers from the API
    const fetchAllSellers = async () => {
        const fetchData = await fetch(SummaryApi.allSellers.url, {
            method: SummaryApi.allSellers.method,
            credentials: 'include'
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            const pending = dataResponse.data.filter(seller => seller.role === 'PENDING');
            const verified = dataResponse.data.filter(seller => seller.role === 'VERIFIED');
            setPendingSellers(pending);
            setVerifiedSellers(verified);
            setAllSellers(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllSellers();
    }, []);

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage("");
    };

    return (
        <div className="bg-white pb-4">
            <div className="mb-8">
                <h2 className="text-xl text-[#223737] font-semibold">Pending Sellers</h2>
                <table className="w-full userTable">
                    <thead>
                        <tr className="bg-[#2F4F4F] text-white">
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>District</th>
                            <th>Created Date</th>
                            <th>Citizenship</th>
                            <th>PAN Card</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingSellers.map((el, index) => (
                            <tr key={el._id}>
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.phoneNumber}</td>
                                <td>{el?.address}</td>
                                <td>{el?.district}</td>
                                <td>{moment(el?.createdAt).format("LL")}</td>
                                <td>
                                    {el?.citizenshipCertificate ? (
                                        <img
                                            src={el.citizenshipCertificate}
                                            alt="Citizenship"
                                            className="w-20 h-20 object-cover rounded cursor-pointer"
                                            onClick={() => openImageModal(el.citizenshipCertificate)}
                                        />
                                    ) : (
                                        "Not Uploaded"
                                    )}
                                </td>
                                <td>
                                    {el?.panPhoto ? (
                                        <img
                                            src={el.panPhoto}
                                            alt="PAN"
                                            className="w-20 h-20 object-cover rounded cursor-pointer"
                                            onClick={() => openImageModal(el.panPhoto)}
                                        />
                                    ) : (
                                        "Not Uploaded"
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-[#2F4F4F] hover:text-white"
                                        onClick={() => {
                                            setUpdateSellerDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-xl text-[#223737] font-semibold">Verified Sellers</h2>
                <table className="w-full userTable">
                    <thead>
                        <tr className="bg-[#2F4F4F] text-white">
                            <th>Sr.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>District</th>
                            <th>Created Date</th>
                            <th>Citizenship</th>
                            <th>PAN Card</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifiedSellers.map((el, index) => (
                            <tr key={el._id}>
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.phoneNumber}</td>
                                <td>{el?.address}</td>
                                <td>{el?.district}</td>
                                <td>{moment(el?.createdAt).format("LL")}</td>
                                <td>
                                    {el?.citizenshipCertificate ? (
                                        <img
                                            src={el.citizenshipCertificate}
                                            alt="Citizenship"
                                            className="w-20 h-20 object-cover rounded cursor-pointer"
                                            onClick={() => openImageModal(el.citizenshipCertificate)}
                                        />
                                    ) : (
                                        "Not Uploaded"
                                    )}
                                </td>
                                <td>
                                    {el?.panPhoto ? (
                                        <img
                                            src={el.panPhoto}
                                            alt="PAN"
                                            className="w-20 h-20 object-cover rounded cursor-pointer"
                                            onClick={() => openImageModal(el.panPhoto)}
                                        />
                                    ) : (
                                        "Not Uploaded"
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-[#2F4F4F] hover:text-white"
                                        onClick={() => {
                                            setUpdateSellerDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <ChangeSellerRole
                    onClose={() => setOpenUpdateRole(false)}
                    {...updateSellerDetails}
                    callFunc={fetchAllSellers}
                />
            )}

            {selectedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={closeImageModal}
                >
                    <img
                        src={selectedImage}
                        alt="Full Screen"
                        className="max-w-full max-h-full"
                    />
                </div>
            )}
        </div>
    );
};

export default AllSellers;
