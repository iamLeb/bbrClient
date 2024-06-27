import {useState} from "react";
import api from "../../../services/api";

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleLogin = async e => {
        e.preventDefault();

        // validates user input

        // send login request to api
        const res = await api.post('/auth/login', values);

        console.log(res);
    }

    return (
        <section className={'py-9 container mx-auto'}>
            <div className={' md:flex bg-white shadow-lg gap-4 items-center rounded-lg border p-y'}>
                <div className={'overflow-hidden hidden md:hidden lg:block flex-1 h-full rounded-l-lg'}>
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
                            className={'w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none'}
                            placeholder={'Enter Email'}
                            type="text"/>

                        <input
                            onChange={handleChange}
                            name='password'
                            className={'w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none'}
                            placeholder={'Enter Password'}
                            type="text"/>

                        <button type='submit' className={'bg-primary py-5 font-bold text-white rounded-br-lg rounded-tl-lg'}>Access Portal</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;