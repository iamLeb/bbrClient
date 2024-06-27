import {useContext} from "react";
import UserContext from "../../context/UserContext.js";

const Admin = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            welcome { user && user.name }
        </div>
    );
};

export default Admin;