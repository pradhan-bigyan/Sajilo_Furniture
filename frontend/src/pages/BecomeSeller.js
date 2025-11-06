
// export default BecomeSeller;
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common/index"; // Ensure this contains the API endpoints
import { districts } from "../static/data"; // Import your static districts list
import uploadImage from "../helpers/uploadImage"; // Import your image upload helper

const BecomeSeller = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    district: "",
    password: "",
    citizenshipCertificate: "", // URL to be stored after upload
    panPhoto: "", // URL to be stored after upload
  });

  const [visible, setVisible] = useState(false);
  const [, setDistrictDropDown] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle district selection
  const handleDistrictSelect = (district) => {
    setData((prev) => ({ ...prev, district }));
    setDistrictDropDown(false);
  };

  // Handle image upload and store the Cloudinary URL in state
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadImage(file);
        setData((prev) => ({
          ...prev,
          [field]: uploadResponse.url, // Store Cloudinary URL
        }));
      } catch (error) {
        toast.error("Image upload failed, please try again.");
      }
    }
  };

  // Handle image deletion by clearing the state value
  const handleDeleteImage = (field) => {
    setData((prev) => ({
      ...prev,
      [field]: "", // Clear the URL from state
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.sellerSignUp.url, {
        method: SummaryApi.sellerSignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setData({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          district: "",
          password: "",
          citizenshipCertificate: "",
          panPhoto: "",
        });
        navigate("/shop-login");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to create shop. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Input Fields */}
            {[
              { label: "Shop Name", name: "name", type: "text" },
              { label: "Phone Number", name: "phoneNumber", type: "number" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Address", name: "address", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={data[name]}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}

            {/* District Dropdown */}
            <div>
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
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Citizenship Certificate */}
            <div>
              <label htmlFor="citizenshipCertificate" className="block text-sm font-medium text-gray-700">
                Upload Citizenship Certificate
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "citizenshipCertificate")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              {/* Show image preview and delete button */}
              {data.citizenshipCertificate && (
                <div className="mt-2">
                  <img
                    src={data.citizenshipCertificate}
                    alt="Citizenship Certificate Preview"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage("citizenshipCertificate")}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>

            {/* Upload PAN Card Photo */}
            <div>
              <label htmlFor="panPhoto" className="block text-sm font-medium text-gray-700">
                Upload PAN Card Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "panPhoto")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              {/* Show image preview and delete button */}
              {data.panPhoto && (
                <div className="mt-2">
                  <img
                    src={data.panPhoto}
                    alt="PAN Card Preview"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage("panPhoto")}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-bold rounded-xl text-white bg-[#2F4F4F] hover:bg-[#223737]"
            >
              Submit
            </button>

            {/* Navigation to Login */}
            <div className="flex justify-between mt-4">
              <p>Already have an account?</p>
              <Link to="/shop-login" className="text-[#2F4F4F] font-bold underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
