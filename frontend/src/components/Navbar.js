
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import SummaryApi from "../common";
import { districts } from "../static/data"; 
import { navItems } from "../static/data";

const Navbar = ({ active }) => {
  const [dropDown, setDropDown] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(""); 
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(SummaryApi.categoryProduct.url);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const dataResponse = await response.json();
        setCategoriesData(dataResponse.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesData([]);
      }
    };

    fetchCategories();
  }, []);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district); // Update selected district
    navigate(`/district-products?district=${district}`); // Redirect to DistrictProducts page
  };

  return (
    <div className="h-12 shadow-md bg-[#2F4F4F] fixed flex w-full z-40 top-16">
      <div className="container mx-auto flex items-center px-4 justify-start gap-16">
        {/* Categories Dropdown */}
        <div className="relative flex items-center">
          <div
            onClick={() => setDropDown((prev) => !prev)}
            className="relative h-[40px] w-[270px] flex items-center bg-white rounded-t-md shadow cursor-pointer"
          >
            <BiMenuAltLeft size={30} className="absolute left-3" />
            <button className="flex-grow text-left pl-12 text-lg font-semibold">
              All Categories
            </button>
            <IoIosArrowDown size={20} className="absolute right-3" />
          </div>

          {dropDown && categoriesData.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white shadow-lg rounded-md w-[270px] z-10 max-h-60 overflow-auto">
              {categoriesData.map((product) => (
                <li
                  key={product?.category}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <Link
                    to={"/product-category?category=" + product?.category}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <span className="capitalize">{product?.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* District Dropdown */}
        <div className="relative">
          <select
            name="district"
            value={selectedDistrict}
            onChange={(e) => handleDistrictSelect(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
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

        {/* Navigation Items */}
        <div className="flex gap-24 ml-4">
          {navItems &&
            navItems.map((i, index) => (
              <Link
                key={index}
                to={i.url}
                className={`${
                  active === index + 1
                    ? "text-[#17dd1f]"
                    : "text-white 800px:text-white"
                } font-bold`}
              >
                {i.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
