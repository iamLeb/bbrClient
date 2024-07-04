import UserContext from '../context/UserContext';
import {useEffect, useState} from "react";
import api from "../services/api";
import {Navigate} from "react-router-dom";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const path = location.pathname.split('/')[1];

    const getUser = async () => {
        try {
            const user = await api.get('/auth/check');
            setUser(user.data);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getUser();
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;