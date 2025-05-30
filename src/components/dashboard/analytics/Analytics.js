import React from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    CartesianGrid,
    Area,
} from "recharts";
import FinancialDashboard from "./Financial";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerAnalytics } from "../../../redux/analytics/analyticsSlice";
import { useEffect } from "react";

const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
    { name: "Aug", value: 4000 },
    { name: "Sep", value: 4500 },
    { name: "Oct", value: 5200 },
    { name: "Nov", value: 6000 },
    { name: "Dec", value: 7000 },
];


const pieChartData = [
    { name: "Mid/End Month", value: 35 },
    { name: "Repetitive Users", value: 20 },
    { name: "Segments", value: 45 },
];

const COLORS = ["#4F46E5", "#A5B4FC", "#E0E7FF"];

const SummaryCard = ({ title, value, change, changeColor = "text-green-600" }) => (
    <div className="border rounded-md p-4 shadow-sm bg-white">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold mt-1">{value}</h2>
        <p className={`text-sm mt-1 ${changeColor}`}>{change}</p>
    </div>
);

export default function Dashboard() {
    const dispatch = useDispatch();

    const {
        totalEmployees,
        totalEmployeesUsingEWA,
        avgIncome,
        avgEWAAmountDisbursed,
        employeesWithDeliquencies,
        loading,
    } = useSelector((state) => state.employerAnalytics);

    useEffect(() => {
        dispatch(fetchEmployerAnalytics());
    }, [dispatch]);
    return (
        <>
            <div className="p-6 space-y-6 min-h-screen">
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 bg-[#C3F9FF] text-black px-4 py-2 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m0 0l-6.75-6.75M12 19.5l6.75-6.75"
                            />
                        </svg>
                        Export Summary Report
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SummaryCard title="Total Active Employees" value={loading ? "Loading..." : totalEmployees} change="+15" />
                    <SummaryCard title="Employees Using EWA Services" value={loading ? "Loading..." : totalEmployeesUsingEWA} change="+10" />
                    <SummaryCard
                        title="Avg. Monthly Income (Last 3 Months)"
                        value={loading ? "Loading..." : `₹${avgIncome.toLocaleString()}`}
                        change="+₹42,000"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SummaryCard
                        title="Avg. EWA Amount Disbursed per Employee"
                        value={loading ? "Loading..." : `₹${avgEWAAmountDisbursed.toLocaleString()}`}
                        change="-₹1000"
                        changeColor="text-red-600"
                    />
                    <SummaryCard
                        title="Employees with Delinquencies"
                        value={loading ? "Loading..." : employeesWithDeliquencies}
                        change="+5"
                    />
                </div>

                <div className="bg-white border rounded-md shadow-sm p-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Revenue Trend</h3>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 text-xs rounded-full bg-indigo-600 text-white">Year</button>
                                <button className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Month</button>
                                <button className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Week</button>
                            </div>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={revenueData}
                                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-md shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">EWA Withdrawal Patterns</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={50}
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></span>
                                Withdrawal spikes around mid/end of month
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></span>
                                Flags for repetitive users with increasing reliance
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[2] }}></span>
                                Frequency of EWA usage by employee segments
                            </div>
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                View Insights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FinancialDashboard/>
        </>
    );
}