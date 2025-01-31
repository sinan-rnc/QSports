import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.scss"
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
import { startUpdateProfile } from "../../../Actions/profileActions";

export default function UserProfile() {
    const {user} = useAuth()
    const dispatch = useDispatch()
    const profile = useSelector((state) => {
        return state.profile.data.find(ele => ele.UserID === user._id)
    });

    console.log(profile)


    const formatDate = (isoDate) => {
        if (!isoDate) return "";  // Handle empty cases
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const [form, setForm] = useState(profile ? {
        NickName: profile.NickName,
        Slogan: profile.Slogan,
        DOB: formatDate(profile.DOB),
        ProfilePic: "",
        AboutMe: profile.AboutMe,
    } : {
        NickName: "",
        Slogan: "",
        DOB: "",
        ProfilePic: "",
        AboutMe: "",
    })

    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

        const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, ProfilePic: URL.createObjectURL(file) });
    }

    const handleFormUpdate = async (e) => {
        e.preventDefault()
        console.log(form)
        const formData = {
            _id: profile._id,
            NickName: form.NickName,
            Slogan: form.Slogan,
            DOB: form.DOB,
            ProfilePic: form.ProfilePic,
            AboutMe: form.AboutMe,
        }
        dispatch(startUpdateProfile(formData))
    }

    const handleFormSubmit = () => {
        
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-section">
            <div className="dashborad-heading">
                <h1 className='dashborad-main-heading'>{profile ? "Update Profile" : "Create a New Profile"}</h1>
                <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                <h3 className="dashborad-second-heading">User</h3>
            </div>
            <form className="form-table" onSubmit={profile ? handleFormUpdate : handleFormSubmit}>
                <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" for="NickName">Nick Name</label>
                        <input type="text" className="form-control" id="NickName" name="NickName" value={form.NickName} onChange={handleChange} placeholder="Enter your Nick Name"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="Slogan">Slogan</label>
                        <input type="text" className="form-control" id="Slogan" name="Slogan" value={form.Slogan} onChange={handleChange}  placeholder="Enter the Slogan"/>
                    </div>
                </div>
                {/* <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" for="email">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder="Enter your Email Address"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter your Phone Number"/>
                    </div>
                </div> */}
                <div className="same-line">
                    <div className="form-group">
                            <label className="form-label" for="DOB">Date of Birth</label>
                            <input type="date" className="form-control" id="DOB" name="DOB" value={form.DOB} onChange={handleChange}  placeholder="Enter your Date of Birth"/>
                        </div>
                    <div className="form-group">
                        <label className="form-label" for="ProfilePic">Profile Picture</label>
                        <input type="file" className="form-control" id="ProfilePic" name="ProfilePic" onChange={handleImageChange} placeholder="Enter your Profile Picture"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" for="AboutMe">About Me</label>
                    <textarea type="text" className="form-control" id="AboutMe" name="AboutMe" value={form.AboutMe} onChange={handleChange} placeholder="Describe about Yourself"/>
                </div>
                <button type="submit" className="save-btn">{profile ? "Save" : "Create"}</button>
            </form>
            </div>
        </div>
    )
}