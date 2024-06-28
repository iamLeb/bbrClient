import { GoArrowRight } from "react-icons/go";
import UserContext from "../../context/UserContext.js";
import {useContext} from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const Header = () => {
    const {user} = useContext(UserContext);
    return (
        <header className={'bg-white w-full shadow-md '}>
            <div className={'flex justify-between items-center px-5'}>
                {/*Mobile view*/}
                <div className={'block md:hidden'}>
                    <GoArrowRight size={26} />
                </div>

                <button className={'hidden md:block text-sm transition-all duration-300 border border-primary hover:text-white hover:bg-primary text-primary rounded-full py-3 px-5'}>Manage Roles and Permissions</button>

                <div className={'flex space-x-2 items-center cursor-pointer bg-gray-200 p-4 justify-center'}>
                    <div className={'overflow-hidden w-9 rounded-full'}>
                        <img className={'object-center object-cover w-full h-full'} src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg" alt="photo"/>
                    </div>
                    <div>
                        <p className={'text-sm font-medium'}>{user && user.name}</p>
                        <p className={'text-xs font-light'}>{user && user.type}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;