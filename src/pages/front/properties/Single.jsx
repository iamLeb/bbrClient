import Photo from "../../../components/FrontComponents/Photo.jsx";
import Overview from "../../../components/FrontComponents/Overview.jsx";

const Single = () => {
    return (
        <div>
            <Photo />
            <div className={'container mx-auto'}>
                <Overview />
            </div>

        </div>
    );
};

export default Single;