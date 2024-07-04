import one from "../../../assets/images/Register.jpg"

const RegistrationHero = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between border rounded-lg m-10 gap-x-5">
                <div className="hidden w-full object-cover p-5 lg:flex items-center h-full ">
                    <img className="w-full rounded-lg " src={one} alt=""/>
                </div>
                <div className="w-full p-5 space-y-7 ">
                    <div className="">
                        <h1 className="font-bold text-3xl text-center">Sign up</h1>
                        <p className="text-center">join our family</p>
                    </div>
                    <div>
                        <p>Name</p>
                        <input type='text' placeholder="name" className="border w-full py-4 px-9 rounded-lg"/>
                    </div>
                    <div>
                        <p>E-mail</p>
                        <input type='text' placeholder="email" className="border w-full py-4 px-9 rounded-lg"/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type='text' placeholder="password" className="border w-full py-4 px-9 rounded-lg"/>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-1/3 bg-primary p-3 flex justify-center rounded-lg text-bold text-white">
                            Sign up
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default RegistrationHero;