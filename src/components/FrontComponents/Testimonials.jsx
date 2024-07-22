import { TiMessages } from "react-icons/ti";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/Global.js";

const Testimonials = () => {
    const { testimonials } = useContext(GlobalContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;

        if (!isHovered) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            }, 2500); // Change slide every 2.5 seconds
        }

        return () => clearInterval(interval);
    }, [isHovered, testimonials.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="flex flex-col items-center p-5 py-24">
            <div className="flex flex-col justify-between gap-4 text-center pb-9">
                <h1 className="font-bold text-4xl sm:text-5xl">From our Customers</h1>
                <p className="font-light text-sm">Hear some reasons why you should choose us</p>
            </div>

            <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial._id}
                                className="min-w-full flex flex-col items-center bg-white rounded-xl shadow-lg p-5 h-96"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="p-5">
                                    <TiMessages className="text-primary text-3xl"/>
                                </div>
                                <div className="w-full text-center pb-5">{testimonial.message}</div>
                                <div className="flex pt-10 justify-center">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${testimonial.name}`}
                                        alt="image"
                                        className="rounded-full w-10 h-10"
                                    />
                                </div>
                                <div className="text-center font-bold">{testimonial.name}</div>
                                <div className="text-center text-xs pb-10">Customer</div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    onClick={prevSlide}
                >
                    &lt;
                </button>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    onClick={nextSlide}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Testimonials;
