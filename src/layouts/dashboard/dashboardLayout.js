import React from "react";
import PropTypes from "prop-types";
// components
import Sidebar from "../../components/Sidebar/Sidebar"
import NavbarSearchUser from "../../components/Navbars/NavbarSearchUser.js";
import HeaderStatCards from "../../components/Headers/Admin/HeaderStatCards.js";
import FooterAdmin from "../../components/Footers/Admin/FooterAdmin.js";
import {Outlet} from "react-router";

export default function DashboardLayout({ sidebar, navbar, header, footer, children }) {


    return (

        <div className="h-full">
            <Sidebar {...sidebar} />
            <main className="w-full h-full bg-blueGray-100">
                <Outlet/>
            </main>  
        </div>

    );
}

DashboardLayout.defaultProps = {
    sidebar: {},
    navbar: {},
    header: {},
    footer: {},
};

DashboardLayout.propTypes = {
    // props to pass to the Sidebar component
    sidebar: PropTypes.object,
    // props to pass to the NavbarSearchUser component
    navbar: PropTypes.object,
    // props to pass to the HeaderStatCards component
    header: PropTypes.object,
    // props to pass to the FooterAdmin component
    footer: PropTypes.object,
};
