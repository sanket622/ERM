import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployerHome = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await axios.get('http://64.227.166.238:8090/employer/UserProfileView', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status === 'success') {
          setUserData(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderProfileInfo = () => (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-lg p-8 mb-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Profile Information</h3>
      <p><strong className="font-semibold">Name:</strong> {userData.name}</p>
      <p><strong className="font-semibold">Email:</strong> {userData.email}</p>
      <p><strong className="font-semibold">Mobile:</strong> {userData.mobile}</p>
      <p><strong className="font-semibold">Is Partnership:</strong> {userData.is_partnership ? 'Yes' : 'No'}</p>
      <p><strong className="font-semibold">Is Deleted:</strong> {userData.is_deleted ? 'Yes' : 'No'}</p>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-indigo-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Details</h3>
      {userData.business_details.map((business, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Business Location:</strong> {business.business_location}</p>
          <p><strong className="font-semibold text-gray-700">Business Type:</strong> {business.business_type}</p>
          <p><strong className="font-semibold text-gray-700">State:</strong> {business.state}</p>
          <p><strong className="font-semibold text-gray-700">District:</strong> {business.district}</p>
          <p><strong className="font-semibold text-gray-700">Pincode:</strong> {business.pincode}</p>
          <p><strong className="font-semibold text-gray-700">GST Number:</strong> {business.gst_number}</p>
          <p><strong className="font-semibold text-gray-700">Established Date:</strong> {business.established_date}</p>
          <p><strong className="font-semibold text-gray-700">Total Employees:</strong> {business.total_employees}</p>
        </div>
      ))}
    </div>
  );

  const renderCompanyPolicies = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-green-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Company Policies</h3>
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

  const renderEmailDetails = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-pink-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Details</h3>
      {userData.email_details.map((email, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Email:</strong> {email.email}</p>
          <p><strong className="font-semibold text-gray-700">Email Type:</strong> {email.email_type}</p>
        </div>
      ))}
    </div>
  );

  const renderContractTypes = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-yellow-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Contract Types</h3>
      {userData.contract_types.map((contract, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Contract Type:</strong> {contract.contract_under}</p>
        </div>
      ))}
    </div>
  );

  const renderWorkLocations = () => (
    <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-l-8 border-teal-500 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Work Locations</h3>
      {userData.work_location.map((location, index) => (
        <div key={index} className="mb-6">
          <p><strong className="font-semibold text-gray-700">Location Name:</strong> {location.work_location_name}</p>
          <p><strong className="font-semibold text-gray-700">State:</strong> {location.state}</p>
          <p><strong className="font-semibold text-gray-700">District:</strong> {location.district}</p>
          <p><strong className="font-semibold text-gray-700">Total Employees:</strong> {location.total_employees}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen max-w-5xl">
      {userData ? (
        <div>
          {renderProfileInfo()}
          {renderBusinessDetails()}
          {renderCompanyPolicies()}
          {renderEmailDetails()}
          {renderContractTypes()}
          {renderWorkLocations()}
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default EmployerHome;
