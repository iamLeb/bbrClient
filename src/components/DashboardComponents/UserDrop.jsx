// import { useNavigate } from "react-router-dom"
// import { IoMdSettings } from "react-icons/io";
// import {FaRegUserCircle} from "react-icons/fa";
// import { IoMdHelp } from "react-icons/io";
//
//
// const UserDrop = () => {
//     const navigate = useNavigate();
//     return(
//         <div className=' absolute right-0 grid-cols-1 space-y-4 m-5 text-xl bg-neutral-800 text-white rounded-lg shadow-xl'>
//             <div className="hover:bg-primary rounded-t-lg flex px-4 py-1 justify-start w-full">
//                 <button onClick={() => {
//                     navigate('/secure/profile');
//                     }} className="flex items-center gap-x-2 justify-start"> <FaRegUserCircle /> My profile
//                 </button>
//             </div>
//
//             <div className="hover:bg-primary flex px-4 py-1 justify-start w-full">
//                 <button onClick={() => {
//                     navigate('/secure/profile');
//                     }} className="flex items-center gap-x-2  justify-between"> <IoMdSettings /> Settings
//                 </button>
//             </div>
//             <div className="hover:bg-primary  flex px-4 py-1 justify-start w-full">
//                 <button onClick={() => {
//                     navigate('/secure/profile');
//                     }} className="flex items-center gap-x-2 justify-between"> <IoMdHelp /> Help
//                 </button>
//             </div>
//             <div className="hover:bg-primary rounded-b-lg flex px-4 py-1 justify-start w-full">
//                 <button onClick={() => {
//                     navigate('/secure/profile');
//                     }} className="flex items-center rounded-lg gap-x-2 justify-between"> <IoMdSettings /> Something else
//                 </button>
//             </div>
//         </div>
//     )
// }
//
// export default UserDrop