import React from "react";
import PropTypes, {array} from "prop-types";

// components
import Button from "../Elements/Button"
import {PATH_DASHBOARD} from "../../routes/paths";
import HeaderNav from "../HeaderNav/HeaderNav";

export default function PageHeader({
                                       title,
                                       description,
                                       button,
                                       color,
                                       gradient,
                                        links
                                   }) {
    const bgColors = {
        blueGray: "bg-blueGray-800",
        red: "bg-red-800",
        orange: "bg-orange-800",
        amber: "bg-amber-800",
        emerald: "bg-emerald-800",
        teal: "bg-teal-800",
        lightBlue: "bg-lightBlue-800",
        indigo: "bg-indigo-800",
        purple: "bg-purple-800",
        pink: "bg-pink-800",
        "blueGray-gradient": "bg-gradient-to-r from-blueGray-800 to-blueGray-900",
        "red-gradient": "bg-gradient-to-r from-red-800 to-red-900",
        "orange-gradient": "bg-gradient-to-r from-orange-800 to-orange-900",
        "amber-gradient": "bg-gradient-to-r from-amber-800 to-amber-900",
        "emerald-gradient": "bg-gradient-to-r from-emerald-800 to-emerald-900",
        "teal-gradient": "bg-gradient-to-r from-teal-800 to-teal-900",
        "lightBlue-gradient":
            "bg-gradient-to-r from-lightBlue-800 to-lightBlue-900",
        "indigo-gradient": "bg-gradient-to-r from-indigo-800 to-indigo-900",
        "purple-gradient": "bg-gradient-to-r from-purple-800 to-purple-900",
        "pink-gradient": "bg-gradient-to-r from-pink-800 to-pink-900",
    };
    let gradientText = gradient ? "-gradient" : "";
    return (
        <>
            <div
                className={"min-h-330-px z-10 w-full bg-cover bg-center-top pb-20 items-center flex text-white " + bgColors[color + gradientText]}
            >
                
                <div className="md:px-8 px-4 items-center flex w-full mx-auto">
                    <div className="flex flex-wrap -mx-4 w-full">
                        <div className="relative w-full px-4 md:w-10/12 lg:w-7/12">
                            <h1 className="font-semibold  text-5xl mb-4 mt-0">
                                {title}
                            </h1>
                            {links.length > 0 && <HeaderNav links={links}/>}
                            <p className="mt-0 mb-12">{description}</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PageHeader.defaultProps = {
    button: {},
    color: "blueGray",
    gradient: false,
    links: []
};

PageHeader.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    // props to pass to the Button component
    button: PropTypes.object,
    // whether the color should be a simple one, or a gradient one
    gradient: PropTypes.bool,
    color: PropTypes.oneOf([
        "blueGray",
        "red",
        "orange",
        "amber",
        "emerald",
        "teal",
        "lightBlue",
        "indigo",
        "purple",
        "pink",
    ]),
    links: array,
};
