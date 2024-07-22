import TableComponent from "../../../components/DashboardComponents/TableComponent.jsx";
import {useContext} from "react";
import UserContext from "../../../context/UserContext.js";

const Properties = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <TableComponent />
        </div>
    );
};

export default Properties;