import one from "../../../assets/images/Register.jpg"
import {useState} from "react";
import api from "../../../services/api";
import {useNavigate} from "react-router-dom";

const RegistrationHero = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleRegistration = async e => {
        e.preventDefault();
        // validation


        // send to api
        const res = await api.post('auth/register', values);

        if (res.status === 200) {
            navigate('/auth/login');
        } else {
            console.log('There was an error')
        }

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between border rounded-lg m-10 gap-x-5">
                <div className="hidden w-full object-cover p-5 lg:flex items-center h-full ">
                    <img className="w-full rounded-lg " src={one} alt=""/>
                </div>
                <div className="w-full p-5 space-y-7 ">
                    <div className="">
                        <h1 className="font-bold text-3xl text-center">Sign up</h1>
                        <p className="text-center">join our family</p>
                    </div>
                    <form onSubmit={handleRegistration} className={'w-full p-5 space-y-7'}>
                        <div>
                            <p>Name</p>
                            <input onChange={handleChange} name='name' type='text' placeholder="name"
                                   className="border w-full py-4 px-9 rounded-lg"/>
                        </div>
                        <div>
                            <p>E-mail</p>
                            <input onChange={handleChange} name='email' type='text' placeholder="email"
                                   className="border w-full py-4 px-9 rounded-lg"/>
                        </div>
                        <div>
                            <p>Phone number</p>
                            <input onChange={handleChange} name='phone' type='text' placeholder="phone" className="border w-full py-4 px-9 rounded-lg"/>
                        </div>
                        <div>
                            <p>Password</p>
                            <input onChange={handleChange} name='password' type='text' placeholder="password"
                                   className="border w-full py-4 px-9 rounded-lg"/>
                        </div>
                        <div>
                            <p>Confirm Password</p>
                            <input onChange={handleChange} name='confirmPassword' type='text' placeholder="password"
                                   className="border w-full py-4 px-9 rounded-lg"/>
                        </div>

                        <div className="flex justify-center">
                            <button type='submit'
                                    className="w-1/3 bg-primary p-3 flex justify-center rounded-lg text-bold text-white">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default RegistrationHero;