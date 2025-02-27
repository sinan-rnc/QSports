import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.scss"
import { useAuth } from "../../../../Context/AuthContext";
import { useState } from "react";
import { startCreateProfile, startUpdateProfile } from "../../../../Actions/profileActions";
import { IoClose } from "react-icons/io5";

export default function UserProfile() {
    const {user, setAlertMessage, setAlertMessageColor} = useAuth()
    const dispatch = useDispatch()
    const profile = useSelector((state) => {
        return state.profile.data
            // .find(ele => ele?._id === "67a31c2c02344f4343eb6839")
            .find(ele => !ele?.isDeleted && ele?.UserID === user?._id)
    });

    // if(profile) {
    //     console.log("Profile Found", profile)
    // } else {
    //     console.log("Profile Not Found")
    // }

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
        ProfilePic: profile.ProfilePic,
        AboutMe: profile.AboutMe,
    } : {
        NickName: "",
        Slogan: "",
        DOB: "",
        ProfilePic: "",
        AboutMe: "",
    })

    const [formErrors, setFormErrors] = useState("")

    const errors = {}

    const validateErrors = () => {
        if(form.NickName.trim().length === 0) {
            errors.NickName = "Nickname is required"
        }
        if(form.Slogan.trim().length === 0) {
            errors.Slogan = "Slogan is required"
        }
        if(form.DOB.trim().length === 0) {
            errors.DOB = "Date of Birth is required"
        }
        if(!form.ProfilePic) {
            errors.ProfilePic = "Profile Picture is required"
        }
        if(form.AboutMe.trim().length === 0) {
            errors.AboutMe = "About Me is required"
        }
    }

    validateErrors()

    // console.log(profile)


    const handleChange = (e) => {
        const {name} = e.target;
        setForm({...form, [name]: e.target.value });
        // console.log(form)
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setForm({ ...form, ProfilePic: file });
        // console.log(file)

        const fileInput = document.getElementById("ProfilePic");
        if (fileInput) {
            fileInput.value = ""; // Clears the selected file
        }
    }

    const handleRemoveImage = (e) => {
        setForm({ ...form, ProfilePic: ""});
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
    
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append("UserID", user._id);
            formData.append("NickName", form.NickName);
            formData.append("Slogan", form.Slogan);
            formData.append("DOB", form.DOB);
            formData.append("AboutMe", form.AboutMe);
    
            // Append the image file only if it exists
            if (form.ProfilePic) {
                formData.append("ProfilePic", form.ProfilePic);
            }
    
            // console.log("FormData contents:");
            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });

            // console.log("Creating formData", formData)

            // const formData = { ...form , UserID: user._id };
    
            if (!profile) {
                dispatch(startCreateProfile(formData, setAlertMessage, setAlertMessageColor));
            } else {
                formData.append("_id", profile._id);
                // const updatedFormData = { ...form , _id: profile._id }
                // console.log("Updating formData",formData)
                dispatch(startUpdateProfile(formData, setAlertMessage, setAlertMessageColor));
            }
    
            setFormErrors("");
        } else {
            setFormErrors(errors);
        }
    };
    

    return (
        <div className="user-profile-container">
            <div className="user-profile-section">
            <div className="dashborad-heading">
                <h1 className='dashborad-main-heading'>{profile ? "Update Profile" : "Create a New Profile"}</h1>
                <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                <h3 className="dashborad-second-heading">User</h3>
            </div>
            <form className="form-table" onSubmit={handleFormSubmit}>
                <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" htmlFor="NickName">Nick Name</label>
                        <input type="text" className="form-control" id="NickName" name="NickName" value={form.NickName} onChange={handleChange} placeholder="Enter your Nick Name"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Slogan">Slogan</label>
                        <input type="text" className="form-control" id="Slogan" name="Slogan" value={form.Slogan} onChange={handleChange}  placeholder="Enter the Slogan"/>
                    </div>
                </div>
                {(formErrors.NickName || formErrors.Slogan) && (
                    <div className="same-line">
                        {formErrors.NickName && <div className="alert alert-danger">{formErrors.NickName}</div>}
                        {formErrors.Slogan && <div className="alert alert-danger">{formErrors.Slogan}</div>}
                    </div>
                )}
                {/* <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder="Enter your Email Address"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter your Phone Number"/>
                    </div>
                </div> */}
                <div className="same-line">
                    <div className="form-group">
                            <label className="form-label" htmlFor="DOB">Date of Birth</label>
                            <input type="date" className="form-control" id="DOB" name="DOB" value={form.DOB} onChange={handleChange}  placeholder="Enter your Date of Birth"/>
                        </div>
                    <div className="form-group gallery">
                        <label className="form-label" htmlFor="ProfilePic">Profile Picture</label>
                        <input type="file" className="form-control" id="ProfilePic" name="ProfilePic" onChange={handleImageChange} placeholder="Enter your Profile Picture"/>
                        {form.ProfilePic && (
                            <div className="upload-gallery">
                                <p>Profile Pic</p>
                                <IoClose className="close-icon" onClick={handleRemoveImage} />
                            </div>
                        )}
                    </div>
                </div>
                {(formErrors.DOB || formErrors.ProfilePic) && (
                    <div className="same-line">
                        {formErrors.DOB && <div className="alert alert-danger">{formErrors.DOB}</div>}
                        {formErrors.ProfilePic && <div className="alert alert-danger">{formErrors.ProfilePic}</div>}
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label" htmlFor="AboutMe">About Me</label>
                    <textarea type="text" className="form-control" id="AboutMe" name="AboutMe" value={form.AboutMe} onChange={handleChange} placeholder="Describe about Yourself"/>
                </div>
                {formErrors.AboutMe && (
                    <div className="same-line">
                        {formErrors.AboutMe && <div className="alert alert-danger">{formErrors.AboutMe}</div>}
                    </div>
                )}
                <button type="submit" className="save-btn">{profile ? "Save" : "Create"}</button>
            </form>
            </div>
        </div>
    )
}