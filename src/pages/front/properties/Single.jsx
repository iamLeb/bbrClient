import Photo from "../../../components/FrontComponents/Photo.jsx";
import Overview from "../../../components/FrontComponents/Overview.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../../../context/Global.js";
import api from "../../../services/api.js";

const Single = () => {
        let {id} = useParams();
        const [property, setProperty] = useState({
            title: '',
            address: '',
            price: '',
            bed: '',
            bath: '',
            category: '',
            city: '',
            neighbourhood: '',
            sqft: '',
            yearBuilt: '',
            landArea: '',
            description: '',
            url: 'default.png'
        });
        const [loading, setLoading] = useState(true);
        const {categories, neighbourhoods, getNeighbourhoodName, getName, fetchMedia} = useContext(GlobalContext);

        useEffect(() => {
            const getProperty = async () => {
                const response = await api.get(`/property/${id}`);
                const propertyData = response.data;

                const mediaResponse = await fetchMedia(id);
                const url = mediaResponse?.data?.url || 'default.png';

                const propertyWithMedia = {...propertyData, url};
                setProperty(propertyWithMedia);
                setLoading(false);

            };

            getProperty();
        }, [id, fetchMedia]);

        return (
            <div>
                <Photo property={property}/>
                <div className={'container mx-auto'}>
                    <Overview property={property}/>
                </div>

            </div>
        );
    }
;

export default Single;