import { GoArrowRight } from "react-icons/go";
const Header = () => {
    return (
        <header className={'bg-white w-full shadow-md py-5'}>
            <div className={'flex justify-between items-center  px-4'}>
                <div className={'block md:hidden'}>
                    <GoArrowRight size={26} />
                </div>

                <div>
                    <div className={'overflow-hidden h-9 rounded-full'}>
                        <img className={'w-full h-full'} src="https://dreamhomewp.themesflat.com/wp-content/uploads/2024/03/admin-3.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;