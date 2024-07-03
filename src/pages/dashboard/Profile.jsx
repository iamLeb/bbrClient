import {useState, useEffect, useContext} from "react";
import api from "../../services/api.js";
import UserContext from "../../context/UserContext";
import login from "../front/auth/Login.jsx";

const Profile = () => {
        const {user} = useContext(UserContext);
        const [profile, setProfile] = useState({});
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState('');
        const [success, setSuccess] = useState('');

        const handleChange = (e) => {
            console.log(user)
            const {name, value} = e.target;
            setProfile({
                ...profile,
                [name]: value
            });
        };

        const handlePasswordChange = (e) => {
            const {name, value} = e.target;
            if (name === 'password') {
                setPassword(value);
            } else {
                setConfirmPassword(value);
            }
        };

        const handleProfilePictureChange = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                const res = await api.post('/user/upload-profile-picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setProfile({...profile, profilePicture: res.data.profilePicture});
                setSuccess('Profile picture updated successfully');
            } catch (e) {
                setErrors('There was an error uploading the profile picture');
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                setErrors('Passwords do not match');
            } else {
                try {
                    await api.put('/user/profile', {...profile, password});
                    setSuccess('Profile updated successfully');
                } catch (e) {
                    setErrors('There was an error updating the profile');
                }
            }
        }


        return (
            <section className="h-screen m-5 mx-10">
                <div className="bg-white border border-gray-100 shadow-2xl p-5">
                    <h3 className="font-bold text-lg mb-5">My Profile</h3>
                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                    {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Profile Picture</label>
                            <input type="file" onChange={handleProfilePictureChange}/>
                            {profile.profilePicture && (
                                <img src={profile.profilePicture} alt="Profile" className="mt-2 w-20 h-20 rounded-full"/>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user && user.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user && user.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handlePasswordChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-2 text-xs">
                            <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
;

export default Profile;
