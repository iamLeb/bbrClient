import UserContext from '../context/UserContext';
import {useEffect, useState} from "react";
import api from "../services/api";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const user = await api.get('/auth/check');
            setUser(user.data);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        console.log(user)
        getUser();
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;