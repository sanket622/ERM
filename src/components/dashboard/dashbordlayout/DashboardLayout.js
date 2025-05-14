import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Navbar from '../../Navbar';
import MemberHome from '../members/MemberHome';
import MemberProfile from '../members/MemberProfile';
import DashboardHeader from './DashboardHeader';
import EmployerProfile from './EmployerProfile';
import EmployerHome from '../employerprofile/EmployerHome';
import UserManagement from '../usermanagement/UserManagement';
import AddAccess from '../usermanagement/AddAccess';
import Employees from '../employees/Employees';
import AddEmployees from '../employees/AddEmployees';
import EmployeeDetailsCard from '../employees/EmployeeDetailsCard';
import women from '../../../assets/unsplash_rDEOVtE7vOs.png';
import axios from 'axios';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrentPayroll from '../payroll/currentpayroll/CurrentPayroll';
import HistoricalPayroll from '../payroll/historicaldata/HistoricalPayroll';
import BasePayroll from '../payroll/basedata/BasePayroll';


const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [profileImage, setProfileImage] = useState(women);
  const [loading, setLoading] = useState(true);
  const [payrollOpen, setPayrollOpen] = useState(false);

  const TABS = [
    { label: "Dashboard", path: 'home', icon: <DashboardIcon />, outlinedIcon: <DashboardOutlinedIcon />, component: <DashboardHeader /> },
    { label: "Employees", path: 'employees', icon: <GroupsIcon />, outlinedIcon: <GroupsOutlinedIcon />, component: <Employees /> }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('https://apis.agrisarathi.com/fposupplier/UserProfileView', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { data } = response;
          if (data?.data?.profile) {
            setUserName(data.data.profile.fpo_name);
            setProfileImage(data.data.profile.profile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [profileImage]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePayroll = () => setPayrollOpen(!payrollOpen);

  return (
    <div className="flex" style={{ height: "100vh" }}>
      <Navbar />
      <div
        style={{ height: 700, paddingBottom: 5, boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)' }}
        className={`bg-white text-black font-semibold text-[16px] pl-6 pt-6 w-[250px] min-h-full fixed top-0 left-0 bottom-0 z-0 transform transition-transform md:relative md:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <ul className="space-y-4 mt-24">
          {TABS.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <li
                key={item.path}
                onClick={() => navigate(`/${item.path}`)}
                className={`relative flex items-center px-5 py-3 cursor-pointer gap-3 transition-all ${isActive ? 'bg-gradient-to-r from-[#C3F9FF] to-white text-[#0000FF] font-medium rounded-xl' : 'hover:bg-gradient-to-r from-[#C3F9FF] to-white hover:text-black text-black rounded-xl'}`}
              >
                <span>{isActive ? item.icon : item.outlinedIcon}</span>
                <span>{item.label}</span>
              </li>
            );
          })}

          {/* Payroll Menu */}
          <li
            onClick={togglePayroll}
            className={`relative flex items-center px-5 py-3 cursor-pointer gap-3 transition-all ${location.pathname.includes('payroll') ? 'bg-gradient-to-r from-[#C3F9FF] to-white text-[#0000FF] font-medium rounded-xl' : 'hover:bg-gradient-to-r from-[#C3F9FF] to-white hover:text-black text-black rounded-xl'}`}
          >
            <span >{payrollOpen ? <CurrencyRupeeOutlinedIcon  /> : <CurrencyRupeeIcon  />}</span>
            <span className={location.pathname.includes('payroll') ? 'text-[#0000FF]' : 'text-black'}>Payroll</span>
            <span>{payrollOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
          </li>
          {payrollOpen && (
            <ul className="ml-10 space-y-4">
              <li
                className={`cursor-pointer flex items-center gap-2 ${location.pathname.includes('/payroll/current') ? 'text-[#0000FF] font-semibold' : 'text-black'}`}
                onClick={() => navigate('/payroll/current')}
              >
                <span className="text-xs">{location.pathname.includes('/payroll/current') ? '◆' : '◇'}</span> Current Payroll
              </li>
              <li
                className={`cursor-pointer flex items-center gap-2 ${location.pathname.includes('/payroll/historical') ? 'text-[#0000FF] font-semibold' : 'text-black'}`}
                onClick={() => navigate('/payroll/historical')}
              >
                <span className="text-xs">{location.pathname.includes('/payroll/historical') ? '◆' : '◇'}</span> Historical Data
              </li>
              <li
                className={`cursor-pointer flex items-center gap-2 ${location.pathname.includes('/payroll/base') ? 'text-[#0000FF] font-semibold' : 'text-black'}`}
                onClick={() => navigate('/payroll/base')}
              >
                <span className="text-xs">{location.pathname.includes('/payroll/base') ? '◆' : '◇'}</span> Base Data
              </li>
            </ul>
          )}

          {/* Report Button */}
          <li
            onClick={() => navigate('/reports')}
            className={`relative flex items-center px-5 py-3 cursor-pointer gap-3 transition-all ${location.pathname.includes('reports') ? 'bg-gradient-to-r from-[#C3F9FF] to-white text-[#0000FF] font-medium rounded-xl' : 'hover:bg-gradient-to-r from-[#C3F9FF] to-white hover:text-black text-black rounded-xl'}`}
          >
            <span>{location.pathname.includes('reports') ? <GroupsIcon /> : <GroupsOutlinedIcon />}</span>
            <span>Reports</span>
          </li>

          {/* Settings Button */}
          <li
            onClick={() => navigate('/settings')}
            className={`relative flex items-center px-5 py-3 cursor-pointer gap-3 transition-all ${location.pathname.includes('settings') ? 'bg-gradient-to-r from-[#C3F9FF] to-white text-[#0000FF] font-medium rounded-xl' : 'hover:bg-gradient-to-r from-[#C3F9FF] to-white hover:text-black text-black rounded-xl'}`}
          >
            <span>{location.pathname.includes('settings') ? <GroupsIcon /> : <GroupsOutlinedIcon />}</span>
            <span>Settings</span>
          </li>

        </ul>
      </div>

      <div className="flex-1 p-6 ml-0 md:ml-4 min-h-screen overflow-y-scroll">
        <div className="w-full relative">
          <div className="flex justify-end items-center">
            <button className="md:hidden mt-20 text-black" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="mt-14">
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
              <Route path="/payroll/current" element={<CurrentPayroll/>} />
              <Route path="/payroll/historical" element={<HistoricalPayroll/>} />
              <Route path="/payroll/base" element={<BasePayroll/>} />
              <Route path="/reports" element={<div>Reports</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;