import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import { CiMap, CiCalendar } from "react-icons/ci";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaArrowRightArrowLeft, FaShower } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { LuPrinter, LuBedDouble } from "react-icons/lu";
import { MdZoomOutMap } from "react-icons/md";
import { Carousel } from 'react-responsive-carousel';
import { IoMdPhotos } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Photo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const images = [
        "https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/drh-6-2.webp",
        "https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/prperty_03.webp",
        "https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/prperty_04.webp",
        "https://dreamhomewp.themesflat.com/wp-content/uploads/2023/08/prperty_05.webp"
    ];

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <section>
            <div className={'container mx-auto flex flex-col text-xs'}>
                <ul className={'flex space-x-4 text-gray-500 border-b p-5'}>
                    <li>
                        <div className={'flex items-center space-x-2 text-primary cursor-pointer'}>
                            <span>Home</span>
                            <RxCaretRight/>
                        </div>
                    </li>
                    <li>
                        <div className={'flex items-center space-x-2 cursor-pointer'}>
                            <span>Listings</span>
                            <RxCaretRight/>
                        </div>
                    </li>
                    <li>
                        <span>8329 South Santa Clara</span>
                    </li>
                </ul>

                <div className={'md:flex justify-between items-center py-9'}>
                    <div className={'flex flex-col gap-2'}>
                        <h1 className={'text-3xl font-medium p-1'}>8329 South Santa Clara</h1>
                        <div>
                            <ul className={'flex flex-col md:flex-row gap-2 p-2'}>
                                <li>
                                    <span className={'bg-green-500 text-white px-2 py-0.5 rounded-md'}>For Sale</span>
                                </li>
                                <li>
                                    <div className={'flex items-center space-x-2'}>
                                        <CiMap size={19}/>
                                        <span> 315 Wild Bird Drive, Spring, Texas</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={'flex items-center space-x-2'}>
                                        <CiCalendar/>
                                        <span> 2022</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={'flex justify-start p-2 space-x-3'}>
                                <li>
                                    <div className={'flex items-center space-x-2'}>
                                        <LuBedDouble size={15}/>
                                        <span> Bed: <span className={'font-medium'}>1</span></span>
                                    </div>
                                </li>

                                <li>
                                    <div className={'flex items-center space-x-2'}>
                                        <FaShower size={15}/>
                                        <span> Baths: <span className={'font-medium'}>3</span></span>
                                    </div>
                                </li>

                                <li>
                                    <div className={'flex items-center space-x-2'}>
                                        <MdZoomOutMap size={15}/>
                                        <span> SqFt: <span className={'font-medium'}>1,245</span></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={'flex flex-row justify-between md:justify-start p-2 md:flex-col  gap-4 items-center'}>
                        <ul className={'flex space-x-2'}>
                            <li>
                                <div
                                    className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                    <IoBookmarkOutline size={15}/>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                    <FaArrowRightArrowLeft size={15}/>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                    <GoShareAndroid size={15}/>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={'border p-2 rounded-lg text-gray-500 hover:text-white cursor-pointer hover:bg-primary'}>
                                    <LuPrinter size={15}/>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <h1 className={'text-3xl text-primary font-medium'}>$63,000</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 pb-9 p-3'}>

                <div className={'overflow-hidden flex-1 rounded-lg h-48 md:h-full'} onClick={() => openModal(0)}>
                    <img
                        className={'object-cover object-center w-full h-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                        src={images[0]}
                        alt="photo"/>
                </div>

                {/* Right div */}
                <div className={'grid grid-row-2 gap-4 flex-1'}>
                    <div className={'overflow-hidden rounded-lg h-48 md:h-96'} onClick={() => openModal(1)}>
                        <img
                            className={'object-cover object-center w-full h-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                            src={images[1]}
                            alt="photo"/>
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 md:space-x-4 gap-4 md:gap-0'}>
                        <div className={'overflow-hidden flex-1 rounded-lg h-48 md:h-96'} onClick={() => openModal(2)}>
                            <img
                                className={'object-cover object-center w-full h-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105'}
                                src={images[2]}
                                alt="photo"/>
                        </div>
                        <div className="relative overflow-hidden flex-1 rounded-lg h-48 md:h-96"
                             onClick={() => openModal(3)}>
                            <img
                                className="object-cover object-center w-full h-full cursor-pointer transition-all duration-300 hover:brightness-75 hover:scale-105"
                                src={images[3]}
                                alt="photo"
                            />
                            <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
                                <div className={'flex flex-col justify-center items-center cursor-pointer'}>
                                    <IoMdPhotos size={45} className="text-white"/>
                                    <span className={'font-bold text-white'}>Show all {images.length} photos</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'}
                     onClick={handleOverlayClick}>
                    <div className={'relative w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg overflow-hidden'}
                         onClick={(e) => e.stopPropagation()}>
                        <button
                            className={'absolute top-4 right-4 text-black text-lg'}
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <Carousel selectedItem={selectedImageIndex} showThumbs={false}>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Slide ${index}`}/>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Photo;
