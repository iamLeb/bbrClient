const PropertyFilters = () => {
    const categories = [
        {
            id: 0,
            name:"house"
        },
        {
            id: 1,
            name:"Appartment"
        },
        {
            id: 2,
            name:"Condo"
        },
        {
            id: 3,
            name:"villa"
        },
        {
            id: 4,
            name:"two story"
        },
    ]
    const cities = [
        {
            id: 0,
            name:"winnipeg"
        },
        {
            id: 1,
            name:"brandon"
        },
        {
            id: 2,
            name:"morden"
        },
    ]
    const neighbourhoods = [
        {
            id: 0,
            name:"st vital"
        },
        {
            id: 1,
            name:"east St Paul"
        },
        {
            id: 2,
            name:"bridgewater"
        },
        {
            id: 3,
            name:"island lakes"
        },
        {
            id: 4,
            name:"transcona"
        },
    ]

    return(
        <div className=" flex flex-col w-full items-center gap-y-5 text-2xl m-3 rounded-lg">
             <div className="justify-center w-full items-center mt-5">
                     <select className="border w-full rounded-lg p-5 space-x-1"> 
                        <option>Neighbourhoods</option>
                            {neighbourhoods.map(neigh => (
                            <option key={neigh.id}>
                                {neigh.name}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="justify-center w-full items-center">
                     <select className="border rounded-lg w-full p-5 space-x-1"> 
                        <option>Cities</option>
                            {cities.map(city => (
                            <option key={city.id}>
                                {city.name}
                            </option>

                        ))}
                    </select>
                </div>
                <div className="justify-center w-full items-center">
                     <select className="border rounded-lg w-full p-5 space-x-1"> 
                        <option>Category</option>
                            {categories.map(category => (
                            <option key={category.id}>
                                {category.name}
                            </option>

                        ))}
                    </select>
                </div>

                <ul className="flex flex-col w-full gap-y-5">
                    <li className={'flex lg:flex-none border rounded-lg lg:w-1/2'}>
                        <input id="searchKey" className={'focus:outline-primary rounded-lg pl-1 py-2'}
                            type={"text"}
                            placeholder={"Address"}/>
                    </li>
                    <li className={'flex lg:flex-none border rounded-lg lg:w-1/2'}>
                        <input id="searchKey" className={'focus:outline-primary rounded-lg pl-1 py-2'}
                            type={"text"}
                            placeholder={"Enter keyword..."}/>
                    </li>
                </ul>
                
        </div>

    )

}

export default PropertyFilters