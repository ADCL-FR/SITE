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

        <>
            <Sidebar {...sidebar} />
            <main className="relative md:ml-64 h-full">
                <Outlet/>
            </main>
        </>

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
