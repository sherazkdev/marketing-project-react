import React from "react";
import Header from "../../shared/Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer";

const Client = () => {
    return (
        <div id="body-wrapper" className="w-full">
            {/* Header */}
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Client;