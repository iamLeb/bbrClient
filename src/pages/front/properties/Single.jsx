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
        const {fetchMultipleMedia} = useContext(GlobalContext);


        useEffect(() => {
            const getProperty = async () => {
                try {
                    const response = await api.get(`/property/${id}`);
                    const propertyData = response.data;

                    const mediaResponse = await fetchMultipleMedia(id);
                    const url = mediaResponse.length > 0 ? mediaResponse.map(item => item.url) : ['default.png'];

                    const propertyWithMedia = {...propertyData, url};
                    setProperty(propertyWithMedia);
                } catch (error) {
                    console.error('Error fetching property or media:', error);
                } finally {
                    setLoading(false);
                }
            };

            getProperty();
        }, [id]);

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