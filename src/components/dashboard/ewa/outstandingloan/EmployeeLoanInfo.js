import React from 'react';
import { Person, Description } from '@mui/icons-material';

const EmployeeLoanInfo = () => {
  return (
    <>
   <div className="flex flex-col space-y-4 p-4 max-w-6xl">
      {/* Employee Information Card */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center bg-white p-4 border-b">
          <Person className="text-[#4B5563] mr-2" />
          <h2 className="text-[#4B5563] font-medium text-lg">Employee Information</h2>
        </div>
        
        <div className="grid grid-cols-2 p-4 gap-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Name</p>
              <p className="font-medium">Rishab Thakur</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Phone Number</p>
              <p className="font-medium">854618265</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Adhaar Number</p>
              <p className="font-medium">204735787</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">State</p>
              <p className="font-medium">New Delhi</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Pincode</p>
              <p className="font-medium">110002</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Department</p>
              <p className="font-medium">IT</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Employee ID</p>
              <p className="font-medium">16AA839</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Email ID</p>
              <p className="font-medium">Rishab123@gmail.com</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Address</p>
              <p className="font-medium">D-16, Near metro station, Saket</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">City</p>
              <p className="font-medium">Delhi</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Job Title</p>
              <p className="font-medium">Developer</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Work Location</p>
              <p className="font-medium">Gurgaon</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loan Information Card */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center bg-white p-4 border-b">
          <Description className="text-[#4B5563] mr-2" />
          <h2 className="text-[#4B5563] font-medium text-lg">Loan Information</h2>
        </div>
        
        <div className="grid grid-cols-2 p-4 gap-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Loan ID</p>
              <p className="font-medium">123456</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Loan Amount</p>
              <p className="font-medium">₹25000</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Payment Cycle</p>
              <p className="font-medium">Monthly</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Outstanding Balance</p>
              <p className="font-medium">₹5000</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Disbursement Date</p>
              <p className="font-medium">12/02/24</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Loan Status</p>
              <p className="bg-green-100 text-green-600 font-medium inline-block px-2 py-0.5 rounded text-sm">Approved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Disbursement ID</p>
              <p className="font-medium">DSB-LN0001-01</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Interest Rate</p>
              <p className="font-medium">1%</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Due Date for EMI</p>
              <p className="font-medium">15/06/24</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Product Variant ID</p>
              <p className="font-medium">123456</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Loan Type</p>
              <p className="font-medium">Disbursement</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Auto-repayment Method</p>
              <p className="font-medium">Lien</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeLoanInfo;
