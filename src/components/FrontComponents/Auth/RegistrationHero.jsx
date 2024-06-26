import one from "../../../assets/images/Register.jpg"

const RegistrationHero = () => {
    return (
        <div className="flex items-center justify-between mx-4 gap-x-5">
            <div className="w-1/2  text-center">
                <img src={one}/>
            </div>
            <div className="w-1/2 rounded-lg p-5 space-y-7 ">
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
                <div>
                    <p>Phone number</p>
                    <input type='text' placeholder="phone" className="border w-full py-4 px-9 rounded-lg"/>
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