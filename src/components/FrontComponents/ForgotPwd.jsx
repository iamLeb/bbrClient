const ForgotPwd = () => {
    return (
        <div className={'flex'}>

            <div className={'hidden md:block w-1/3'}>
                <div className={'h-full overflow-hidden'}>
                    <img className={'h-full w-full rounded-l-lg object-cover object-center'} src={'src/assets/images/img.png'}/>
                </div>
            </div>

            <div className={'w-full md:w-2/3 flex flex-col space-y-8 p-8'}>
                <h1 className={'text-3xl font-bold text-black'}>Forgot your password?</h1>
                <div>
                    <input
                        className={'px-5 focus:outline-primary border rounded-lg py-4 w-full placeholder:text-gray-500 text-sm'}
                        type="text" placeholder={"Enter your email"}/>
                </div>

                <div>
                    <button className={'w-1/2 border  bg-primary rounded-lg py-4 w-full'}>
                        <span className={'text-white font-bold'}>Reset Password</span>
                    </button>
                </div>

                <div>
                    <a>Back to login</a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPwd;