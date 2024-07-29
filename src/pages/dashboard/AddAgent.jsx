import React from 'react';
import {useContext, useEffect, useState } from 'react';
import api from "../../services/api.js";
import UserContext from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const AddAgent = () => {
    //const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        type: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        type: "",
        general: ""
    });

    const validate = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value) error = "Name is required";
                break;
            case "email":
                const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
                if (!value) error = "Email is required";
                else if (!emailPattern.test(value)) error = "Email is invalid";
                break;
            case "password":
                if (!value) error = "Password is required";
                break;
            case "confirmPassword":
                if (!value) error = "Confirm Password is required";
                else if (value !== values.password) error = "Passwords do not match";
                break;
            case "type":
                if (!value) error = "Role is required";
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        const error = validate(name, value);
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleRegistration = async e => {
            e.preventDefault();
            const formErrors = Object.keys(values).reduce((acc, key) => {
                const error = validate(key, values[key]);
                if (error) acc[key] = error;
                return acc;
            }, {});

            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }

            
        try {
            // send to api
            const res = await api.post('/auth/registeragent', values);
        } catch (e) {
            const newError = (e.response.data.error);
            setErrors ({
                ...errors,
                general: e.response.data.error
            })
        } 
       
    };


    return (
        <div className="">
            <div className="w-full p-5 space-y-7 ">
                <div className="">
                    <h1 className="font-bold text-3xl text-center">Add an agent</h1>
                </div>
                {errors && <p className='text-red-500 pl-5'>{errors.general}</p>}
                <form onSubmit={handleRegistration} className='w-full p-5 space-y-7'>
                    <div>
                        <p>Name</p>
                        <input onChange={handleChange} name='name' type='text' placeholder="Name" className="border w-full py-4 px-9 rounded-lg" />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <p>E-mail</p>
                        <input onChange={handleChange} name='email' type='text' placeholder="Email" className="border w-full py-4 px-9 rounded-lg" />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <p>Password</p>
                        <input onChange={handleChange} name='password' type='password' placeholder="Password" className="border w-full py-4 px-9 rounded-lg" />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input onChange={handleChange} name='confirmPassword' type='password' placeholder="Confirm Password" className="border w-full py-4 px-9 rounded-lg" />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <p>Select role</p>
                        <select name='type' onChange={handleChange}className="border w-full py-4 px-9 rounded-lg">
                            <option>Roles</option>
                            <option value={'supers'}>Super admin</option>
                            <option value={'agents'}>Agent</option>
                        </select>
                        {errors.type && <p className="text-red-500">{errors.type}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button type='submit' className=" bg-primary p-4 flex justify-center rounded-lg text-bold text-white">
                            Add Agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAgent;