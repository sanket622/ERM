import React, { useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#4B5563",
        "&:hover": {
            backgroundColor: "rgba(107, 114, 128, 0.12)",
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#4B5563",
    },
    "& .MuiSwitch-track": {
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
    },
}));

const notificationsData = [
    {
        title: "Disbursement Requests",
        description: "Send notifications when new disbursement requests are submitted",
        key: "disbursementRequests",
        defaultChecked: true,
    },
    {
        title: "Delinquency Alerts",
        description: "Send alerts when accounts become delinquent",
        key: "delinquencyAlerts",
        defaultChecked: true,
    },
    {
        title: "Payment Confirmations",
        description: "Send confirmations when payments are processed",
        key: "paymentConfirmations",
        defaultChecked: false,
    },
    {
        title: "System Updates",
        description: "Send notifications about system updates and maintenance",
        key: "systemUpdates",
        defaultChecked: true,
    },
];

const NotificationSettings = () => {
    const [state, setState] = useState(() => {
        const initialState = {};
        notificationsData.forEach((item) => {
            initialState[item.key] = item.defaultChecked;
        });
        return initialState;
    });

    const handleToggle = (key) => {
        setState((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white p-4 rounded-md w-full px-10 space-y-3">
            {notificationsData.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-6 py-4 rounded-md"
                >
                    <div>
                        <div className="text-[15px] font-semibold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                    </div>
                    <CustomSwitch
                        checked={state[item.key]}
                        onChange={() => handleToggle(item.key)}
                    />
                </div>
            ))}
        </div>
    );
};

export default NotificationSettings;
