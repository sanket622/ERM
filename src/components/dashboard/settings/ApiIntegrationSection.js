import React, { useState } from "react";

const apiList = [
  {
    name: "Create Disbursement",
    description: "Create a disbursement for a specific account and amount.",
    method: "POST",
    endpoint: "https://api.yourdomain.com/v1/disbursements",
    category: "Payments"
  },
  {
    name: "Get Payment Status",
    description: "Check the current status of a payment using its ID.",
    method: "GET",
    endpoint: "https://api.yourdomain.com/v1/payments/:id/status",
    category: "Payments"
  },
  {
    name: "Webhook Handler",
    description: "Receive webhook callbacks on payment updates or failures.",
    method: "POST",
    endpoint: "https://api.yourdomain.com/v1/webhooks",
    category: "Notifications"
  },
  {
    name: "List Transactions",
    description: "Retrieve a filtered list of all transaction entries.",
    method: "GET",
    endpoint: "https://api.yourdomain.com/v1/transactions",
    category: "Reporting"
  }
];

const ApiReferenceSectionModern = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedEndpoint, setCopiedEndpoint] = useState("");
  const categories = ["All", ...new Set(apiList.map(api => api.category))];
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(""), 2000);
  };

  const filteredApis = activeFilter === "All" 
    ? apiList 
    : apiList.filter(api => api.category === activeFilter);

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-blue-600 text-white";
      case "POST":
        return "bg-green-600 text-white";
      case "PUT":
        return "bg-amber-600 text-white";
      case "DELETE":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-6 bg-white">
      {/* Simple Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Integrate API's for solutions with these simple, powerful endpoints.
        </p>
        
        {/* Category Filter Tabs */}
        <div className="mt-10 border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`mr-8 py-4 px-1 text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* API Cards */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {filteredApis.map((api, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{api.name}</h3>
                <span className={`text-xs font-medium px-3 py-1 rounded-md ${getMethodColor(api.method)}`}>
                  {api.method}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{api.description}</p>
              
              {/* Endpoint Section */}
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg flex items-center justify-between mt-4">
                <code className="text-sm font-mono text-gray-800">{api.endpoint}</code>
                <button 
                  className="ml-4 p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  onClick={() => handleCopy(api.endpoint)}
                >
                  {copiedEndpoint === api.endpoint ? (
                    <span className="text-green-600 text-xs font-medium">Copied</span>
                  ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Action Links */}
              <div className="mt-6 flex items-center justify-end">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-200 mr-6">
                  Documentation
                </a>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-200">
                  Try it out
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Simple Footer CTA */}
      <div className="mt-16 text-center bg-gray-50 p-12 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Our API is designed to be easy to integrate. Get your API keys now and start building.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-200">
          Get API Keys
        </button>
      </div>
    </div>
  );
};

export default ApiReferenceSectionModern;