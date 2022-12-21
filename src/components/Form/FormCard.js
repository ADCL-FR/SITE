import React, {useEffect} from "react";
import Input from "../../components/Elements/Input.js";
import Select from 'react-select';

import PropTypes from "prop-types";

import Button from "../Elements/Button";
export default function FormCard({
    onSubmit,
    onChange,
    onSelect,
    onCheck,
    button,
    title,
    forms,

}) {
    const widths = {
        1: "lg:w-1/12",
        2: "lg:w-2/12",
        3: "lg:w-3/12",
        4: "lg:w-4/12",
        5: "lg:w-5/12",
        6: "lg:w-6/12",
        7: "lg:w-7/12",
        8: "lg:w-8/12",
        9: "lg:w-9/12",
        10: "lg:w-10/12",
        11: "lg:w-11/12",
        12: "lg:w-12/12",
    };


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <form onSubmit={onSubmit}>
                        <div className="container mx-auto px-4">
                            {
                                forms.map((section, key) => {
                                    return (
                                        <div key={key} >
                                            <h4 className="text-2xl font-semibold mt-4 mb-6">{section.title}</h4>
                                            <div className="flex flex-wrap -mx-4">


                                            {
                                                section.inputs.map( (input, key) => (

                                                        <div
                                                            key={key}
                                                            className={
                                                                "px-4 pb-2 relative w-full " + widths[input.width]
                                                            }
                                                        >       {input.input?.type !== "checkbox" && (
                                                                    <label className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1" id={input.select?.id}>
                                                                        {input.label}
                                                                    </label>
                                                                )}

                                                                {/*INPUT CLASSIQUE*/}
                                                                {input.input && input.input.type !== "checkbox" &&<Input {...input.input} onChange={(event) => onChange(event)} />}
                                                                {/*INPUT SELECT*/}
                                                                {input.select  && (
                                                                    <Select
                                                                        onChange={(value, type) => onSelect(value.value, input.select.id)}
                                                                        {...input.select}
                                                                        options={input.select.options}
                                                                    />
                                                                    /*<select onChange={(event) => onChange(event)} className="border rounded-lg " {...input.select}>
                                                                        {
                                                                            input.select.options.map((option, key) => (
                                                                                <option key={key} value={option.value} className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-500">{option.label}</option>
                                                                            ))
                                                                        }
                                                                    </select>*/
                                                                )}
                                                                {/*INPUT CHECKBOX*/}
                                                                {input.input && input.input.type === "checkbox" && (
                                                                    <div className="flex items-center mb-2 ml-1 ">
                                                                        <label className="inline-flex items-center cursor-pointer">
                                                                            <input {...input.input} onChange={(event) => onCheck(event)} className="mr-3"/>
                                                                            {input.label}
                                                                        </label>
                                                                    </div>
                                                                )}
                                                        </div>

                                                    )
                                                )
                                            }
                                        </div>
                                        </div>

                                    );
                                })
                            }

                        </div>
                        <div className="flex justify-end">
                            <Button {...button}/>
                        </div>

                    </form>
                </div>

            </div>
        </>
    );

}
FormCard.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    button: PropTypes.object,
    forms: PropTypes.array,
}
