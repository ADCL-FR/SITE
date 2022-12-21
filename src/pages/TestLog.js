// React
import React, { useState } from "react";

// components
import Page from './Page';
// sections
// ----------------------------------------------------------------------
//user
import {useAuthContext} from "../auth/useAuthContext";
import FormCard from "../components/Form/FormCard";
import {affaireForm} from "../constants/forms/forms";
import API from "../api/api";
export default function TestLog() {
    const { user } = useAuthContext();
    const [formData, setFormData]  = useState({});

    const handleChange = (event) => {
        console.log("event.target.id: ", event.target.id);
        console.log("event.target.value: ", event.target.value);
        setFormData({...formData, [event.target.id]: event.target.value});
    };
    const handleCheck = (event) => {
        console.log("event.target.id: ", event.target.id);
        console.log("event.target.checked: ", event.target.checked);
        setFormData({...formData, [event.target.id]: event.target.checked});
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await API.nouvelle_affaire(formData);
        console.log("response3 : ", response);


    }
    return (
        <Page title={user.username} >
            <h1>hello {user.username}</h1>
            <main>
                <div className="w-full lg:w-8/12">
                    <FormCard {...affaireForm} onSubmit={handleSubmit} onChange={handleChange} onCheck={handleCheck} />
                </div>
            </main>


        </Page>
    );

}