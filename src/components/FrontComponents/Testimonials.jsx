import { TiMessages } from "react-icons/ti";
import one from "../../assets/images/testimonial1.jpg"
import {useContext} from "react";
import GlobalContext from "../../context/Global.js";

const Testimonials = () => {
    const {testimonials} = useContext(GlobalContext);
    return (
        <div className="flex flex-col items-center p-5">
            <div className={'flex flex-col justify-between gap-4 text-center pb-9'}>
                <h1 className={'font-bold text-4xl sm:text-5xl'}>From our Customers</h1>
                <p className={'font-light text-sm'}>Hear some seasons why you should choose us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 container">
                {testimonials.map(testimonial => (
                    <div key={testimonial._id} className="grid grid-col-1 bg-white">
                        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg">
                            <div className="p-5">
                                <TiMessages className="text-primary text-3xl"/>
                            </div>
                            <div className="w-2/3 text-center pb-5">
                                {testimonial.message}
                            </div>

                        </div>
                        <div className="flex pt-10 justify-center">
                            <img src={one} alt="image" className="rounded-full w-10 h-10"/>
                        </div>
                        <div className="text-center font-bold">
                            {testimonial.name}
                        </div>
                        <div className="text-center text-xs pb-10">
                            Customer
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;