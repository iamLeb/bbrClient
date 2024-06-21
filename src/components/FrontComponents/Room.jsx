import React from "react";

const Room = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <li className={'md:flex-none border rounded-lg p-3 w-full'}>
                <select id="room" className={'outline-none w-full text-sm text-gray-500'}>
                    <option value="">Rooms</option>
                    <option value="room1">1</option>
                    <option value="room2">2</option>
                    <option value="room3">3</option>
                    <option value="room4">4</option>
                    <option value="room5">5</option>
                    <option value="room6">6</option>
                    <option value="room7">7</option>
                    <option value="room8">8</option>
                    <option value="room9">9</option>
                    <option value="room10">10</option>
                </select>
            </li>
        </div>
    )
}

export default Room;