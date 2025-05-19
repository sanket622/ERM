import React, { useState } from "react";

export default function EmployerProfile() {
  const [activeTab, setActiveTab] = useState(0);
  
  const sections = [
    {
      id: "business",
      title: "Business Details",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path><path d="M13 13h4"></path><path d="M13 17h4"></path><path d="M7 13h2"></path><path d="M7 17h2"></path></svg>,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard label="Company Name" value="Acme Technologies" />
          <InfoCard label="Industry" value="Software Development" />
          <InfoCard label="Founded" value="2012" />
          <InfoCard label="Website" value="www.acmetech.com" />
        </div>
      )
    },
    {
      id: "policies",
      title: "Company Policies",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M9 17h6"></path><path d="M9 13h6"></path></svg>,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PolicyCard 
            title="Flexible Working Hours" 
            description="Choose your own schedule to maximize productivity"
          />
          <PolicyCard 
            title="Hybrid Work Setup" 
            description="3 days office, 2 days remote"
          />
          <PolicyCard 
            title="Annual Leaves" 
            description="30 days paid time off per year"
          />
          <PolicyCard 
            title="Probation Period" 
            description="3 months initial assessment period"
          />
        </div>
      )
    },
    {
      id: "email",
      title: "Email Details",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
      content: (
        <div className="grid grid-cols-1 gap-4">
          <ContactCard 
            title="Primary Email" 
            email="admin@acmetech.com" 
            type="Administrative"
          />
          <ContactCard 
            title="Support Email" 
            email="support@acmetech.com" 
            type="Technical Support"
          />
          <ContactCard 
            title="HR Contact" 
            email="hr@acmetech.com" 
            type="Human Resources"
          />
        </div>
      )
    },
    {
      id: "location",
      title: "Work Location",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
      content: (
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Office Address</h3>
              <div className="mt-2 text-gray-600">
                <p className="text-lg">Acme Tech Park, Tower B</p>
                <p className="text-lg">12th Avenue, Silicon Valley, CA - 90210</p>
                <p className="text-lg">United States</p>
              </div>
              <button className="mt-4 flex items-center text-blue-600 font-medium">
                <span>View on map</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "contract",
      title: "Contract Details",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a9.7 9.7 0 0 0 7-3l-1.1-1.1a8 8 0 0 1-5.9 2.6 8 8 0 1 1 5.9-13.4L20 8.7A9.9 9.9 0 0 0 12 2a10 10 0 1 0 0 20Z"></path><path d="m9 12 2 2 8-8"></path></svg>,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard label="Type" value="Full-time" />
          <InfoCard label="Start Date" value="Jan 1, 2022" />
          <InfoCard label="Notice Period" value="1 Month" />
          <InfoCard label="Renewal" value="Auto-annual renewal" />
        </div>
      )
    },
    {
      id: "payment",
      title: "Payment Details",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard label="Bank" value="Wells Fargo" />
          <InfoCard label="Account Number" value="•••• 1234" />
          <InfoCard label="IFSC Code" value="WF00123" />
          <InfoCard label="Payment Cycle" value="Monthly" />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Employer Profile</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white p-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center space-x-4">
                <div className="bg-white p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className="text-white">
                  <h2 className="font-bold text-xl">Acme Tech</h2>
                  <p className="text-blue-100">Employer ID: ACM-2022</p>
                </div>
              </div>
              
              <nav className="p-4">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-xl text-left transition-all ${
                      activeTab === index
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={activeTab === index ? "text-blue-600" : "text-gray-400"}>
                      {section.icon}
                    </span>
                    <span className="font-medium">{section.title}</span>
                    {activeTab === index && (
                      <span className="ml-auto bg-blue-600 h-6 w-1 rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="text-blue-600 mr-3">{sections[activeTab].icon}</span>
                  {sections[activeTab].title}
                </h2>
                <div className="mt-1 h-1 w-12 bg-blue-600 rounded-full"></div>
              </div>
              
              <div className="mt-6">
                {sections[activeTab].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable components
function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function PolicyCard({ title, description }) {
  return (
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-blue-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-gray-600 pl-7">{description}</p>
    </div>
  );
}

function ContactCard({ title, email, type }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{type}</p>
          <p className="mt-1 text-blue-600 font-medium">{email}</p>
        </div>
        <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </button>
      </div>
    </div>
  );
}