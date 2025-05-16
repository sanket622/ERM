import * as React from 'react';
import logo from '../assets/earnlogo.png';
import { useNavigate } from 'react-router-dom';
import img from '../assets/Vector (1).png';
import axios from 'axios';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import coin from '../assets/Coin (2).png';
import { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';


function Navbar() {
  
  const [language, setLanguage] = React.useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleClick = () => {
    setMenuOpen((prev) => !prev); 
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (setting) => {
    switch (setting) {
      case 'My Profile':
        navigate('/employerprofile');
        break;
      case 'User Management':
        navigate('/usermanagement');
        break;
      case 'My Requests':
        navigate('/myrequests');
        break;
      case 'Help Center':
        navigate('/helpcenter');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'Logout':
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login', { replace: true });
        break;
      default:
        break;
    }
    handleClose();
  };
  

  return (
    <div className="bg-white w-full shadow-md fixed" style={{ zIndex: 9 }}>
      <div className="flex justify-between items-center  w-full">
        <div className="flex items-center cursor-pointer" onClick={toggleLanguage}>
          <img
            src={logo}
            alt=""
            className="w-[135px] ml-4"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative mr-4">
            <IconButton>
              <NotificationsActiveOutlinedIcon className="h-8 w-8 text-black" />
              <span className="absolute top-0 right-0   bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                🔴
              </span>
            </IconButton>

          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <div
              className="flex items-center py-6 cursor-pointer"
              onClick={handleClick}
            >
              <PersonIcon />
              <ArrowDropDownIcon sx={{ mr: 8 }} />
            </div>

            {menuOpen && (
              <div className="absolute top-16 right-2 w-52 bg-white rounded-lg shadow-lg border z-50 mr-4">
                {/* Triangle Pointer */}
                <div className="absolute -top-2 right-12 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200 z-10"></div>

                {/* Menu Items */}
                <div
                  onClick={() => handleMenuItemClick('My Profile')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <PersonIcon className="text-gray-700" />
                  <span className="text-sm text-gray-800">My Profile</span>
                </div>
                <div className='px-4'>
                  <hr />
                </div>
                <div
                  onClick={() => handleMenuItemClick('User Management')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <ManageAccountsIcon className="text-gray-700 " />
                  <span className="text-sm text-gray-800">User Management</span>
                </div>
                <div className='px-4'>
                  <hr />
                </div>
                <div
                  onClick={() => handleMenuItemClick('My Requests')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <GroupsIcon className="text-gray-700" />
                  <span className="text-sm text-gray-800">My Requests</span>
                </div>
                <div className='px-4'>
                  <hr />
                </div>
                <div
                  onClick={() => handleMenuItemClick('Help Center')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <ContactPageIcon className="text-gray-700" />
                  <span className="text-sm text-gray-800">Help Center</span>
                </div>
                <div className='px-4'>
                  <hr />
                </div>
                
                <div
                  onClick={() => handleMenuItemClick('Settings')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <SettingsIcon className="text-gray-700" />
                  <span className="text-sm text-gray-800">Settings</span>
                </div>
                <div className='px-4'>
                  <hr />
                </div>
                <div
                  onClick={() => handleMenuItemClick('Logout')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <LogoutIcon className="text-gray-700" />
                  <span className="text-sm text-gray-800">Logout</span>
                </div>
               
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
