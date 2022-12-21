/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import PropTypes from "prop-types";

// components
import DropdownButton from "../../components/Dropdowns/DropdownButton.js";
import Progress from "../../components/Elements/Progress.js";
import ImagesOverlap from "../../components/Images/ImagesOverlap.js";



export default function Table({ title, head, body, color, RowComponent }) {
    const cardColors = {
        white: "bg-white text-blueGray-700",
        light: "bg-blueGray-200 text-blueGray-700",
        blueGray: "bg-blueGray-900 text-white",
        red: "bg-red-900 text-white",
        orange: "bg-orange-900 text-white",
        amber: "bg-amber-900 text-white",
        emerald: "bg-emerald-900 text-white",
        teal: "bg-teal-900 text-white",
        lightBlue: "bg-lightBlue-900 text-white",
        indigo: "bg-indigo-900 text-white",
        purple: "bg-purple-900 text-white",
        pink: "bg-pink-900 text-white",
    };
    const headColors = {
        white: "bg-blueGray-100 text-blueGray-500 border-blueGray-200",
        light: "bg-blueGray-300 text-blueGray-700 border-blueGray-400",
        blueGray: "bg-blueGray-800 text-blueGray-300 border-blueGray-700",
        red: "bg-red-800 text-red-300 border-red-700",
        orange: "bg-orange-800 text-orange-300 border-orange-700",
        amber: "bg-amber-800 text-amber-300 border-amber-700",
        emerald: "bg-emerald-800 text-emerald-300 border-emerald-700",
        teal: "bg-teal-800 text-teal-300 border-teal-700",
        lightBlue: "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700",
        indigo: "bg-indigo-800 text-indigo-300 border-indigo-700",
        purple: "bg-purple-800 text-purple-300 border-purple-700",
        pink: "bg-pink-800 text-pink-300 border-pink-700",
    };
    const titleColors = {
        white: "text-blueGray-700",
        light: "text-blueGray-700",
        blueGray: "text-white",
        red: "text-white",
        orange: "text-white",
        amber: "text-white",
        emerald: "text-white",
        teal: "text-white",
        lightBlue: "text-white",
        indigo: "text-white",
        purple: "text-white",
        pink: "text-white",
    };
    const imageTextColors = {
        white: "text-blueGray-700",
        light: "text-blueGray-700",
        blueGray: "text-white",
        red: "text-white",
        orange: "text-white",
        amber: "text-white",
        emerald: "text-white",
        teal: "text-white",
        lightBlue: "text-white",
        indigo: "text-white",
        purple: "text-white",
        pink: "text-white",
    };
    const iconColors = {
        white: "text-white",
        blueGray: "text-blueGray-500",
        red: "text-red-500",
        orange: "text-orange-500",
        amber: "text-amber-500",
        emerald: "text-emerald-500",
        teal: "text-teal-500",
        lightBlue: "text-lightBlue-500",
        indigo: "text-indigo-500",
        purple: "text-purple-500",
        pink: "text-pink-500",
    };
    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg " +
                    cardColors[color]
                }
            >
                <div className="px-6 py-4 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h3 className={"font-bold text-lg " + titleColors[color]}>
                                {title}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            {head.map((prop, key) => (
                                <th
                                    key={key}
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left " +
                                        headColors[color]
                                    }
                                >
                                    {prop}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {body.map((prop, key) => (
                            <RowComponent key={key} row={prop}/>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

Table.defaultProps = {
    head: [],
    body: [],
    children: null,
    color: "white",
};

Table.propTypes = {
    title: PropTypes.string,
    head: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.oneOf([
        "white",
        "light",
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
    body: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                // simple string
                PropTypes.string,
                // bold text
                PropTypes.shape({
                    bold: PropTypes.string,
                }),
                // image and text
                PropTypes.shape({
                    image: PropTypes.string,
                    text: PropTypes.string,
                }),
                // round icon and text
                PropTypes.shape({
                    text: PropTypes.string,
                    color: PropTypes.oneOf([
                        "white",
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
                }),
                // arrow icon and text
                PropTypes.shape({
                    text: PropTypes.string,
                    arrow: PropTypes.oneOf(["up", "down"]),
                    color: PropTypes.oneOf([
                        "white",
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
                }),
                PropTypes.shape({
                    // props to pass to the ImagesOverlap component
                    images: PropTypes.object,
                }),
                PropTypes.shape({
                    text: PropTypes.string,
                    // props to pass to the Progress component
                    progress: PropTypes.object,
                }),
                PropTypes.shape({
                    // props to pass to the DropdownButton component
                    dropdown: PropTypes.object,
                }),
                // if you want to pass your own component
                // NOTE: your component might break this Card component
                PropTypes.node,
            ])
        )
    ),
    // this will appear at the bottom of the Table, for example,
    // you can use this to make a pagination component
    children: PropTypes.node,
};
