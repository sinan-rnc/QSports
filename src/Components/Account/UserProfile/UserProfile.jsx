import "./UserProfile.scss"

export default function UserProfile() {
    return (
        <div className="user-profile-container">
            <div className="user-profile-section">
            <div className="dashborad-heading">
                <h1 className='dashborad-main-heading'>Edit Profile</h1>
                <hr className="dashborad-hr-1"/><hr className="dashborad-hr-2"/>
                <h3 className="dashborad-second-heading">User</h3>
            </div>
            <form className="form-table">
                <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" for="clubBarName">First Name</label>
                        <input type="text" className="form-control" id="clubBarName" placeholder="Enter your First Name"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="clubBarNumber">Last Name</label>
                        <input type="text" className="form-control" id="clubBarNumber" placeholder="Enter your Last Name"/>
                    </div>
                </div>
                <div className="same-line">
                    <div className="form-group">
                        <label className="form-label" for="email">Email Address</label>
                        <input type="text" className="form-control" id="email" placeholder="Enter your Email Address"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" for="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="Enter your Phone Number"/>
                    </div>
                </div>
                <div className="same-line">
                    <div className="form-group">
                            <label className="form-label" for="phoneNumber">Date of Birth</label>
                            <input type="date" className="form-control" id="phoneNumber" placeholder="Enter your Date of Birth"/>
                        </div>
                    <div className="form-group">
                        <label className="form-label" for="phoneNumber">Profile Picture</label>
                        <input type="file" className="form-control" id="phoneNumber" placeholder="Enter your Profile Picture"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" for="phoneNumber">About Me</label>
                    <textarea type="text" className="form-control" id="phoneNumber" placeholder="Describe about Yourself"/>
                </div>
                <button className="save-btn">Save</button>
            </form>
            </div>
        </div>
    )
}