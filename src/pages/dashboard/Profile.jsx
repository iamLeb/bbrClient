import {useState, useEffect, useContext} from "react";
import api from "../../services/api.js";
import UserContext from "../../context/UserContext";

const Profile = () => {
    const {user} = useContext(UserContext);
    const [nameChanged, setNameChanged] = useState(false);
    const [profile, setProfile] = useState({name: '', email: '', type: ''});
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [modal, setModal] = useState(false);

    const [values, setValues] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (user) {
            setProfile({name: user.name, email: user.email, type: user.type});
        }
    }, [user]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
        setNameChanged(true)
    };

    const handleClose = () => {
        setErrors('');
        toggleModal();
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    // const handleProfilePictureChange = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('profilePicture', file);
    //
    //     try {
    //         const res = await api.post('/user/upload-profile-picture', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         setProfile({...profile, profilePicture: res.data.profilePicture});
    //         setSuccess('Profile picture updated successfully');
    //     } catch (e) {
    //         setErrors('There was an error uploading the profile picture');
    //     }
    // };

    const submitPassword = async (e) => {
        e.preventDefault();
        setErrors('');
        setSuccess('');
        if (!values.newPassword || !values.confirmPassword || !values.password) {
            setErrors('All fields are required');
        } else if (values.newPassword !== values.confirmPassword) {
            setErrors('Passwords do not match');
        } else {
            try {
                const res = await api.put(`/auth/reset/${user._id}`, values);
                if (res.status === 200) {
                    setSuccess('Password updated successfully');
                    setValues({password: '', newPassword: '', confirmPassword: ''});
                    handleClose()
                }
            } catch (e) {
                setErrors(e.response.data.error);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setSuccess('');
        if (nameChanged) {
            try {
                const res = await api.put(`/auth/update/${user._id}`, profile);
                setProfile(res.data); // Update user context
                setSuccess('Profile updated successfully');
            } catch (e) {
                setErrors(e.response.data.error);
            }
            setNameChanged(false)
        }else{
            setErrors('No changes made');
        }
    };

    return (
        <section className="h-screen m-5 mx-10">
            <div className="bg-white border border-gray-100 shadow-2xl p-5">
                <h3 className="font-bold text-lg mb-5">My Profile</h3>

                {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                {success && <p className="text-green-500 text-xs mt-2">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            disabled={true}
                            className="w-full p-2 border rounded bg-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={profile.type}
                            disabled={true}
                            className="w-full p-2 border rounded bg-gray-200"
                        />
                    </div>


                    <div className="flex justify-end space-x-2 text-xs">
                        <button type="button" onClick={toggleModal} className="px-4 py-2 rounded bg-primary text-white">
                            Change Password
                        </button>
                        <button type="submit" className="px-4 py-2 rounded bg-primary text-white">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {modal && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
                    <div
                        className="bg-white m-2 sm:m-0 w-full sm:w-[35%] rounded-md shadow-lg transition-transform duration-300 transform">
                        <div className="bg-gray-100 p-3 flex items-center">
                            <h2 className="font-extrabold">Change Password</h2>
                        </div>
                        <div className="p-3">
                            <form onSubmit={submitPassword}>
                                <div className="mb-4">
                                    {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
                                    {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
                                    <label className="block text-sm font-bold mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <label className="block text-sm font-bold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <label className="block text-sm font-bold mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 text-xs">
                                    <button type="button" onClick={handleClose}
                                            className="px-3 py-0 rounded bg-gray-100">
                                        Close
                                    </button>
                                    <button type="submit" className="px-4 py-2 rounded bg-primary text-white">
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Profile;
