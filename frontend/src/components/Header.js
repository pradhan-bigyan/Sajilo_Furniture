// import React, { useContext, useState } from 'react'
// import Logo from './Logo'
// import { GrSearch } from "react-icons/gr";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify'
// import { setUserDetails } from '../store/userSlice';
// import ROLE from '../common/role';
// import Context from '../context';

// const Header = () => {
//   const user = useSelector(state => state?.user?.user)
//   const dispatch = useDispatch()
//   const [menuDisplay,setMenuDisplay] = useState(false)
//   const context = useContext(Context)
//   const navigate = useNavigate()
//   const searchInput = useLocation()
//   const URLSearch = new URLSearchParams(searchInput?.search)
//   const searchQuery = URLSearch.getAll("q")
//   const [search,setSearch] = useState(searchQuery)

//   const handleLogout = async() => {
//     const fetchData = await fetch(SummaryApi.logout_user.url,{
//       method : SummaryApi.logout_user.method,
//       credentials : 'include'
//     })

//     const data = await fetchData.json()

//     if(data.success){
//       toast.success(data.message)
//       dispatch(setUserDetails(null))
//       navigate("/")
//     }

//     if(data.error){
//       toast.error(data.message)
//     }

//   }

//   const handleSearch = (e)=>{
//     const { value } = e.target
//     setSearch(value)

//     if(value){
//       navigate(`/search?q=${value}`)
//     }else{
//       navigate("/search")
//     }
//   }
//   return (
//     <header className='h-16 shadow-md bg-[#FFFFF0] fixed w-full z-40'>
//       <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
//             <div className=''>
//                 <Link to={"/"}>
//                     <Logo w={120} h={60}/>
//                 </Link>
//             </div>

//             <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-xl focus-within:shadow pl-2 'style={{ borderColor: '#2F4F4F' }}>
//                 <input type='text' placeholder='Search for Furnitures' className='w-full outline-none h-full px-2' onChange={handleSearch} value={search}/>
//                 <div className='text-lg min-w-[50px] h-8 bg-[#2F4F4F] flex items-center justify-center rounded-xl text-[#FFFFF0]'>
//                   <GrSearch />
//                 </div>
//             </div>


//             <div className='flex items-center gap-7'>
                
//                 <div className='relative flex justify-center'>

//                   {
//                     user?._id && (
//                       <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
//                         {
//                           user?.profilePic ? (
//                             <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
//                           ) : (
//                             <FaRegCircleUser/>
//                           )
//                         }
//                       </div>
//                     )
//                   }
                  
                  
              
//                 </div>

//                   {
//                      user?._id && (
//                       <Link to={"/cart"} className='text-2xl relative'>
//                           <span><FaShoppingCart/></span>
      
//                           <div className='bg-green-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
//                               <p className='text-sm'>{context?.cartProductCount}</p>
//                           </div>
//                       </Link>
//                       )
//                   }
              


//               <div>
//   {
//     user?._id ? (
//       <div className='flex gap-4'>
//         {
//           user?.role === ROLE.ADMIN ? (
//             <Link to={'/admin-panel/all-users'} className='px-4 py-1.5 rounded-xl text-white bg-green-600 hover:bg-green-700'>Admin Panel</Link>
//           ) : (
//             <Link to={'/become-seller'} className='px-4 py-1.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700'>Become a Seller</Link>
//           )
//         }
//         <button onClick={handleLogout} className='px-4 py-1.5 rounded-xl text-white bg-red-600 hover:bg-red-700'>Logout</button>
//       </div>
//     ) : (
//         <div className='flex gap-4'>
//             <Link to={'/login'} className='px-4 py-2 rounded-xl text-white bg-[#2F4F4F] hover:bg-[#223737]'>Login</Link>
//           <Link to={'/become-seller'} className='px-4 py-2 rounded-xl text-white bg-[#2F4F4F] hover:bg-[#223737]'>Become a Seller</Link>
//         </div>
//     )
//   }

// </div>

//             </div>

//       </div>
//     </header>
//   )
// }

// export default Header
import React, { useContext, useState, useEffect } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  // Fetch orders based on userId (using POST method)
  const fetchUserOrders = async () => {
    if (user?._id) {
      try {
        const response = await fetch(SummaryApi.getuserOrder.url, {
          method: 'POST', // Use POST method
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: user._id }) // Send userId in the request body
        });

        const dataApi = await response.json();

        if (dataApi.success) {
          setOrders(dataApi.data); // Store the orders in state
          if (dataApi.data.length > 0) {
            setShowNotification(true); // Show notification if there are orders
          }
        } else {
          // Handle error, if any
          toast.error(dataApi.message || "Failed to fetch orders.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching orders.");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserOrders();
    }
  }, [user]);

  return (
    <header className='h-16 shadow-md bg-[#FFFFF0] fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link to={"/"}>
                    <Logo w={120} h={60}/>
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-md border rounded-xl focus-within:shadow pl-2 'style={{ borderColor: '#2F4F4F' }}>
                <input type='text' placeholder='Search for Furnitures' className='w-full outline-none h-full px-2' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-[#2F4F4F] flex items-center justify-center rounded-xl text-[#FFFFF0]'>
                  <GrSearch />
                </div>
            </div>

            <div className='flex items-center gap-7'>
                <div className='relative flex justify-center'>
                  {user?._id && (
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                      {user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (
                        <FaRegCircleUser />
                      )}
                    </div>
                  )}
                </div>

                {user?._id && (
                  <Link to={"/cart"} className='text-2xl relative'>
                    <span><FaShoppingCart /></span>
                    <div className='bg-green-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>{context?.cartProductCount}</p>
                    </div>
                  </Link>
                )}

                {showNotification && (
                  <div className='relative'>
                    <div className='text-2xl cursor-pointer relative'>
                      <Link to="/notificationspage"   state={{ orders }}   className="relative text-2xl cursor-pointer"> 
                      <FaBell />
                      <div className='bg-green-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>{orders.length}</p> {/* Show count of orders */}
                      </div>
                      </Link>
                    </div>
                    {/* Notification Content */}
                   
                  </div>
                )}

                <div>
                  {user?._id ? (
                    <div className='flex gap-4'>
                      {user?.role === ROLE.ADMIN ? (
                        <Link to={'/admin-panel/all-users'} className='px-4 py-1.5 rounded-xl text-white bg-green-600 hover:bg-green-700'>Admin Panel</Link>
                      ) : (
                        <Link to={'/become-seller'} className='px-4 py-1.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700'>Become a Seller</Link>
                      )}
                      <button onClick={handleLogout} className='px-4 py-1.5 rounded-xl text-white bg-red-600 hover:bg-red-700'>Logout</button>
                    </div>
                  ) : (
                    <div className='flex gap-4'>
                        <Link to={'/login'} className='px-4 py-2 rounded-xl text-white bg-[#2F4F4F] hover:bg-[#223737]'>Login</Link>
                      <Link to={'/become-seller'} className='px-4 py-2 rounded-xl text-white bg-[#2F4F4F] hover:bg-[#223737]'>Become a Seller</Link>
                    </div>
                  )}
                </div>
            </div>
      </div>
    </header>
  );
};

export default Header;
