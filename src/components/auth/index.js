import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "./login";
import Register from "./register";

const Auth = () => {
    const [tabValue, setTabValue] = useState(0);
    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    };

    const handleTabChange = (event, tabValue) => {
        setTabValue(tabValue);
    };

    return (
        <div className="mainContainer">
            <div className="container card">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="Login tabs"
                >
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>

                {tabValue === 0 ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default Auth;
