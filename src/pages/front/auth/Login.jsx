import api from "../../../services/api";
import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../../../context/UserContext.js";

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState('');
    const location = useLocation();

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleLogin = async e => {
        e.preventDefault();
        // Validates user input
       if (!values.email || !values.password) {
           setErrors('All Fields are required');
       }

       try {
           const res = await api.post("/auth/login", values);
           if (res.status === 200) {
                setUser(res.data);
               navigate('/secure');
           } else {
               setErrors("There was an error logging in");
           }
       } catch (e) {
           setErrors("There was an unexpected error, try again later");
       }

    }

    const authPage = () => {
        console.log(user)
        return user && location.pathname.split("/")[1] === 'auth'
    }

    useEffect(() => {
        if (authPage()) {
            navigate('/secure');
        }
    })
    return (
        <section className={'py-9 container mx-auto'}>
            <div className={'md:flex bg-white shadow-lg gap-4 items-center rounded-lg border p-y'}>
                <div className={'overflow-hidden hidden md:block lg:block flex-1 h-full rounded-l-lg'}>
                    <img
                        className={'object-center object-cover'}
                        src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="photo"/>
                </div>

                <div className={'flex-1 pb-5'}>
                    <h1 className={'text-3xl text-center font-bold py-5 text-primary'}>Access Portal</h1>
                    <form onSubmit={handleLogin} className={'flex flex-col gap-4 px-5'}>
                        <input
                            onChange={handleChange}
                            name='email'
                            className={`w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none ${errors && 'border border-red-500'}`}
                            placeholder={'Enter Email'}
                            type="email"/>

                        <input
                            onChange={handleChange}
                            name='password'
                            className={`w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none ${errors && 'border border-red-500'}`}
                            placeholder={'Enter Password'}
                            type="password"/>

                        <button type='submit' className={'bg-primary py-5 font-bold text-white rounded-br-lg rounded-tl-lg'}>Access Portal</button>
                    </form>
                    <div className={'text-center pt-5 text-red-500'}>
                        { errors ? errors : null }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
