const Preloader = () => {
    return (
        <div className="transition-all duration-300 flex justify-center h-screen w-screen -mx-auto bg-neutral-800">
            <div className="flex justify-center items-center">
                <div>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    <h3 className={'text-3xl font-mono'}></h3>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
