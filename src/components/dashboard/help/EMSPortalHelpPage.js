import React from 'react';

export default function EMSPortalHelpPage() {
  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-gray-700 text-lg mb-4 font-medium">
        We're here to help you get the most out of your EMS Portal.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white rounded shadow-sm p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-4">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            <div className="rounded-md bg-gray-50 mb-2 px-4 py-3">
              <p className="text-gray-700">How do I add a new employee?</p>
            </div>
            <div className="rounded-md bg-gray-50 mb-2 px-4 py-3">
              <p className="text-gray-700">How do I process payroll?</p>
            </div>
            <div className="rounded-md bg-gray-50 mb-2 px-4 py-3">
              <p className="text-gray-700">How to update employee benefits?</p>
            </div>
            <div className="rounded-md bg-gray-50 mb-2 px-4 py-3">
              <p className="text-gray-700">What to do if I forgot my password?</p>
            </div>
          </div>

          <div className="mt-6">
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
            >
              View All FAQs
            </button>
          </div>
        </div>

        {/* Tutorials Section */}
        <div className="bg-white rounded shadow-sm p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-4">
            Tutorials & Guides
          </h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">
                  Getting Started with EMS
                </p>
                <p className="text-sm text-gray-600">
                  Learn the basics of navigating the EMS portal
                </p>
                <p className="text-sm text-blue-500">
                  Watch now (5 min)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-red-500 rounded flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">
                  Employee Management
                </p>
                <p className="text-sm text-gray-600">
                  Learn how to add, edit, and manage employees
                </p>
                <p className="text-sm text-blue-500">
                  Watch now (8 min)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
            >
              Browse All Tutorials
            </button>
          </div>
        </div>

        {/* Help Desk Section */}
        <div className="bg-white rounded shadow-sm p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-2">
            Help Desk
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Submit a ticket for issues requiring assistance
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-50"
              />
            </div>

            <div className="mt-4">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded shadow-sm p-6">
          <h3 className="text-gray-800 text-lg font-medium mb-4">
            Contact Information
          </h3>

          <div className="space-y-3">
            <div className="flex">
              <p className="text-sm font-medium text-gray-700 w-36">
                Customer Support:
              </p>
              <p className="text-sm text-gray-800">
                support@emsportal.com
              </p>
            </div>

            <div className="flex">
              <p className="text-sm font-medium text-gray-700 w-36">
                Phone:
              </p>
              <p className="text-sm text-gray-800">
                1-800-EMS-HELP (1-800-367-4357)
              </p>
            </div>

            <div className="flex">
              <p className="text-sm font-medium text-gray-700 w-36">
                Hours:
              </p>
              <p className="text-sm text-gray-800">
                Monday - Friday, 8am - 6pm EST
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Start Live Chat Support
            </button>
          </div>

          <div className="mt-6">
            <p className="text-gray-800 font-medium mb-2">
              Latest Support Articles
            </p>
            <div className="space-y-1">
              <p className="text-sm text-blue-500">
                • New payroll tax updates for 2025
              </p>
              <p className="text-sm text-blue-500">
                • Employee onboarding checklist
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}