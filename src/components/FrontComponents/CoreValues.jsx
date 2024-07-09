const CoreValues = () => {
    return (
        <div className="p-4 md:px-20">
            <div className="p-4 py-4">
                <p className="font-semibold text-3xl md:text-4xl lg:text-5xl text-primary">Core Values</p>
            </div>

            <div className="px-5 flex flex-col space-y-4 md:space-y-12">
                <div className="flex flex-col space-y-4 md:space-y-2 md:flex-row md:space-x-20">
                    <div className="bg-primary p-10 rounded-lg md:w-1/2">
                        <p className="text-white">Customer Satisfaction</p>
                        <p className="text-black">
                            We are committed to delivering exceptional service and exceeding our clients' expectations at every touchpoint.
                        </p>
                    </div>

                    <div className="bg-primary p-10 rounded-lg md:w-1/2">
                        <p className="text-white">Integrity</p>
                        <p className="text-black">
                            Honesty, transparency, and ethical conduct are the cornerstones of our business practices.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 md:flex-row md:space-x-20">
                    <div className="bg-primary p-10 rounded-lg md:w-1/2">
                        <p className="text-white">Collaboration</p>
                        <p className="text-black">
                            We work together to achieve common goals, fostering a culture of mutual respect and teamwork.
                        </p>
                    </div>

                    <div className="bg-primary p-10 rounded-lg md:w-1/2">
                        <p className="text-white">Innovation</p>
                        <p className="text-black">
                            Embracing technology and innovation enables us to streamline processes, enhance efficiency, and deliver superior results.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreValues;
