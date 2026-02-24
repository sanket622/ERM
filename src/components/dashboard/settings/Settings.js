import React, { useState } from "react";
import { Tabs, Tab, Button, Box, } from "@mui/material";
import { Person } from "@mui/icons-material";
import TextFieldComponent from "../../subcompotents/TextFieldComponent";
import AutocompleteFieldComponent from "../../subcompotents/AutocompleteFieldComponent";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Activelog from "./Activelog";
import NotificationSettings from "./NotificationSettings";
import ApiIntegrationSection from "./ApiIntegrationSection";

const Settings = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    return (
        <>
            <div className="max-w-7xl mt-16">
                <p className="text-[24px] font-semibold">Settings</p>
                <div className="my-4">
                <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" textColor="inherit" indicatorColor="primary" className="border-b" sx={{ mb: 2, '& .MuiTab-root': { color: '#000' }, '& .Mui-selected': { color: '#4B5563' }, '& .MuiTabs-indicator': { backgroundColor: '#4B5563' } }} >

                        <Tab icon={<Person />} iconPosition="start" label="Activity Logs" />
                        <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notification Setting" />
                        <Tab icon={<IntegrationInstructionsIcon />} iconPosition="start" label="API Integration" />
                    </Tabs>

                    {tabIndex === 0 && (
                        <Activelog />
                    )}

                    {tabIndex === 1 && (
                        <NotificationSettings />
                    )}

                    {tabIndex === 2 && (
                        <ApiIntegrationSection />
                    )}
                </div>
            </div>
        </>
    );
};

export default Settings;
