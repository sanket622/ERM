import { AccessTime, AttachMoney, CompareArrows, CreditCard, Person, TrendingUp } from '@mui/icons-material';
import { useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, CartesianGrid,
  ResponsiveContainer 
} from 'recharts';


// Data for the charts
const pieData = [
  { name: 'Voluntary Repayment', value: 75 },
  { name: 'Lien', value: 25 },
];

const delinquencyData = [
  { name: 'Method 1', rate: 80 },
  { name: 'Method 2', rate: 65 },
  { name: 'Method 3', rate: 50 },
  { name: 'Method 4', rate: 70 },
  { name: 'Method 5', rate: 45 },
  { name: 'Method 6', rate: 80 },
  { name: 'Method 7', rate: 60 },
];

const wellnessTrendData = [
  { time: '1', score: 82 },
  { time: '2', score: 78 },
  { time: '3', score: 74 },
  { time: '4', score: 60 },
  { time: '5', score: 65 },
  { time: '6', score: 68 },
  { time: '7', score: 75 },
  { time: '8', score: 80 },
  { time: '9', score: 77 },
  { time: '10', score: 79 },
];

const alertsData = [
  {
    id: 1,
    title: 'Employees with income fluctuations',
    description: 'Identified 10 employees with >5% income fluctuations',
    icon: <CompareArrows className="text-gray-500" />
  },
  {
    id: 2,
    title: 'Multiple EWA requests',
    description: 'Notified 5 employees with multiple EWA requests',
    icon: <AttachMoney className="text-orange-500" />
  },
  {
    id: 3,
    title: 'New joiners using EWA',
    description: '3 new joiners accessed EWA within 10 days',
    icon: <Person className="text-green-500" />
  },
  {
    id: 4,
    title: 'Employees nearing credit limit',
    description: '7 employees approaching credit limit',
    icon: <CreditCard className="text-red-500" />
  }
];

const COLORS = ['#FFE7E6', '#FF4D4F'];
const SCORE_COLORS = {
  good: '#4CAF50',
  average: '#FFC107',
  poor: '#FF5722'
};

export default function FinancialDashboard() {
  return (
    <div className="flex flex-col w-full p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Repayment Behavior & Delinquency Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">% of employees on lien vs voluntary repayment</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#6B7280"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-2">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-red-500 mr-1"></div>
                <span className="text-sm">Lien</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 mr-1"></div>
                <span className="text-sm">Voluntary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Delinquency by repayment method</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delinquencyData}>
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Delinquency Rate', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="rate" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Financial Wellness Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Financial Wellness Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessTrendData}>
                <XAxis dataKey="time" />
                <YAxis domain={[40, 100]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6B7280"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Wellness Score Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Financial Wellness Score</h2>
          <p className="text-sm text-gray-600 mb-6">Overall financial wellness score based on various criteria</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <AttachMoney className="mr-1" />
                <span className="text-sm">Regular income</span>
              </div>
              <div className="text-3xl font-bold">75</div>
              <span className="text-green-500 text-sm">+5</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <AccessTime className="mr-1" />
                <span className="text-sm">Timely repayment</span>
              </div>
              <div className="text-3xl font-bold">90</div>
              <span className="text-green-500 text-sm">+3</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <TrendingUp className="mr-1" />
                <span className="text-sm">Usage volatility</span>
              </div>
              <div className="text-3xl font-bold">60</div>
              <span className="text-red-500 text-sm">-2</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actionable Alerts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Actionable Alerts</h2>
        <p className="text-sm text-gray-600 mb-4">Alerts for potential issues requiring attention</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertsData.map(alert => (
            <div key={alert.id} className="flex bg-white p-4 rounded-lg shadow">
              <div className="bg-gray-100 p-3 rounded-lg mr-3">
                {alert.icon}
              </div>
              <div>
                <h3 className="font-semibold">{alert.title}</h3>
                <p className="text-sm text-gray-600">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}