import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Navbar from '../../Navbar';
import MemberHome from '../members/MemberHome';
import GroupsIcon from '@mui/icons-material/Groups';
import MemberProfile from '../members/MemberProfile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardHeader from './DashboardHeader';
import women from '../../../assets/unsplash_rDEOVtE7vOs.png'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmployerProfile from './EmployerProfile';
import EmployerHome from '../employerprofile/EmployerHome';
import UserManagement from '../usermanagement/UserManagement';
import AddAccess from '../usermanagement/AddAccess';
import Employees from '../employees/Employees';
import AddEmployees from '../employees/AddEmployees';
import EmployeeDetailsCard from '../employees/EmployeeDetailsCard';


const DashboardLayout = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [purchaseMenuOpen, setPurchaseMenuOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [profileImage, setProfileImage] = useState(women); // default image
  const [loading, setLoading] = useState(true);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (v) => {
    setSelectedTab(v);
    setSidebarOpen(false);
  };




  const TABS = [
    { label: "Dashboard", path: 'home', icon: <DashboardIcon />, outlinedIcon: <DashboardOutlinedIcon />, component: <DashboardHeader /> },
    { label: "Employees", path: 'employees', icon: <GroupsIcon />, outlinedIcon: <GroupsOutlinedIcon />, component: <Employees /> },
    // { label: "Employee", path: 'member', icon: <GroupsIcon />, outlinedIcon: <GroupsOutlinedIcon />, component: <MemberHome /> },
    // { label: "Employer Profile", path: 'employer', icon: <GroupsIcon />, outlinedIcon: <GroupsOutlinedIcon />, component: <EmployerHome /> },
    // { label: "Purchase", path: 'purchase', icon: <StorefrontIcon />, outlinedIcon: <StorefrontOutlinedIcon />, component: <PurchaseHome /> },
    // { label: "Inventory", path: 'inventory', icon: <InventoryIcon />, outlinedIcon: <Inventory2OutlinedIcon />, component: <InventoryHome /> },
    // { label: "Sales", path: 'sale', icon: <ShoppingCartIcon />, outlinedIcon: <ShoppingCartOutlinedIcon />, component: <Item /> },
    // { label: "Analytics", path: 'analytics', icon: <AnalyticsIcon />, outlinedIcon: <AnalyticsOutlinedIcon />, component: <AnalyticsHome /> },
    // { label: "Orders", path: 'orders', icon: <ShoppingBagIcon />, outlinedIcon: <ShoppingBagOutlinedIcon />, component: <OrdersHome /> },
    // { label: "Created orders", path: 'createdorder', icon: <ShoppingBasketIcon />, outlinedIcon: <ShoppingBasketOutlinedIcon />, component: <CreatedOrder /> },
    // { label: "Return", path: 'return', icon: <AssignmentReturnIcon />, outlinedIcon: <AssignmentReturnOutlinedIcon />, component: <Return /> },
  ];


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');  // Get token from localStorage
      if (token) {
        try {
          const response = await axios.get('https://apis.agrisarathi.com/fposupplier/UserProfileView', {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in Authorization header
            },
          });

          // Assuming the API response structure is as described
          const { data } = response;
          if (data && data.data && data.data.profile) {
            setUserName(data.data.profile.fpo_name); // Set the user's name
            setProfileImage(data.data.profile.profile); // Set the user's profile image URL
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [profileImage]);

  const location = useLocation();

  return (
    <>

      <div className="flex" style={{ height: "100vh" }}>
        <Navbar />
        <div
          style={{ height: 700, paddingBottom: 5, boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)' }}
          className={`bg-white  text-black font-semibold text-[16px] pl-6 pt-6  w-[250px] min-h-full fixed top-0 left-0 bottom-0 z-0 transform transition-transform md:relative md:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >

          {/* Menu */}
          <ul className="space-y-4 mt-24">
            {TABS.map((item) => {
              const isActive = location.pathname.includes(item.path);

              return (
                <li
                  key={item.path}
                  onClick={() => {
                    handleTabChange(item?.label);
                    navigate(`/${item?.path}`);
                  }}
                  className={`relative min-w-full flex items-center px-5 py-3 cursor-pointer transition-all gap-3
          ${isActive
                      ? "bg-gradient-to-r from-[#C3F9FF] to-white text-[#0000FF] font-medium rounded-xl"
                      : "hover:bg-gradient-to-r from-[#C3F9FF] to-white hover:text-black text-black rounded-xl"}`}
                >
                  <span className={`${isActive ? "text-[#0000FF]" : "text-black"}`}>
                    {isActive ? item.icon : item.outlinedIcon}
                  </span>
                  <span>{item?.label}</span>
                </li>
              );
            })}
          </ul>


        </div>

        <div className="flex-1 p-6 ml-0 md:ml-4 min-h-screen overflow-y-scroll" >

          <div style={{ width: "100%", position: 'relative' }}>
            <div className="flex justify-end items-center">
              <button
                className="md:hidden mt-20 text-black"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

            </div>
            <div className='mt-14'>
              <Routes>
                <Route path="/home" element={<DashboardHeader profileData={profileImage} />} />
                <Route path="/member" element={<MemberHome />} />
                <Route path="/memberdetail/:id" element={<MemberProfile />} />
                <Route path="/employer" element={<EmployerHome />} />
                <Route path="/employerprofile" element={<EmployerProfile />} />
                <Route path="/usermanagement" element={<UserManagement />} />
                <Route path="/addaccess" element={<AddAccess />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/addemployees" element={<AddEmployees />} />
                <Route path="/employeedetails" element={<EmployeeDetailsCard />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
