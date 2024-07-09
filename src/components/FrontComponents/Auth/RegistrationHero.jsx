import one from "../../../assets/images/Register.jpg"
import {useContext, useEffect, useState} from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext.js";

const RegistrationHero = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
            case "phone":
                if (!value) error = "Phone number is required";
                break;
            case "password":
                if (!value) error = "Password is required";
                break;
            case "confirmPassword":
                if (!value) error = "Confirm Password is required";
                else if (value !== values.password) error = "Passwords do not match";
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

        // send to api
        const res = await api.post('auth/register', values);

        if (res.status === 200) {
            setErrors(res.data);
            navigate('/secure');
        } else {
            console.log('There was an error')
        }
    }

    const authPage = () => {
        return user && location.pathname.split("/")[1] === 'auth'
    }

    useEffect(() => {
        if (authPage()) {
            navigate('/secure');
        }
    })

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between border rounded-lg m-10 gap-x-5">
            <div className="hidden w-full object-cover p-5 lg:flex items-center h-full ">
                <img className="w-full rounded-lg " src={one} alt="" />
            </div>
            <div className="w-full p-5 space-y-7 ">
                <div className="">
                    <h1 className="font-bold text-3xl text-center">Sign up</h1>
                    <p className="text-center">Join our family</p>
                </div>
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
                        <p>Phone number</p>
                        <input onChange={handleChange} name='phone' type='text' placeholder="Phone" className="border w-full py-4 px-9 rounded-lg" />
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
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
                    <div className="flex justify-center">
                        <button type='submit' className="w-1/3 bg-primary p-3 flex justify-center rounded-lg text-bold text-white">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationHero;
