import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EmployerHome = () => {
  const [userData, setUserData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSection, setDialogSection] = useState('');
  const [editData, setEditData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await axios.get('http://64.227.166.238:8090/employer/UserProfileView', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status === 'success') setUserData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Open the dialog for editing the section
  const openEditDialog = (section) => {
    if (userData[section] && userData[section].length > 0) {
      setDialogSection(section);
      setEditData([...userData[section]]);
      setDialogOpen(true);
    } else if (userData[section]) {
      setDialogSection(section);
      setEditData({ ...userData[section] });
      setDialogOpen(true);
    }
  };

  // Handle field changes in the dialog
  const handleFieldChange = (section, index, field, value) => {
    const updatedData = [...editData];
    if (index !== undefined) {
      updatedData[index] = { ...updatedData[index], [field]: value };
    } else {
      updatedData[field] = value;
    }
    setEditData(updatedData);
  };

  // Save the edited data
  const handleSave = () => {
    setUserData((prevData) => ({
      ...prevData,
      [dialogSection]: editData,
    }));
    setDialogOpen(false);
  };

  // Close the dialog
  const handleCloseDialog = () => setDialogOpen(false);

  // Render Profile Info Section
  const renderProfileInfo = () => (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-lg p-8 mb-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Profile Information</h3>
      <p><strong className="font-semibold">Name:</strong> {userData.name}</p>
      <p><strong className="font-semibold">Email:</strong> {userData.email}</p>
      <p><strong className="font-semibold">Mobile:</strong> {userData.mobile}</p>
      <p><strong className="font-semibold">Is Partnership:</strong> {userData.is_partnership ? 'Yes' : 'No'}</p>
      <p><strong className="font-semibold">Is Deleted:</strong> {userData.is_deleted ? 'Yes' : 'No'}</p>
      <div className="absolute top-2 right-2">
        <IconButton onClick={() => openEditDialog('profile')}>
          <EditIcon style={{ color: '#4CAF50' }} />
        </IconButton>
      </div>
    </div>
  );

  // Render Business Details Section
  const renderBusinessDetails = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-indigo-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Details</h3>
      {userData.business_details.map((business, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Business Location:</strong> {business.business_location}</p>
          <p><strong className="font-semibold text-gray-700">Business Type:</strong> {business.business_type}</p>
          <p><strong className="font-semibold text-gray-700">Business Description:</strong> {business.business_description}</p>
          <p><strong className="font-semibold text-gray-700">Established Date:</strong> {business.established_date}</p>
          <p><strong className="font-semibold text-gray-700">Registration Number:</strong> {business.registration_number}</p>
          <p><strong className="font-semibold text-gray-700">Total Employees:</strong> {business.total_employees}</p>
          <p><strong className="font-semibold text-gray-700">GST Number:</strong> {business.gst_number}</p>
          <p><strong className="font-semibold text-gray-700">Pincode:</strong> {business.pincode}</p>
          <p><strong className="font-semibold text-gray-700">Created At:</strong> {business.created_at}</p>
          <p><strong className="font-semibold text-gray-700">Updated At:</strong> {business.updated_at}</p>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <IconButton onClick={() => openEditDialog('business_details')}>
              <EditIcon style={{ color: '#4CAF50' }} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Email Details Section
  const renderEmailDetails = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-pink-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Details</h3>
      {userData.email_details.map((email, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Email:</strong> {email.email}</p>
          <p><strong className="font-semibold text-gray-700">Email Type:</strong> {email.email_type}</p>
          <p><strong className="font-semibold text-gray-700">Created At:</strong> {email.created_at}</p>
          <p><strong className="font-semibold text-gray-700">Updated At:</strong> {email.updated_at}</p>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <IconButton onClick={() => openEditDialog('email_details')}>
              <EditIcon style={{ color: '#4CAF50' }} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Work Locations Section
  const renderWorkLocations = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-teal-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Work Locations</h3>
      {userData.work_location.map((location, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Location Name:</strong> {location.work_location_name}</p>
          <p><strong className="font-semibold text-gray-700">State:</strong> {location.state}</p>
          <p><strong className="font-semibold text-gray-700">Country:</strong> {location.country}</p>
          <p><strong className="font-semibold text-gray-700">District:</strong> {location.district}</p>
          <p><strong className="font-semibold text-gray-700">Total Employees:</strong> {location.total_employees}</p>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <IconButton onClick={() => openEditDialog('work_location')}>
              <EditIcon style={{ color: '#4CAF50' }} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Company Policy Section
  const renderCompanyPolicy = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-yellow-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Company Policy</h3>
      {userData.company_policies.map((policy, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Notice Period Days:</strong> {policy.notice_period_days}</p>
          <p><strong className="font-semibold text-gray-700">Probation Period Days:</strong> {policy.probation_period_days}</p>
          <p><strong className="font-semibold text-gray-700">Total Annual Leaves:</strong> {policy.total_annual_leaves}</p>
          <p><strong className="font-semibold text-gray-700">Sick Leaves:</strong> {policy.sick_leaves}</p>
          <p><strong className="font-semibold text-gray-700">Casual Leaves:</strong> {policy.casual_leaves}</p>
          <p><strong className="font-semibold text-gray-700">Maternity Leaves:</strong> {policy.maternity_leaves}</p>
          <p><strong className="font-semibold text-gray-700">Working Hours Per Day:</strong> {policy.working_hours_per_day}</p>
        </div>
      ))}
    </div>
  );

  // Render Contract Types Section
  const renderContractTypes = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-purple-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Contract Types</h3>
      {userData.contract_types.map((contract, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Contract Under:</strong> {contract.contract_under}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen max-w-5xl">
      {userData ? (
        <>
          {renderProfileInfo()}
          {renderBusinessDetails()}
          {renderEmailDetails()}
          {renderWorkLocations()}
          {renderCompanyPolicy()}
          {renderContractTypes()}
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* Dialog for editing */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth='md' fullWidth>
        <DialogTitle className="bg-gradient-to-r from-teal-400 to-blue-600 text-white text-2xl font-bold py-6 px-8 rounded-t-lg shadow-2xl">
          Edit Information
        </DialogTitle>
        <DialogContent className="bg-white p-8 rounded-b-lg shadow-xl ">
          <div className="w-full">
            {editData && editData.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                {Object.keys(item).map((key) => (
                  <div key={key} className="mb-6">
                    <TextField
                      label={key.replace('_', ' ').toUpperCase()}
                      size='small'
                      fullWidth
                      value={item[key] || ''}
                      onChange={(e) => handleFieldChange(dialogSection, index, key, e.target.value)}
                      margin="normal"
                      className=" bg-gray-50 border-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      InputLabelProps={{ className: "text-gray-700 font-medium" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="bg-gray-100 px-8 py-6 rounded-b-lg flex justify-between">
          <Button
            onClick={handleCloseDialog}
            color="secondary"

          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default EmployerHome;
