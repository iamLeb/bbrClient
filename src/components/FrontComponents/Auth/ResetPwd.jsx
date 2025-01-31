const ResetPwd = () => {
    return (
        <section className={'py-9 container mx-auto'}>
            <div className={'md:flex bg-white shadow-lg gap-4 items-center rounded-lg border p-y'}>
                <div className={'hidden lg:block overflow-hidden flex-1 h-full rounded-l-lg'}>
                    <img
                        className={'object-center object-cover'}
                        src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="photo"/>
                </div>

                <div className={'flex-1 pb-5'}>
                    <h1 className={'text-3xl text-center font-bold py-5 text-primary'}>Reset your password</h1>
                    <form className={'flex flex-col gap-4 px-5'}>
                        <input
                            className={'w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none'}
                            placeholder={'New password'}
                            type="text"/>

                        <input
                            className={'w-full p-5 bg-gray-100 rounded-br-lg rounded-tl-lg outline-none'}
                            placeholder={'Confirm new password'}
                            type="text"/>

                        <button className={'bg-primary py-5 font-bold text-white rounded-br-lg rounded-tl-lg'}>Reset Password</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPwd;